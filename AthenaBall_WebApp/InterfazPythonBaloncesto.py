import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import cv2
import numpy as np
from PIL import Image, ImageTk, ImageDraw, ImageFont
import threading
import os
import time
import datetime

# --- Dependency Checks ---
try:
    from ultralytics import YOLO
    from ultralytics.utils.plotting import Colors
    YOLO_AVAILABLE = True
except ImportError:
    YOLO_AVAILABLE = False

# --- Core Logic ---

def load_models():
    """Loads models and returns them."""
    if not YOLO_AVAILABLE:
        print("ERROR: La librería 'ultralytics' no está instalada.")
        return None, None, None, None
    try:
        print("Cargando modelos YOLO...")
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        yolo_model_path = os.path.join(BASE_DIR, 'yolov8x-seg.pt')
        basket_model_path = os.path.join(BASE_DIR, 'TRAin2.pt')
        pose_model_path = os.path.join(BASE_DIR, 'yolov8x-pose.pt')

        # Check if files exist
        if not os.path.exists(yolo_model_path): raise FileNotFoundError(f"Model not found: {yolo_model_path}")
        if not os.path.exists(basket_model_path): raise FileNotFoundError(f"Model not found: {basket_model_path}")
        if not os.path.exists(pose_model_path): raise FileNotFoundError(f"Model not found: {pose_model_path}")

        yolo_m = YOLO(yolo_model_path)
        basket_m = YOLO(basket_model_path)
        pose_m = YOLO(pose_model_path)
        colors_util = Colors()
        print("✅ Modelos cargados correctamente.")
        return yolo_m, basket_m, pose_m, colors_util
    except Exception as e:
        print(f"ERROR: No se pudieron cargar los modelos. Error: {e}")
        return None, None, None, None

def draw_text_utf8(image, text, position, font_size=15, color=(255, 255, 255)):
    pil_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(pil_image)
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except IOError:
        font = ImageFont.load_default()
    draw.text(position, text, font=font, fill=color)
    return cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

def get_specific_view(frame, view_name, yolo_m, basket_m, pose_m, colors_util):
    """
    Optimized function to generate ONLY the requested view for real-time performance.
    """
    if view_name == 'original':
        return frame

    h, w, _ = frame.shape
    
    # Run models based on need
    run_seg = view_name in ['final_combined', 'boxes_and_masks', 'color_combined', 'seg_and_pose']
    run_det = view_name in ['final_combined', 'boxes_only', 'boxes_and_masks', 'boxes_and_pose']
    run_pose = view_name in ['final_combined', 'pose_estimation', 'boxes_and_pose', 'seg_and_pose']

    yolo_res = yolo_m(frame, verbose=False)[0] if (run_seg or run_det) else None
    basket_res = basket_m(frame, verbose=False)[0] if run_det else None
    pose_res = pose_m(frame, verbose=False)[0] if run_pose else None

    # --- Construct View ---
    
    if view_name == 'pose_estimation':
        return pose_res.plot(boxes=False)

    # Helper for boxes
    boxes_img = frame.copy()
    if run_det:
        person_color = colors_util(0, bgr=True)
        ball_color = colors_util(32, bgr=True)
        hoop_color = colors_util(3, bgr=True) # HOOP_CLASS_ID = 3

        if yolo_res:
            for box in yolo_res.boxes:
                cls = int(box.cls[0])
                if cls in [0, 32]:
                    color = person_color if cls == 0 else ball_color
                    label = f"{'persona' if cls==0 else 'balón'} {float(box.conf[0]):.2f}"
                    x1, y1, x2, y2 = [int(i) for i in box.xyxy[0]]
                    cv2.rectangle(boxes_img, (x1, y1), (x2, y2), color, 2)
                    boxes_img = draw_text_utf8(boxes_img, label, (x1, y1 - 20), color=color)
        
        if basket_res:
            for box in basket_res.boxes:
                cls = int(box.cls[0])
                if cls in [0, 3]:
                    color = ball_color if cls == 0 else hoop_color
                    label = f"{'balón' if cls==0 else 'aro'} {float(box.conf[0]):.2f}"
                    x1, y1, x2, y2 = [int(i) for i in box.xyxy[0]]
                    cv2.rectangle(boxes_img, (x1, y1), (x2, y2), color, 2)
                    boxes_img = draw_text_utf8(boxes_img, label, (x1, y1 - 20), color=color)
        
        if view_name == 'boxes_only': return boxes_img

    # Helper for masks
    if run_seg:
        mask_person = np.zeros((h, w), dtype=np.uint8)
        if yolo_res and yolo_res.masks:
            for mask, cls in zip(yolo_res.masks.data, yolo_res.boxes.cls):
                if int(cls) == 0:
                    m = (cv2.resize(mask.cpu().numpy(), (w, h)) * 255).astype(np.uint8)
                    mask_person = cv2.bitwise_or(mask_person, m)
        
        color_combined = np.zeros_like(frame)
        color_combined[mask_person > 0] = colors_util(0, bgr=True)
        # Note: Ball/Hoop masks omitted for speed in real-time unless critical
        
        if view_name == 'color_combined': return color_combined
        
        boxes_and_masks = cv2.addWeighted(boxes_img, 1, color_combined, 0.5, 0)
        if view_name == 'boxes_and_masks': return boxes_and_masks

    # Final Combined
    if view_name == 'final_combined':
        # Need everything
        # Re-using logic above, we have boxes_and_masks
        pose_plot = pose_res.plot(boxes=False)
        pose_overlay = cv2.absdiff(cv2.resize(pose_plot, (w, h)), frame)
        return cv2.add(boxes_and_masks, pose_overlay)

    return frame # Fallback

