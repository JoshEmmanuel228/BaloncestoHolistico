document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const loader = document.getElementById('loader');
    const resultsInfo = document.getElementById('results-info');
    const imageDisplay = document.getElementById('image-display');
    const downloadImageButton = document.getElementById('download-image-button');
    const viewsContainer = document.getElementById('views');
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            if (file.type.startsWith('image/')) {
                imageDisplay.innerHTML = `<img src="${objectURL}" alt="Vista previa de la imagen" id="media-viewer">`;
            } else if (file.type.startsWith('video/')) {
                imageDisplay.innerHTML = `<video src="${objectURL}" controls autoplay muted loop id="media-viewer"></video>`;
            }
        }
    });

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Por favor, selecciona un archivo.');
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        loader.style.display = 'block';
        resultsInfo.style.display = 'none';
        downloadImageButton.style.display = 'none';
        viewsContainer.style.display = 'none';
        imageDisplay.innerHTML = '<p>Subiendo y iniciando análisis... Esto puede tardar muchos minutos para videos largos.</p>';

        try {
            const startResponse = await fetch('/analyze', {
                method: 'POST',
                body: formData,
            });

            if (startResponse.status !== 202) {
                const errorData = await startResponse.json();
                throw new Error(errorData.error || 'Failed to start analysis');
            }

            const { task_id } = await startResponse.json();
            imageDisplay.innerHTML = '<p>Análisis en progreso... por favor espera. Esto puede tardar muchos minutos para videos largos.</p>';

            pollForResult(task_id);

        } catch (error) {
            console.error('Error:', error);
            alert(`Ocurrió un error al iniciar el análisis: ${error.message}`);
            imageDisplay.innerHTML = `<p style="color: red;">Fallo en el análisis.</p>`;
            loader.style.display = 'none';
        }
    });

    function pollForResult(taskId) {
        const intervalId = setInterval(async () => {
            try {
                const statusResponse = await fetch(`/status/${taskId}`);
                if (!statusResponse.ok) {
                    clearInterval(intervalId);
                    throw new Error('No se pudo obtener el estado de la tarea');
                }

                const data = await statusResponse.json();

                if (data.status === 'complete') {
                    clearInterval(intervalId);
                    loader.style.display = 'none';
                    displayResults(data);
                } else if (data.status === 'failed') {
                    clearInterval(intervalId);
                    loader.style.display = 'none';
                    throw new Error(data.error || 'El análisis falló en el servidor.');
                }

            } catch (error) {
                clearInterval(intervalId);
                console.error('Polling Error:', error);
                alert(`Ocurrió un error durante el análisis: ${error.message}`);
                imageDisplay.innerHTML = `<p style="color: red;">Fallo en el análisis.</p>`;
                loader.style.display = 'none';
            }
        }, 5000);
    }

    function displayResults(data) {
        if (data.error || !data.result_urls) {
            alert(`Error en el análisis: ${data.error || 'No se encontraron URLs de resultado.'}`);
            imageDisplay.innerHTML = `<p style="color: red;">Fallo en el análisis.</p>`;
            return;
        }

        const { result_urls, result_type } = data;
        
        // For videos, result_urls will have only one key. For images, default to final_combined.
        const mainMediaUrl = result_type === 'video' 
            ? (data.result_urls.original || Object.values(data.result_urls)[0]) 
            : (data.result_urls.final_combined || data.result_urls.original);

        // Change background images after analysis is complete
        document.body.style.backgroundImage = "url('/static/parteunofondofinal.jpg'), url('/static/partedosfondofinal.jpg'), url('/static/Fondobob.jpg')";
        document.body.style.backgroundPosition = "left top, right top, center center";
        document.body.style.backgroundSize = "12.5vw 100%, 12.5vw 100%, 75vw auto";
        document.body.style.backgroundRepeat = "no-repeat, no-repeat, no-repeat";
        document.body.style.backgroundAttachment = "fixed";

        resultsInfo.style.display = 'block';
        downloadImageButton.style.display = 'block';
        document.getElementById('counts').style.display = 'none';

        if (result_type === 'image') {
            imageDisplay.innerHTML = `<img src="${mainMediaUrl}" alt="Resultado del Análisis" id="media-viewer">`;
            viewsContainer.style.display = 'block'; // Show views for images

            const generalButtons = document.getElementById('view-buttons-general');
            const personButtons = document.getElementById('view-buttons-person');
            const ballButtons = document.getElementById('view-buttons-ball');
            const hoopButtons = document.getElementById('view-buttons-hoop');
            
            [generalButtons, personButtons, ballButtons, hoopButtons].forEach(c => c.innerHTML = '');

            const viewMapping = {
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
            };

            const createButton = (key, url) => {
                const button = document.createElement('button');
                button.textContent = viewMapping[key] || key;
                button.addEventListener('click', () => {
                    const mediaViewer = document.getElementById('media-viewer');
                    if (mediaViewer) {
                        if (data.result_type === 'video') {
                            imageDisplay.innerHTML = `<video src="${url}" controls autoplay muted loop id="media-viewer"></video>`;
                        } else {
                            mediaViewer.src = url;
                        }
                    }
                    downloadImageButton.onclick = () => download(url, key, result_type);
                });
                return button;
            };
            
            Object.keys(result_urls).forEach(key => {
                if (viewMapping[key] && result_urls[key]) {
                    let container = generalButtons;
                    if (key.includes('_person')) container = personButtons;
                    else if (key.includes('_ball')) container = ballButtons;
                    else if (key.includes('_hoop')) container = hoopButtons;
                    
                    container.appendChild(createButton(key, result_urls[key]));
                }
            });
            downloadImageButton.onclick = () => download(mainMediaUrl, 'final_combined', result_type);

        } else if (result_type === 'video') {
            imageDisplay.innerHTML = `<video src="${mainMediaUrl}" controls autoplay muted loop id="media-viewer"></video>`;
            viewsContainer.style.display = 'block'; // Show views for videos

            const generalButtons = document.getElementById('view-buttons-general');
            const personButtons = document.getElementById('view-buttons-person');
            const ballButtons = document.getElementById('view-buttons-ball');
            const hoopButtons = document.getElementById('view-buttons-hoop');
            
            [generalButtons, personButtons, ballButtons, hoopButtons].forEach(c => c.innerHTML = '');

            const viewMapping = {
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
            };

            const createButton = (key, url) => {
                const button = document.createElement('button');
                button.textContent = viewMapping[key] || key;
                button.addEventListener('click', () => {
                    const mediaViewer = document.getElementById('media-viewer');
                    if (mediaViewer) {
                        if (data.result_type === 'video') {
                            imageDisplay.innerHTML = `<video src="${url}" controls autoplay muted loop id="media-viewer"></video>`;
                        } else {
                            mediaViewer.src = url;
                        }
                    }
                    downloadImageButton.onclick = () => download(url, key, result_type);
                });
                return button;
            };
            
            Object.keys(data.result_urls).forEach(key => { // Use data.result_urls for videos
                if (viewMapping[key] && data.result_urls[key]) {
                    let container = generalButtons;
                    if (key.includes('_person')) container = personButtons;
                    else if (key.includes('_ball')) container = ballButtons;
                    else if (key.includes('_hoop')) container = hoopButtons;
                    
                    container.appendChild(createButton(key, data.result_urls[key]));
                }
            });
            downloadImageButton.onclick = () => download(mainMediaUrl, 'final_combined', result_type);
        }
    }

    function download(url, key, type) {
        const a = document.createElement('a');
        a.href = url;
        const extension = type === 'image' ? 'jpg' : 'mp4';
        a.download = `athenaball_${key}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});