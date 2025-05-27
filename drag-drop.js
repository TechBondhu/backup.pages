// drag-drop.js
document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const userInput = document.getElementById('userInput');
    const fileInput = document.getElementById('fileInput');
    const messagesDiv = document.getElementById('messages');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Drag and Drop Area (using input-area as the drop zone)
    const dropZone = document.querySelector('.input-area');

    // Prevent default behavior for drag events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    // Highlight drop zone when dragging
    dropZone.addEventListener('dragover', () => {
        dropZone.style.background = '#f3f4f6';
        dropZone.style.border = '2px dashed #1E3A8A';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.background = 'transparent';
        dropZone.style.border = 'none';
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
        dropZone.style.background = 'transparent';
        dropZone.style.border = 'none';

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    });

    // Handle files (same logic as fileInput change)
    function handleFiles(files) {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (previewImage) {
                    previewImage.src = e.target.result;
                    previewContainer.style.display = 'flex';
                }
                if (userInput) {
                    userInput.style.paddingLeft = '110px';
                }

                // Set selectedFile for further processing
                if (typeof window.selectedFile !== 'undefined') {
                    window.selectedFile = file;
                }

                // Display image in chat as user message
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('user-message', 'slide-in');
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('image-preview');
                img.addEventListener('click', () => openImageModal(e.target.result));
                messageDiv.appendChild(img);
                if (messagesDiv) {
                    messagesDiv.appendChild(messageDiv);
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                }
                if (welcomeMessage && welcomeMessage.style.display !== 'none') {
                    welcomeMessage.classList.add('fade-out');
                    setTimeout(() => {
                        welcomeMessage.style.display = 'none';
                        welcomeMessage.classList.remove('fade-out');
                    }, 300);
                }

                // Upload to server (mimicking fileInput behavior)
                const formData = new FormData();
                formData.append('image', file);
                fetch('http://localhost:5000/upload-image', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.image_url) {
                            callRasaAPI(data.image_url);
                        } else if (data.error) {
                            console.error('Image Upload Error:', data.error);
                        }
                    })
                    .catch(error => {
                        console.error('Image Upload Error:', error);
                    });
            };
            reader.onerror = () => {
                displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
            };
            reader.readAsDataURL(file);
        }
    }

    // Reuse openImageModal function from scripts.js
    function openImageModal(imageSrc) {
        if (window.reviewImage) {
            window.reviewImage.src = imageSrc;
        }
        if (window.imageReviewModal) {
            window.imageReviewModal.style.display = 'flex';
        }
    }

    // Reuse displayMessage function from scripts.js
    function displayMessage(message, sender) {
        if (window.displayMessage) {
            window.displayMessage(message, sender);
        }
    }

    // Reuse callRasaAPI function from scripts.js
    function callRasaAPI(message, metadata = {}) {
        if (window.callRasaAPI) {
            window.callRasaAPI(message, metadata);
        }
    }

    // Reuse saveChatHistory function from scripts.js
    function saveChatHistory(message, sender) {
        if (window.saveChatHistory) {
            window.saveChatHistory(message, sender);
        }
    }
});
