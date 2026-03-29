import os
import gc
import json
import time
import traceback
import uuid
import threading
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify, render_template, send_from_directory
from dotenv import load_dotenv

# --- Load Environment Variables ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(os.path.dirname(BASE_DIR), '.env'))

# --- Lazy-loaded globals (NO se cargan al importar, se cargan bajo demanda) ---
_yolo_model = None
_basket_model = None
_pose_model = None
_colors_util = None
_models_lock = threading.Lock()
_models_loaded = False

# --- Memory Tracking ---
def get_memory_mb():
    """Retorna el uso de memoria del proceso en MB."""
    try:
        import psutil
        process = psutil.Process(os.getpid())
        return process.memory_info().rss / 1024 / 1024
    except Exception:
        return -1

def _lazy_load_models():
    """Carga los modelos YOLO NANO solo cuando se necesitan."""
    global _yolo_model, _basket_model, _pose_model, _colors_util, _models_loaded
    
    if _models_loaded:
        return _yolo_model, _basket_model, _pose_model, _colors_util
    
    with _models_lock:
        if _models_loaded:
            return _yolo_model, _basket_model, _pose_model, _colors_util
        
        try:
            from ultralytics import YOLO
            from ultralytics.utils.plotting import Colors
            
            mem_before = get_memory_mb()
            print(f"📦 Cargando modelos YOLO NANO (bajo demanda)... RAM={mem_before:.0f}MB")
            
            basket_model_path = os.path.join(BASE_DIR, 'TRAin2.pt')
            
            # ============================================================
            # MODELOS NANO: ~6MB cada uno en vez de ~140MB (yolov8x)
            # Ahorro estimado: ~270MB de RAM
            # ============================================================
            print("  → Cargando yolov8n-seg (NANO ~6MB)...")
            _yolo_model = YOLO('yolov8n-seg.pt')
            
            print(f"  → Cargando modelo custom desde {basket_model_path}...")
            _basket_model = YOLO(basket_model_path)
            
            print("  → Cargando yolov8n-pose (NANO ~6MB)...")
            _pose_model = YOLO('yolov8n-pose.pt')
            
            _colors_util = Colors()
            _models_loaded = True
            
            mem_after = get_memory_mb()
            print(f"✅ Modelos NANO cargados | RAM: {mem_before:.0f}MB → {mem_after:.0f}MB (+{mem_after - mem_before:.0f}MB)")
            
            return _yolo_model, _basket_model, _pose_model, _colors_util
        except Exception as e:
            print(f"❌ Error al cargar modelos: {e}")
            traceback.print_exc()
            return None, None, None, None


def _unload_models():
    """Libera los modelos YOLO de memoria para mantener el footprint bajo."""
    global _yolo_model, _basket_model, _pose_model, _colors_util, _models_loaded
    
    with _models_lock:
        mem_before = get_memory_mb()
        
        _yolo_model = None
        _basket_model = None
        _pose_model = None
        _colors_util = None
        _models_loaded = False
        
        # Forzar garbage collection
        gc.collect()
        
        # Si torch está disponible, limpiar su caché también
        try:
            import torch
            if hasattr(torch, 'cuda'):
                torch.cuda.empty_cache()
        except Exception:
            pass
        
        gc.collect()
        
        mem_after = get_memory_mb()
        print(f"🧹 Modelos descargados de RAM | {mem_before:.0f}MB → {mem_after:.0f}MB (liberados ~{mem_before - mem_after:.0f}MB)")


