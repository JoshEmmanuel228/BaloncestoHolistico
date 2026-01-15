import os
import cv2
import numpy as np
import traceback
import uuid
import multiprocessing
from flask import Flask, request, jsonify, render_template

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

def run_analysis_background(task_id, upload_path, file_type, tasks_dict):
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
            tasks_dict[task_id] = {'status': 'complete', 'result_urls': result_urls, 'result_type': file_type, 'available_views': list(all_views.keys())}

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
            
            tasks_dict[task_id] = {'status': 'complete', 'result_urls': result_urls, 'result_type': file_type, 'available_views': all_view_keys}
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

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        # Allow requests to static files, analyze API, and athenaball UI (handled by specific routes)
        if path.startswith('static/') or path == 'analyze' or path == 'athenaball':
            return app.send_static_file(path)
        return render_template('index.html')

    @app.route('/athenaball')
    def athenaball_ui():
        return render_template('athenaball.html')

    @app.route('/analyze', methods=['POST'])
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

        process = multiprocessing.Process(target=run_analysis_background, args=(task_id, upload_path, file_type, tasks))
        process.start()

        return jsonify({'task_id': task_id, 'original_file_url': original_file_url, 'file_type': file_type, 'available_views': []}), 202

    @app.route('/status/<task_id>')
    def task_status(task_id):
        task = tasks.get(task_id)
        if not task: return jsonify({'status': 'failed', 'error': 'Task not found'}), 404
        return jsonify(task)
    
    return app

# Expose app for Gunicorn
app = create_app()

if __name__ == '__main__':
    if not all([YOLO_AVAILABLE, PILLOW_AVAILABLE]):
        print("Faltan dependencias. Por favor, instala 'ultralytics' y 'Pillow'.")
    else:
        multiprocessing.freeze_support()
        # app is already created
        app.run(host='0.0.0.0', port=3001, debug=False)