import os
import json
import cv2
import numpy as np
import traceback
import uuid
import multiprocessing
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv

# --- Load Environment Variables ---
# Look for .env in the parent directory (root)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(os.path.dirname(BASE_DIR), '.env'))

# --- Dependency Checks ---
try:
    from ultralytics import YOLO
    from ultralytics.utils.plotting import Colors
    YOLO_AVAILABLE = True
except ImportError:
    YOLO_AVAILABLE = False

try:
    from PIL import Image, ImageDraw, ImageFont
    PILLOW_AVAILABLE = True
except ImportError:
    PILLOW_AVAILABLE = False

# --- Email Notification Logic ---
def send_email_notification(to_email, subject, body):
    """Sends an email notification using Gmail SMTP."""
    # Limpieza profunda de credenciales
    sender_email = os.environ.get('EMAIL_USER', 'arressarton@gmail.com').strip()
    sender_password = os.environ.get('EMAIL_PASS', '').replace(' ', '').strip()
    
    print(f"📧 Sistema de Email: Iniciando envío desde {sender_email}")
    print(f"📧 Longitud Password: {len(sender_password)} caracteres")
    
    if not sender_password:
        print("⚠️ ADVERTENCIA: No se ha configurado EMAIL_PASS en las variables de entorno.")
        return False
        
    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Usar SMTP_SSL en puerto 465 es a menudo más estable en Windows
        print(f"📧 Conectando a smtp.gmail.com:465...")
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, to_email, text)
        server.quit()
        print(f"✅ Notificación enviada exitosamente a {to_email}")
        return True
    except smtplib.SMTPAuthenticationError:
        print(f"❌ Error de Autenticación (535): La contraseña de aplicación no fue aceptada.")
        print(f"   Asegúrate de que la Verificación en 2 pasos esté ACTIVA y que la contraseña sea la de 16 letras.")
        return False
    except Exception as e:
        print(f"❌ Error inesperado al enviar correo: {e}")
        traceback.print_exc()
        return False

# --- Top-Level Helper and Processing Functions ---

def load_models_for_process():
    """Loads models and returns them. Designed to be called by each process."""
    if not YOLO_AVAILABLE:
        print("ERROR: La librería 'ultralytics' no está instalada.")
        return None, None, None, None
    try:
        print(f"Cargando modelos YOLO en proceso {os.getpid()}...")
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        
        # Custom model (must be present in the container)
        basket_model_path = os.path.join(BASE_DIR, 'TRAin2.pt')
        
        # Load models
        # Use filenames for standard models to allow Ultralytics to auto-download them if missing
        # Use absolute path for custom model
        print("Cargando YOLOv8x-seg...")
        yolo_m = YOLO('yolov8x-seg.pt') 
        
        print(f"Cargando Custom Model desde {basket_model_path}...")
        if not os.path.exists(basket_model_path):
            print(f"⚠️ ADVERTENCIA: No se encontró el modelo personalizado en {basket_model_path}")
        basket_m = YOLO(basket_model_path)
        
        print("Cargando YOLOv8x-pose...")
        pose_m = YOLO('yolov8x-pose.pt')
        
        colors_util = Colors()
        print(f"✅ Modelos cargados correctamente en proceso {os.getpid()}.")
        return yolo_m, basket_m, pose_m, colors_util
    except Exception as e:
        print(f"ERROR: No se pudieron cargar los modelos de YOLO en proceso {os.getpid()}. Error: {e}")
        return None, None, None, None