# --- Email Notification Logic ---
def send_email_notification(to_email, subject, body, retries=2):
    """Envía email con reintentos automáticos."""
    sender_email = os.environ.get('EMAIL_USER', 'arressarton@gmail.com').strip()
    # Limpiar espacios, saltos de línea, retornos de carro
    sender_password = os.environ.get('EMAIL_PASS', '').replace(' ', '').replace('\r', '').replace('\n', '').strip()
    
    print(f"📧 [EMAIL DEBUG] Intentando enviar a: {to_email}")
    print(f"📧 [EMAIL DEBUG] Remitente: {sender_email}")
    print(f"📧 [EMAIL DEBUG] Password configurado: {'SÍ (' + str(len(sender_password)) + ' chars)' if sender_password else 'NO - VACÍO'}")
    
    if not sender_password:
        print(f"⚠️ EMAIL_PASS no configurado en las variables de entorno. No se puede enviar email a {to_email}")
        print(f"⚠️ Configura EMAIL_PASS en Render Dashboard → Environment")
        return False
    
    for attempt in range(retries + 1):
        try:
            msg = MIMEMultipart()
            msg['From'] = sender_email
            msg['To'] = to_email
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'plain'))
            
            print(f"📧 [EMAIL] Conectando a smtp.gmail.com:465 (intento {attempt + 1}/{retries + 1})...")
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=15)
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, msg.as_string())
            server.quit()
            print(f"✅ Email enviado exitosamente a {to_email}")
            return True
        except smtplib.SMTPAuthenticationError as e:
            print(f"❌ [EMAIL] Error de AUTENTICACIÓN Gmail (intento {attempt + 1}/{retries + 1}): {e}")
            print(f"❌ [EMAIL] Verifica que EMAIL_PASS sea una 'App Password' de Google válida")
            break  # No reintentar en error de autenticación
        except Exception as e:
            print(f"❌ [EMAIL] Error (intento {attempt + 1}/{retries + 1}): {type(e).__name__}: {e}")
            if attempt < retries:
                time.sleep(2 ** attempt)  # Backoff: 1s, 2s
    
    return False


def send_whatsapp_notification(phone, message, retries=2):
    """Envía WhatsApp con reintentos y fallback robusto."""
    clean_phone = ''.join(filter(str.isdigit, str(phone)))
    if len(clean_phone) == 10:
        clean_phone = '521' + clean_phone
    
    if not clean_phone or len(clean_phone) < 10:
        return False
    
    for attempt in range(retries + 1):
        try:
            import requests
            resp = requests.post('http://localhost:3002/send', json={
                'number': clean_phone,
                'message': message
            }, timeout=8)
            
            if resp.status_code == 200:
                print(f"✅ WhatsApp enviado a {clean_phone}")
                return True
            else:
                print(f"⚠️ WhatsApp respuesta {resp.status_code}: {resp.text}")
        except Exception as e:
            print(f"❌ WhatsApp (intento {attempt + 1}/{retries + 1}): {e}")
            if attempt < retries:
                time.sleep(2 ** attempt)
    
    return False


# --- Image Processing Functions (imports diferidos) ---