def get_all_views_for_frame(frame, yolo_m, basket_m, pose_m, colors_util):
    """Full processing for static images."""
    # ... (Keep existing implementation for full analysis) ...
    # For brevity in this update, I'm pasting the logic again to ensure it works.
    views = {}
    yolo_model_results = yolo_m(frame, verbose=False)[0]
    basket_model_results = basket_m(frame, verbose=False)[0]
    pose_results = pose_m(frame, verbose=False)[0]

    h, w, _ = frame.shape

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

# --- GUI Application ---

class AthenaBallApp:
    def __init__(self, root):
        self.root = root
        self.root.title("AthenaBall Desktop 🏀🦉")
        self.root.geometry("1200x800")
        self.root.configure(bg="#f0f0f0")

        self.yolo_m = None
        self.basket_m = None
        self.pose_m = None
        self.colors_util = None
        self.current_image = None
        self.processed_views = {}
        self.current_video_path = None
        self.is_video = False
        
        # Camera/Recording State
        self.cap = None
        self.is_camera_active = False
        self.is_recording = False
        self.video_writer = None
        self.record_start_time = None

        self.setup_ui()
        
        self.status_var.set("Cargando modelos... Por favor espere.")
        threading.Thread(target=self.init_models, daemon=True).start()

    def setup_ui(self):
        # Sidebar
        self.sidebar = tk.Frame(self.root, width=250, bg="#2c3e50")
        self.sidebar.pack(side=tk.LEFT, fill=tk.Y)
        self.sidebar.pack_propagate(False)

        tk.Label(self.sidebar, text="AthenaBall", font=("Arial", 20, "bold"), bg="#2c3e50", fg="white").pack(pady=20)

        # File Controls
        self.btn_load = tk.Button(self.sidebar, text="📂 Cargar Archivo", command=self.load_file, 
                                  bg="#3498db", fg="white", font=("Arial", 12), relief=tk.FLAT, padx=10, pady=5)
        self.btn_load.pack(pady=5, fill=tk.X, padx=20)

        self.btn_analyze = tk.Button(self.sidebar, text="🚀 Analizar", command=self.start_analysis, state=tk.DISABLED,
                                     bg="#27ae60", fg="white", font=("Arial", 12), relief=tk.FLAT, padx=10, pady=5)
        self.btn_analyze.pack(pady=5, fill=tk.X, padx=20)

        # Camera Controls
        tk.Label(self.sidebar, text="Cámara / Video", font=("Arial", 12, "bold"), bg="#2c3e50", fg="#bdc3c7").pack(pady=(20, 10))
        
        self.btn_camera = tk.Button(self.sidebar, text="📹 Cámara en Vivo", command=self.toggle_camera,
                                    bg="#e67e22", fg="white", font=("Arial", 12), relief=tk.FLAT, padx=10, pady=5)
        self.btn_camera.pack(pady=5, fill=tk.X, padx=20)

        self.btn_record = tk.Button(self.sidebar, text="🔴 Grabar", command=self.toggle_recording, state=tk.DISABLED,
                                    bg="#c0392b", fg="white", font=("Arial", 12), relief=tk.FLAT, padx=10, pady=5)
        self.btn_record.pack(pady=5, fill=tk.X, padx=20)

        tk.Label(self.sidebar, text="Vista en Vivo:", font=("Arial", 10), bg="#2c3e50", fg="white").pack(pady=(5, 0))
        self.view_var = tk.StringVar(value="final_combined")
        self.view_selector = ttk.Combobox(self.sidebar, textvariable=self.view_var, state="readonly")
        self.view_selector['values'] = ['original', 'final_combined', 'boxes_only', 'pose_estimation', 'boxes_and_masks']
        self.view_selector.pack(pady=5, padx=20, fill=tk.X)

        # View Selection (Scrollable)
        tk.Label(self.sidebar, text="Vistas Disponibles", font=("Arial", 12, "bold"), bg="#2c3e50", fg="#bdc3c7").pack(pady=(20, 10))
        self.views_frame = tk.Frame(self.sidebar, bg="#2c3e50")
        self.views_frame.pack(fill=tk.BOTH, expand=True, padx=10)

        # Main Display
        self.main_area = tk.Frame(self.root, bg="#ecf0f1")
        self.main_area.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)

        self.status_var = tk.StringVar(value="Iniciando...")
        self.status_bar = tk.Label(self.main_area, textvariable=self.status_var, bd=1, relief=tk.SUNKEN, anchor=tk.W, bg="#dfe6e9")
        self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)

        self.canvas = tk.Canvas(self.main_area, bg="black")
        self.canvas.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

    def init_models(self):
        self.yolo_m, self.basket_m, self.pose_m, self.colors_util = load_models()
        if self.yolo_m:
            self.root.after(0, lambda: self.status_var.set("Modelos cargados. Listo."))
        else:
            self.root.after(0, lambda: messagebox.showerror("Error", "No se pudieron cargar los modelos."))

    def load_file(self):
        if self.is_camera_active: self.stop_camera()
        
        file_path = filedialog.askopenfilename(filetypes=[("Imágenes y Videos", "*.jpg *.jpeg *.png *.mp4 *.avi *.mov")])
        if not file_path: return

        self.file_path = file_path
        self.status_var.set(f"Archivo cargado: {os.path.basename(file_path)}")
        self.btn_analyze.config(state=tk.NORMAL)
        
        ext = os.path.splitext(file_path)[1].lower()
        if ext in ['.jpg', '.jpeg', '.png']:
            self.is_video = False
            self.show_image(file_path)
        else:
            self.is_video = True
            self.status_var.set("Video cargado. Presione Analizar.")

    def show_image(self, path_or_array):
        if isinstance(path_or_array, str):
            img = cv2.imread(path_or_array)
            if img is None: return
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        else:
            img = cv2.cvtColor(path_or_array, cv2.COLOR_BGR2RGB)
        
        self.current_image = img
        self.display_current_image()

    def display_current_image(self):
        if self.current_image is None: return

        h, w, _ = self.current_image.shape
        canvas_w = self.canvas.winfo_width()
        canvas_h = self.canvas.winfo_height()
        
        if canvas_w < 10 or canvas_h < 10: return

        scale = min(canvas_w/w, canvas_h/h)
        new_w, new_h = int(w*scale), int(h*scale)
        
        resized = cv2.resize(self.current_image, (new_w, new_h))
        self.photo = ImageTk.PhotoImage(image=Image.fromarray(resized))
        
        self.canvas.delete("all")
        self.canvas.create_image(canvas_w//2, canvas_h//2, image=self.photo, anchor=tk.CENTER)

    # --- Camera & Recording ---

    def toggle_camera(self):
        if self.is_camera_active:
            self.stop_camera()
        else:
            self.start_camera()

    def start_camera(self):
        if not self.yolo_m:
            messagebox.showwarning("Aviso", "Modelos no cargados. La cámara funcionará sin IA.")
        
        self.cap = cv2.VideoCapture(2)
        if not self.cap.isOpened():
            messagebox.showerror("Error", "No se pudo abrir la cámara.")
            return
        
        self.is_camera_active = True
        self.btn_camera.config(text="⏹ Detener Cámara", bg="#c0392b")
        self.btn_record.config(state=tk.NORMAL)
        self.btn_load.config(state=tk.DISABLED)
        self.btn_analyze.config(state=tk.DISABLED)
        
        self.status_var.set("Cámara activa.")
        self.update_camera_frame()

    def stop_camera(self):
        self.is_camera_active = False
        if self.is_recording:
            self.toggle_recording() # Stop recording if active
            
        if self.cap:
            self.cap.release()
            self.cap = None
            
        self.btn_camera.config(text="📹 Cámara en Vivo", bg="#e67e22")
        self.btn_record.config(state=tk.DISABLED)
        self.btn_load.config(state=tk.NORMAL)
        self.canvas.delete("all")
        self.status_var.set("Cámara detenida.")

    def update_camera_frame(self):
        if not self.is_camera_active or not self.cap: return

        ret, frame = self.cap.read()
        if ret:
            # Process Frame
            view_mode = self.view_var.get()
            if self.yolo_m:
                processed_frame = get_specific_view(frame, view_mode, self.yolo_m, self.basket_m, self.pose_m, self.colors_util)
            else:
                processed_frame = frame

            # Show Frame
            self.show_image(processed_frame)

            # Record Frame
            if self.is_recording and self.video_writer:
                self.video_writer.write(processed_frame)

        self.root.after(10, self.update_camera_frame)

    def toggle_recording(self):
        if self.is_recording:
            # Stop Recording
            self.is_recording = False
            if self.video_writer:
                self.video_writer.release()
                self.video_writer = None
            
            self.btn_record.config(text="🔴 Grabar", bg="#c0392b")
            self.status_var.set(f"Grabación guardada en: {self.recording_path}")
            messagebox.showinfo("Grabación", f"Video guardado exitosamente:\n{self.recording_path}")
        else:
            # Start Recording
            if not self.cap: return
            
            # Setup Writer
            width = int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            fps = 20.0 # Webcam FPS approximation
            
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"recording_{timestamp}.mp4"
            output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "recordings")
            os.makedirs(output_dir, exist_ok=True)
            self.recording_path = os.path.join(output_dir, filename)
            
            self.video_writer = cv2.VideoWriter(self.recording_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))
            
            self.is_recording = True
            self.btn_record.config(text="⏹ Detener Grabación", bg="#2c3e50")
            self.status_var.set("🔴 Grabando...")

    # --- Analysis Logic (Existing) ---

    def start_analysis(self):
        if not self.yolo_m:
            messagebox.showerror("Error", "Los modelos no están cargados.")
            return

        self.btn_analyze.config(state=tk.DISABLED)
        self.btn_load.config(state=tk.DISABLED)
        self.status_var.set("Analizando... Esto puede tardar.")
        
        threading.Thread(target=self.run_analysis, daemon=True).start()

    def run_analysis(self):
        try:
            if not self.is_video:
                frame = cv2.imread(self.file_path)
                self.processed_views = get_all_views_for_frame(frame, self.yolo_m, self.basket_m, self.pose_m, self.colors_util)
                self.root.after(0, self.analysis_complete)
            else:
                self.process_video()
        except Exception as e:
            print(e)
            self.root.after(0, lambda: messagebox.showerror("Error", f"Fallo en el análisis: {e}"))
            self.root.after(0, lambda: self.reset_ui())

    def process_video(self):
        cap = cv2.VideoCapture(self.file_path)
        if not cap.isOpened(): raise ValueError("Could not open video")

        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        output_dir = os.path.join(os.path.dirname(self.file_path), "athenaball_results")
        os.makedirs(output_dir, exist_ok=True)
        
        video_writers = {}
        self.processed_views = {}
        
        frame_count = 0
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret: break
            
            views = get_all_views_for_frame(frame, self.yolo_m, self.basket_m, self.pose_m, self.colors_util)
            
            if not video_writers:
                for key in views.keys():
                    out_path = os.path.join(output_dir, f"{key}.mp4")
                    video_writers[key] = cv2.VideoWriter(out_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))
                    self.processed_views[key] = out_path

            for key, view_frame in views.items():
                if len(view_frame.shape) == 2:
                    view_frame = cv2.cvtColor(view_frame, cv2.COLOR_GRAY2BGR)
                video_writers[key].write(view_frame)
            
            frame_count += 1
            if frame_count % 10 == 0:
                self.root.after(0, lambda p=frame_count/total_frames*100: self.status_var.set(f"Procesando video: {p:.1f}%"))

        cap.release()
        for writer in video_writers.values():
            writer.release()
        
        self.root.after(0, self.analysis_complete)

    def analysis_complete(self):
        self.status_var.set("Análisis completado.")
        self.create_view_buttons()
        self.reset_ui()
        if 'final_combined' in self.processed_views:
            self.switch_view('final_combined')

    def create_view_buttons(self):
        for widget in self.views_frame.winfo_children():
            widget.destroy()

        view_names = {
            'original': '🖼️ Original',
            'final_combined': '🏆 Principal',
            'boxes_and_masks': '🎨 Detección + Seg.',
            'boxes_only': '📦 Solo Detección',
            'pose_estimation': '🧘 Solo Pose',
            'boxes_and_pose': '📦+🧘 Cajas + Pose',
            'seg_and_pose': '🎨+🧘 Seg. + Pose',
            'color_combined': '🌈 Solo Segmentación',
            'binary_mask_person': 'Binaria Persona',
            'mask_person_gray': 'Gris Persona',
            'binary_mask_ball': 'Binaria Balón',
            'mask_ball_gray': 'Gris Balón',
            'binary_mask_hoop': 'Binaria Aro',
            'mask_hoop_gray': 'Gris Aro',
        }

        for key in self.processed_views.keys():
            text = view_names.get(key, key)
            btn = tk.Button(self.views_frame, text=text, command=lambda k=key: self.switch_view(k),
                            bg="#34495e", fg="white", relief=tk.FLAT, anchor="w")
            btn.pack(fill=tk.X, pady=2)

    def switch_view(self, key):
        data = self.processed_views[key]
        if self.is_video:
            self.status_var.set(f"Video guardado en: {data}")
            os.startfile(data)
        else:
            self.show_image(data)

    def reset_ui(self):
        self.btn_analyze.config(state=tk.NORMAL)
        self.btn_load.config(state=tk.NORMAL)

if __name__ == "__main__":
    root = tk.Tk()
    app = AthenaBallApp(root)
    root.mainloop()