def draw_text_utf8(image, text, position, font_size=15, color=(255, 255, 255)):
    if not PILLOW_AVAILABLE:
        cv2.putText(image, text, position, cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
        return image
    pil_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(pil_image)
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except IOError:
        font = ImageFont.load_default()
    draw.text(position, text, font=font, fill=color)
    return cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

def get_all_views_for_frame(frame, yolo_m, basket_m, pose_m, colors_util):
    """
    Processes a single frame and returns a dictionary with all 19+ view variations.
    """
    views = {}
    yolo_model_results = yolo_m(frame, verbose=False)[0]
    basket_model_results = basket_m(frame, verbose=False)[0]
    pose_results = pose_m(frame, verbose=False)[0]

    h, w, _ = frame.shape

    # --- Base Masks ---
    mask_person = np.zeros((h, w), dtype=np.uint8)
    if yolo_model_results.masks:
        for mask, cls in zip(yolo_model_results.masks.data, yolo_model_results.boxes.cls):
            if int(cls) == 0:
                mask_np = (cv2.resize(mask.cpu().numpy(), (w, h)) * 255).astype(np.uint8)
                mask_person = cv2.bitwise_or(mask_person, mask_np)
    
    HOOP_CLASS_ID = 3
    mask_hoop = np.zeros((h, w), dtype=np.uint8)
    if basket_model_results.boxes:
        for box in basket_model_results.boxes:
            if int(box.cls[0]) == HOOP_CLASS_ID:
                x1, y1, x2, y2 = [int(i) for i in box.xyxy[0]]
                hoop_roi = frame[y1:y2, x1:x2]
                if hoop_roi.size > 0:
                    _, thresholded_roi = cv2.threshold(cv2.cvtColor(hoop_roi, cv2.COLOR_BGR2GRAY), 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
                    mask_hoop[y1:y2, x1:x2] = cv2.bitwise_or(mask_hoop[y1:y2, x1:x2], thresholded_roi)
    
    mask_ball = np.zeros((h, w), dtype=np.uint8)
    ball_boxes = [b for b in yolo_model_results.boxes if int(b.cls[0]) == 32] + [b for b in basket_model_results.boxes if int(b.cls[0]) == 0]
    for box in ball_boxes:
        x1, y1, x2, y2 = [int(i) for i in box.xyxy[0]]
        ball_roi = frame[y1:y2, x1:x2]
        if ball_roi.size > 0:
            _, thresholded_roi = cv2.threshold(cv2.cvtColor(ball_roi, cv2.COLOR_BGR2GRAY), 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            mask_ball[y1:y2, x1:x2] = cv2.bitwise_or(mask_ball[y1:y2, x1:x2], thresholded_roi)

    # --- Generate all views ---
    views['binary_mask_person'] = mask_person
    views['binary_mask_ball'] = mask_ball
    views['binary_mask_hoop'] = mask_hoop
    
    gray_image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    views['mask_person_gray'] = cv2.bitwise_and(gray_image, gray_image, mask=mask_person)
    views['mask_ball_gray'] = cv2.bitwise_and(gray_image, gray_image, mask=mask_ball)
    views['mask_hoop_gray'] = cv2.bitwise_and(gray_image, gray_image, mask=mask_hoop)

    person_color = colors_util(0, bgr=True)
    ball_color = colors_util(32, bgr=True)
    hoop_color = colors_util(HOOP_CLASS_ID, bgr=True)

    color_combined = np.zeros_like(frame)
    color_combined[mask_person > 0] = person_color
    color_combined[mask_ball > 0] = ball_color
    color_combined[mask_hoop > 0] = hoop_color
    views['color_combined'] = color_combined

    boxes_only_img = frame.copy()
    # This part is duplicated but necessary to build combined views
    for box in yolo_model_results.boxes:
        class_id, conf = int(box.cls[0]), float(box.conf[0])
        if class_id in [0, 32]:
            label, color = (f"persona {conf:.2f}", person_color) if class_id == 0 else (f"balón {conf:.2f}", ball_color)
            x1, y1, x2, y2 = [int(i) for i in box.xyxy[0]]
            cv2.rectangle(boxes_only_img, (x1, y1), (x2, y2), color, 2)
            boxes_only_img = draw_text_utf8(boxes_only_img, label, (x1, y1 - 20), color=color)
    for box in basket_model_results.boxes:
        class_id, conf = int(box.cls[0]), float(box.conf[0])
        if class_id in [0, HOOP_CLASS_ID]:
            label, color = (f"balón {conf:.2f}", ball_color) if class_id == 0 else (f"aro {conf:.2f}", hoop_color)
            x1, y1, x2, y2 = [int(i) for i in box.xyxy[0]]
            cv2.rectangle(boxes_only_img, (x1, y1), (x2, y2), color, 2)
            boxes_only_img = draw_text_utf8(boxes_only_img, label, (x1, y1 - 20), color=color)
    views['boxes_only'] = boxes_only_img

    pose_img = pose_results.plot(boxes=False)
    views['pose_estimation'] = pose_img

    boxes_and_masks_img = cv2.addWeighted(boxes_only_img, 1, color_combined, 0.5, 0)
    views['boxes_and_masks'] = boxes_and_masks_img

    pose_overlay = cv2.absdiff(cv2.resize(pose_img, (w, h)), frame)
    views['final_combined'] = cv2.add(boxes_and_masks_img, pose_overlay)
    views['boxes_and_pose'] = cv2.add(boxes_only_img, pose_overlay)
    views['seg_and_pose'] = cv2.addWeighted(pose_img, 1, color_combined, 0.5, 0)
    
    return views

def run_analysis_background(task_id, upload_path, file_type, tasks_dict, user_email=None):
    """Worker function to run analysis in a background process."""
    print(f"Starting analysis for task: {task_id} (type: {file_type}) in PID {os.getpid()}")
    tasks_dict[task_id] = {'status': 'processing'}
    
    try:
        yolo_m, basket_m, pose_m, colors_util = load_models_for_process()
        if not all([yolo_m, basket_m, pose_m, colors_util]):
            raise RuntimeError("Failed to load models in background process.")

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        RESULTS_FOLDER = os.path.join(BASE_DIR, 'static/results')
        os.makedirs(RESULTS_FOLDER, exist_ok=True)
        
        result_urls = {}
        original_filename = os.path.basename(upload_path)
        result_urls['original'] = f"/static/uploads/{original_filename}"
        
        if file_type == 'image':
            frame = cv2.imread(upload_path)
            if frame is None: raise ValueError("Could not read image file")
            
            all_views = get_all_views_for_frame(frame, yolo_m, basket_m, pose_m, colors_util)
            
            for key, img_array in all_views.items():
                result_filename = f"{task_id}_{key}.jpg"
                result_path = os.path.join(RESULTS_FOLDER, result_filename)
                cv2.imwrite(result_path, img_array)
                result_urls[key] = f"/static/results/{result_filename}"
            
            status_data = {'status': 'complete', 'result_urls': result_urls, 'result_type': file_type, 'available_views': list(all_views.keys())}
            tasks_dict[task_id] = status_data

        elif file_type == 'video':
            cap = cv2.VideoCapture(upload_path)
            if not cap.isOpened(): raise ValueError("Could not open video file")

            fps = cap.get(cv2.CAP_PROP_FPS)
            width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

            video_writers = {}
            first_frame = True
            all_view_keys = [] # To store keys for video

            while cap.isOpened():
                ret, frame = cap.read()
                if not ret: break
                
                processed_views = get_all_views_for_frame(frame, yolo_m, basket_m, pose_m, colors_util)
                
                if first_frame:
                    all_view_keys = list(processed_views.keys()) # Capture all view keys
                    for key in all_view_keys:
                        result_filename = f"{task_id}_{key}.mp4"
                        result_path = os.path.join(RESULTS_FOLDER, result_filename)
                        video_writers[key] = cv2.VideoWriter(result_path, cv2.VideoWriter_fourcc(*'avc1'), fps, (width, height))
                        result_urls[key] = f"/static/results/{result_filename}"
                    first_frame = False

                for key, view_frame in processed_views.items():
                    if key in video_writers:
                        # Ensure the frame has 3 channels if it's a mask or grayscale
                        if len(view_frame.shape) == 2:
                            view_frame = cv2.cvtColor(view_frame, cv2.COLOR_GRAY2BGR)
                        
                        # Ensure frame size is correct, as some views might change it
                        if view_frame.shape[0] != height or view_frame.shape[1] != width:
                            view_frame = cv2.resize(view_frame, (width, height))

                        video_writers[key].write(view_frame)
            
            cap.release()
            for writer in video_writers.values():
                writer.release()
            
            status_data = {'status': 'complete', 'result_urls': result_urls, 'result_type': file_type, 'available_views': all_view_keys}
            tasks_dict[task_id] = status_data

        # --- Send Email Notification ---
        subject = f"🏀 AthenaBall: Análisis completado ({task_id[:8]})"
        body = f"Hola,\n\nTu análisis de {file_type} en AthenaBall ha finalizado con éxito.\n\n"
        body += f"ID de Tarea: {task_id}\n"
        body += f"Archivo original: {original_filename}\n\n"
        body += "Ya puedes ver los resultados en el dashboard.\n\n¡Gracias por usar Basketball Holístico!"
        
        # Send to user (if provided) and to the system admin/primary email
        primary_email = os.environ.get('EMAIL_USER', 'mexaion018@gmail.com')
        send_email_notification(primary_email, subject, body)
        
        if user_email and user_email != primary_email:
            send_email_notification(user_email, subject, body)

        print(f"Finished analysis for task: {task_id}")

    except Exception as e:
        print(f"Error in background task {task_id}: {e}")
        traceback.print_exc()
        tasks_dict[task_id] = {'status': 'failed', 'error': str(e)}

# --- App Factory and Main Execution ---
def create_app():
    app = Flask(__name__)
    
    # Enable CORS for all domains to ensure public access
    from flask_cors import CORS
    CORS(app)
    
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static/uploads')
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    manager = multiprocessing.Manager()
    tasks = manager.dict()


    @app.route('/')
    def index():
        return jsonify({"status": "running", "service": "AthenaBall API"})

    @app.route('/api/analyze', methods=['POST'])
    def analyze():
        if 'file' not in request.files: return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '': return jsonify({'error': 'No selected file'}), 400

        task_id = str(uuid.uuid4())
        filename = f"{task_id}_{os.path.basename(file.filename)}"
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(upload_path)

        file_type = 'video' if 'video' in file.content_type else 'image'
        original_file_url = f"/static/uploads/{filename}"
        tasks[task_id] = {'status': 'pending'}

        user_email = request.form.get('user_email')

        process = multiprocessing.Process(target=run_analysis_background, args=(task_id, upload_path, file_type, tasks, user_email))
        process.start()

        return jsonify({'task_id': task_id, 'original_file_url': original_file_url, 'file_type': file_type, 'available_views': []}), 202

    USERS_DATA_FILE = os.path.join(BASE_DIR, 'users_data.json')

    def load_users():
        if os.path.exists(USERS_DATA_FILE):
            with open(USERS_DATA_FILE, 'r', encoding='utf-8') as f:
                try: return json.load(f)
                except: return {}
        return {}

    def save_users(users):
        with open(USERS_DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(users, f, ensure_ascii=False, indent=4)

    def send_unified_notifications(data, action_type="ACTUALIZACIÓN"):
        """Sends email and WhatsApp alerts to both administrator and user."""
        name = data.get('name', 'N/A')
        email = data.get('email', 'N/A')
        phone = data.get('phone', '')
        bio = data.get('bio', 'N/A')
        
        emoji = "👤"
        if "REGISTRO" in action_type.upper(): emoji = "🆕"
        elif "SESIÓN" in action_type.upper(): emoji = "🔐"
        
        subject = f"{emoji} {action_type}: {name}"
        body = f"Evento de Basketball Holístico: {action_type}\n\n"
        body += f"Nombre: {name}\n"
        body += f"Email: {email}\n"
        body += f"Teléfono: {phone}\n"
        body += f"Bio: {bio}\n\n"
        body += "--- Metadatos del Sistema ---\n"
        body += f"Acción: {action_type}\n"
        body += "Origen: Dashboard Principal\n"
        
        # Email Notification - Administrator
        primary_email = os.environ.get('EMAIL_USER', 'arressarton@gmail.com')
        send_email_notification(primary_email, subject, body)
        
        # Email Notification - User (if different and not a login event to avoid spam)
        if email and email != primary_email and '@' in email and "SESIÓN" not in action_type.upper():
            send_email_notification(email, subject, body)
            
        # WhatsApp Notification (Ninja Method)
        if phone:
            # Clean phone: only digits
            clean_phone = ''.join(filter(str.isdigit, str(phone)))
            
            # Format for Mexico: If 10 digits, prepend 521
            if len(clean_phone) == 10:
                clean_phone = '521' + clean_phone
            
            try:
                import requests
                whatsapp_url = 'http://localhost:3002/send'
                whatsapp_msg = f"{emoji} *{action_type}*\n\n"
                whatsapp_msg += f"👤 *Usuario:* {name}\n"
                whatsapp_msg += f"📧 *Email:* {email}\n"
                whatsapp_msg += f"📱 *Móvil:* {phone}\n\n"
                whatsapp_msg += "_Notificación automática del sistema._"
                
                requests.post(whatsapp_url, json={'number': clean_phone, 'message': whatsapp_msg}, timeout=5)
            except Exception as e:
                print(f"⚠️ Error al conectar con Motor Ninja: {e}")

    @app.route('/api/register', methods=['POST'])
    def register():
        data = request.json
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        users = load_users()
        if email in users:
            return jsonify({'error': 'User already exists'}), 400
        
        # Build full profile from available data
        profile = {
            'name': data.get('name', ''),
            'email': email,
            'avatar': data.get('avatar', '/static/MJ.JPG'),
            'age': data.get('age', 0),
            'height': data.get('height', ''),
            'weight': data.get('weight', ''),
            'position': data.get('position', ''),
            'team': data.get('team', ''),
            'phone': data.get('phone', ''),
            'bio': data.get('bio', '')
        }

        users[email] = {
            'password': password,
            'profile': profile
        }
        save_users(users)
        
        # Notificar registro exitoso
        send_unified_notifications(profile, action_type="NUEVO USUARIO REGISTRADO")
        
        return jsonify({'status': 'success', 'user': profile}), 201

    @app.route('/api/login', methods=['POST'])
    def login():
        data = request.json
        email = data.get('email')
        password = data.get('password')
        users = load_users()
        
        user = users.get(email)
        if not user or user['password'] != password:
            return jsonify({'error': 'Invalid credentials'}), 401
            
        # Notificar inicio de sesión
        send_unified_notifications(user['profile'], action_type="INICIO DE SESIÓN")
        
        return jsonify({'status': 'success', 'user': user['profile']}), 200

    @app.route('/api/get_profile', methods=['GET'])
    def get_profile():
        email = request.args.get('email')
        if not email: return jsonify({}), 400
        
        users = load_users()
        user = users.get(email)
        if user:
            return jsonify(user.get('profile', {}))
        return jsonify({})

    @app.route('/api/save_profile', methods=['POST'])
    def save_profile():
        data = request.json
        email = data.get('email')
        if not email: return jsonify({'error': 'Authentication required'}), 401
        
        users = load_users()
        if email in users:
            users[email]['profile'].update(data)
            save_users(users)
            
            # Notificar
            send_unified_notifications(data, action_type="PERFIL ACTUALIZADO")
            
            return jsonify({'status': 'success', 'message': 'Perfil guardado'}), 200
            
        return jsonify({'error': 'User not found'}), 404

    @app.route('/api/notify_profile', methods=['POST'])
    def notify_profile():
        data = request.json
        if not data: return jsonify({'error': 'No data provided'}), 400
        
        send_unified_notifications(data)
        return jsonify({'status': 'success', 'message': 'Notificaciones enviadas'}), 200

    @app.route('/api/status/<task_id>')
    def task_status(task_id):
        task = tasks.get(task_id)
        if not task: return jsonify({'status': 'failed', 'error': 'Task not found'}), 404
        return jsonify(task)
    
    return app

# Expose app for Gunicorn
app = None

if __name__ == '__main__':
    if not all([YOLO_AVAILABLE, PILLOW_AVAILABLE]):
        print("Faltan dependencias. Por favor, instala 'ultralytics' y 'Pillow'.")
    else:
        multiprocessing.freeze_support()
        app = create_app()
        app.run(host='0.0.0.0', port=3001, debug=False)