def draw_text_utf8(image, text, position, font_size=15, color=(255, 255, 255)):
    import cv2
    import numpy as np
    try:
        from PIL import Image, ImageDraw, ImageFont
        pil_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(pil_image)
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except IOError:
            font = ImageFont.load_default()
        draw.text(position, text, font=font, fill=color)
        return cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    except ImportError:
        cv2.putText(image, text, position, cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
        return image


def get_all_views_for_frame(frame, yolo_m, basket_m, pose_m, colors_util):
    """Procesa un frame y retorna un diccionario con todas las vistas."""
    import cv2
    import numpy as np
    
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


def run_analysis_background(task_id, upload_path, file_type, tasks, user_email=None):
    """Worker function para análisis en un thread de fondo.
    
    IMPORTANTE: Después del análisis, DESCARGA los modelos de RAM para
    mantener el footprint bajo y evitar que Render mate el proceso.
    """
    import cv2
    import numpy as np
    
    mem_start = get_memory_mb()
    print(f"🔬 Iniciando análisis para tarea: {task_id} (tipo: {file_type}) | RAM: {mem_start:.0f}MB")
    tasks[task_id] = {'status': 'processing'}
    
    try:
        yolo_m, basket_m, pose_m, colors_util = _lazy_load_models()
        if not all([yolo_m, basket_m, pose_m, colors_util]):
            raise RuntimeError("No se pudieron cargar los modelos YOLO.")

        RESULTS_FOLDER = os.path.join(BASE_DIR, 'static/results')
        os.makedirs(RESULTS_FOLDER, exist_ok=True)
        
        result_urls = {}
        original_filename = os.path.basename(upload_path)
        result_urls['original'] = f"/static/uploads/{original_filename}"
        
        if file_type == 'image':
            frame = cv2.imread(upload_path)
            if frame is None: raise ValueError("No se pudo leer el archivo de imagen")
            
            all_views = get_all_views_for_frame(frame, yolo_m, basket_m, pose_m, colors_util)
            
            for key, img_array in all_views.items():
                result_filename = f"{task_id}_{key}.jpg"
                result_path = os.path.join(RESULTS_FOLDER, result_filename)
                cv2.imwrite(result_path, img_array)
                result_urls[key] = f"/static/results/{result_filename}"
            
            # Liberar frame y vistas de memoria
            del frame, all_views
            gc.collect()
            
            tasks[task_id] = {
                'status': 'complete',
                'result_urls': result_urls,
                'result_type': file_type,
                'available_views': list(result_urls.keys())
            }

        elif file_type == 'video':
            cap = cv2.VideoCapture(upload_path)
            if not cap.isOpened(): raise ValueError("No se pudo abrir el archivo de video")

            fps = cap.get(cv2.CAP_PROP_FPS)
            width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

            video_writers = {}
            first_frame = True
            all_view_keys = []

            while cap.isOpened():
                ret, frame = cap.read()
                if not ret: break
                
                processed_views = get_all_views_for_frame(frame, yolo_m, basket_m, pose_m, colors_util)
                
                if first_frame:
                    all_view_keys = list(processed_views.keys())
                    for key in all_view_keys:
                        result_filename = f"{task_id}_{key}.mp4"
                        result_path = os.path.join(RESULTS_FOLDER, result_filename)
                        video_writers[key] = cv2.VideoWriter(result_path, cv2.VideoWriter_fourcc(*'avc1'), fps, (width, height))
                        result_urls[key] = f"/static/results/{result_filename}"
                    first_frame = False

                for key, view_frame in processed_views.items():
                    if key in video_writers:
                        if len(view_frame.shape) == 2:
                            view_frame = cv2.cvtColor(view_frame, cv2.COLOR_GRAY2BGR)
                        if view_frame.shape[0] != height or view_frame.shape[1] != width:
                            view_frame = cv2.resize(view_frame, (width, height))
                        video_writers[key].write(view_frame)
                
                # Liberar cada frame procesado
                del processed_views
            
            cap.release()
            for writer in video_writers.values():
                writer.release()
            del video_writers
            gc.collect()
            
            tasks[task_id] = {
                'status': 'complete',
                'result_urls': result_urls,
                'result_type': file_type,
                'available_views': all_view_keys
            }

        # ============================================================
        # CRÍTICO: Descargar modelos de RAM después del análisis
        # Esto libera ~150-200MB y evita que Render mate el proceso
        # ============================================================
        _unload_models()

        # --- Notificaciones con fallback ---
        subject = f"🏀 AthenaBall: Análisis completado ({task_id[:8]})"
        body = f"Hola,\n\nTu análisis de {file_type} en AthenaBall ha finalizado con éxito.\n\n"
        body += f"ID de Tarea: {task_id}\n"
        body += f"Archivo original: {original_filename}\n\n"
        body += "Ya puedes ver los resultados en el dashboard.\n\n¡Gracias por usar Basketball Holístico!"
        
        primary_email = os.environ.get('EMAIL_USER', 'mexaion018@gmail.com')
        send_email_notification(primary_email, subject, body)
        
        if user_email and user_email != primary_email:
            send_email_notification(user_email, subject, body)

        mem_end = get_memory_mb()
        print(f"✅ Análisis completado para tarea: {task_id} | RAM final: {mem_end:.0f}MB")

    except Exception as e:
        print(f"❌ Error en tarea {task_id}: {e}")
        traceback.print_exc()
        tasks[task_id] = {'status': 'failed', 'error': str(e)}
        
        # Incluso si falla, descargar modelos para liberar RAM
        try:
            _unload_models()
        except Exception:
            pass


# --- App Factory ---
DIST_DIR = os.path.join(os.path.dirname(BASE_DIR), 'dist')

def create_app():
    app = Flask(__name__, static_folder=DIST_DIR, static_url_path='')
    
    from flask_cors import CORS
    CORS(app)
    
    app.config['UPLOAD_FOLDER'] = os.path.join(BASE_DIR, 'static/uploads')
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Usar un dict normal con lock en vez de multiprocessing.Manager (ahorra ~30MB RAM)
    tasks = {}
    tasks_lock = threading.Lock()

    # --- Servir Frontend (SPA) ---
    @app.route('/')
    def serve_frontend():
        return send_from_directory(DIST_DIR, 'index.html')

    @app.route('/api/')
    def api_index():
        return jsonify({"status": "running", "service": "AthenaBall API"})

    @app.route('/api/memory', methods=['GET'])
    def memory_status():
        """Endpoint de monitoreo de memoria para debugging."""
        mem = get_memory_mb()
        return jsonify({
            "memory_mb": round(mem, 1),
            "models_loaded": _models_loaded,
            "limit_mb": 512,
            "usage_pct": round(mem / 512 * 100, 1)
        })

    @app.route('/api/analyze', methods=['POST'])
    def analyze():
        # Verificar memoria antes de aceptar análisis
        current_mem = get_memory_mb()
        if current_mem > 400:
            gc.collect()
            current_mem = get_memory_mb()
            if current_mem > 400:
                return jsonify({
                    'error': 'Servidor con memoria alta. Intenta de nuevo en unos minutos.',
                    'memory_mb': round(current_mem, 1)
                }), 503

        if 'file' not in request.files: return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '': return jsonify({'error': 'No selected file'}), 400

        task_id = str(uuid.uuid4())
        filename = f"{task_id}_{os.path.basename(file.filename)}"
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(upload_path)

        file_type = 'video' if 'video' in file.content_type else 'image'
        original_file_url = f"/static/uploads/{filename}"
        
        with tasks_lock:
            tasks[task_id] = {'status': 'pending'}

        user_email = request.form.get('user_email')

        thread = threading.Thread(
            target=run_analysis_background,
            args=(task_id, upload_path, file_type, tasks, user_email),
            daemon=True
        )
        thread.start()

        return jsonify({
            'task_id': task_id,
            'original_file_url': original_file_url,
            'file_type': file_type,
            'available_views': []
        }), 202

    # --- User Management ---
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

    def _send_unified_notifications_worker(data, action_type="ACTUALIZACIÓN"):
        """Worker interno que envía notificaciones (se ejecuta en background thread)."""
        try:
            name = data.get('name', 'N/A')
            email = data.get('email', 'N/A')
            phone = data.get('phone', '')
            bio = data.get('bio', 'N/A')
            
            print(f"\n{'='*60}")
            print(f"🔔 SISTEMA DE NOTIFICACIONES - {action_type}")
            print(f"   Usuario: {name} | Email: {email} | Tel: {phone}")
            print(f"{'='*60}")
            
            emoji = "👤"
            if "REGISTRO" in action_type.upper(): emoji = "🆕"
            elif "SESIÓN" in action_type.upper(): emoji = "🔐"
            elif "CIERRE" in action_type.upper(): emoji = "🛑"
            
            # --- Email (siempre se intenta como canal más confiable) ---
            subject = f"{emoji} {action_type}: {name}"
            body = f"Evento de Basketball Holístico: {action_type}\n\n"
            body += f"Nombre: {name}\n"
            body += f"Email: {email}\n"
            body += f"Teléfono: {phone}\n"
            body += f"Bio: {bio}\n\n"
            body += f"Acción: {action_type}\n"
            
            primary_email = os.environ.get('EMAIL_USER', 'arressarton@gmail.com')
            
            # Admin SIEMPRE recibe email
            print(f"📧 [1/3] Enviando email al admin ({primary_email})...")
            email_sent = send_email_notification(primary_email, subject, body)
            
            # Usuario (si no es admin)
            if email and email != primary_email and '@' in email:
                print(f"📧 [2/3] Enviando email al usuario ({email})...")
                send_email_notification(email, subject, body)
            
            # --- WhatsApp (se intenta, con fallback a email si falla) ---
            whatsapp_sent = False
            if phone:
                print(f"📱 [3/3] Enviando WhatsApp a {phone}...")
                whatsapp_msg = f"{emoji} *{action_type}*\n\n"
                whatsapp_msg += f"👤 *Usuario:* {name}\n"
                whatsapp_msg += f"📧 *Email:* {email}\n"
                whatsapp_msg += f"📱 *Móvil:* {phone}\n\n"
                whatsapp_msg += "_Notificación automática del sistema._"
                
                whatsapp_sent = send_whatsapp_notification(phone, whatsapp_msg)
                
                if not whatsapp_sent and not email_sent:
                    print(f"⚠️ ALERTA CRÍTICA: Ni WhatsApp ni Email funcionaron para {name}")
                    send_email_notification(primary_email, f"⚠️ FALLBACK: {subject}", body)
            else:
                print(f"📱 [3/3] Sin teléfono registrado, omitiendo WhatsApp")
            
            print(f"📊 RESULTADO '{action_type}': Email={'✅' if email_sent else '❌'} WhatsApp={'✅' if whatsapp_sent else '❌'}")
            print(f"{'='*60}\n")
        except Exception as e:
            print(f"❌ ERROR CRÍTICO en notificaciones: {type(e).__name__}: {e}")
            traceback.print_exc()

    def send_unified_notifications(data, action_type="ACTUALIZACIÓN"):
        """Envía alertas en un thread de fondo para no bloquear el request HTTP."""
        thread = threading.Thread(
            target=_send_unified_notifications_worker,
            args=(data.copy() if isinstance(data, dict) else data, action_type),
            daemon=True
        )
        thread.start()
        print(f"🚀 Notificación '{action_type}' despachada en background (thread)")

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
            
        send_unified_notifications(user['profile'], action_type="INICIO DE SESIÓN")
        
        return jsonify({'status': 'success', 'user': user['profile']}), 200

    @app.route('/api/logout', methods=['POST'])
    def logout_notify():
        data = request.json
        if data:
            send_unified_notifications(data, action_type="CIERRE DE SESIÓN")
        return jsonify({'status': 'success'}), 200

    @app.route('/api/whatsapp-status', methods=['GET'])
    def whatsapp_status():
        """Puente para verificar el estado del Motor Ninja desde la web."""
        try:
            import requests
            resp = requests.get('http://localhost:3002/status', timeout=3)
            return jsonify(resp.json()), 200
        except Exception as e:
            return jsonify({"ready": False, "error": "Motor Ninja no responde", "details": str(e)}), 503

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
            
            send_unified_notifications(data, action_type="PERFIL ACTUALIZADO")
            
            return jsonify({'status': 'success', 'message': 'Perfil guardado'}), 200
            
        return jsonify({'error': 'User not found'}), 404

    @app.route('/api/notification-test', methods=['GET'])
    def notification_test():
        """Endpoint de diagnóstico para verificar configuración de notificaciones."""
        sender_email = os.environ.get('EMAIL_USER', 'arressarton@gmail.com').strip()
        sender_password = os.environ.get('EMAIL_PASS', '').replace(' ', '').replace('\r', '').replace('\n', '').strip()
        
        # Test de WhatsApp
        wa_status = {"ready": False, "error": "No probado"}
        try:
            import requests as req
            resp = req.get('http://localhost:3002/status', timeout=3)
            wa_status = resp.json()
        except Exception as e:
            wa_status = {"ready": False, "error": str(e)}
        
        # Test de Email (solo verificar login, no enviar)
        email_status = {"configured": False, "error": ""}
        if sender_password:
            email_status["configured"] = True
            email_status["user"] = sender_email
            email_status["pass_length"] = len(sender_password)
            try:
                server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)
                server.login(sender_email, sender_password)
                server.quit()
                email_status["login_ok"] = True
            except Exception as e:
                email_status["login_ok"] = False
                email_status["error"] = str(e)
        else:
            email_status["error"] = "EMAIL_PASS no configurado en variables de entorno"
        
        # Si se pide envío de prueba
        send_test = request.args.get('send', 'false').lower() == 'true'
        test_result = None
        if send_test:
            test_email = request.args.get('to', sender_email)
            test_result = send_email_notification(
                test_email,
                "🧪 TEST: Notificación de prueba",
                "Este es un email de prueba del sistema AthenaBall.\nSi recibes esto, el email funciona correctamente.\n\n¡Saludos!"
            )
        
        return jsonify({
            "email": email_status,
            "whatsapp": wa_status,
            "test_sent": test_result,
            "env_vars": {
                "EMAIL_USER_set": bool(os.environ.get('EMAIL_USER')),
                "EMAIL_PASS_set": bool(os.environ.get('EMAIL_PASS')),
            }
        }), 200

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
    
    # --- Catch-all: React Router SPA ---
    @app.errorhandler(404)
    def not_found(e):
        if request.path.startswith('/api/'):
            return jsonify({'error': 'Not found'}), 404
        return send_from_directory(DIST_DIR, 'index.html')
    
    return app


# Exponer app a nivel de módulo para Gunicorn: `gunicorn app:app`
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=False)