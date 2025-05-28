document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const editBtn = document.getElementById('editBtn');
    const imageReviewModal = document.getElementById('imageReviewModal');
    const reviewImage = document.getElementById('reviewImage');
    const deleteImageBtn = document.getElementById('deleteImageBtn');
    const editModal = document.getElementById('editModal');
    const editCanvas = document.getElementById('editCanvas');
    const cropX = document.getElementById('cropX');
    const cropY = document.getElementById('cropY');
    const cropWidth = document.getElementById('cropWidth');
    const cropHeight = document.getElementById('cropHeight');
    const brightness = document.getElementById('brightness');
    const contrast = document.getElementById('contrast');
    const backgroundColor = document.getElementById('bgColor');
    const editCancelBtn = document.getElementById('cancelEdit');
    const editApplyBtn = document.getElementById('editApplyBtn');
    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    const genresModal = document.getElementById('genresModal');
    const closeGenresModal = document.getElementById('closeGenresModal');
    const genresList = document.getElementById('genresList');

    // State Variables
    let selectedFile = null;
    let editedImage = null;
    const ctx = editCanvas?.getContext('2d');
    let image = new Image();
    let cropRect = { x: 0, y: 0, width: 200, height: 200 };
    let brightnessValue = 0;
    let contrastValue = 0;
    let bgColor = 'white';

    // Initialize jsPDF
    const { jsPDF } = window.jspdf;

    // Firebase Initialization
    const firebaseConfig = {
        apiKey: "AIzaSyCoIdMx9Zd7kQt9MSZmowbphaQVRl8D16E",
        authDomain: "admissionformdb.firebaseapp.com",
        projectId: "admissionformdb",
        storageBucket: "admissionformdb.firebasestorage.app",
        messagingSenderId: "398052082157",
        appId: "1:398052082157:web:0bc02d66cbdf55dd2567e4",
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Navigation Events
    const homeIcon = document.querySelector('.home-icon');
    const settingsIcon = document.getElementById('settingsIcon');
    const accountIcon = document.getElementById('accountIcon');
    if (homeIcon) {
        homeIcon.addEventListener('click', () => window.location.href = 'index.html');
    }
    if (settingsIcon) {
        settingsIcon.addEventListener('click', () => window.location.href = 'settings.html');
    }
    if (accountIcon) {
        accountIcon.addEventListener('click', () => window.location.href = 'account.html');
    }

    // Setup Chat History Event Handlers from chatHistory.js
    setupChatHistoryEventHandlers();

    // Show Typing Indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        if (messagesDiv) {
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        return typingDiv;
    }

    // Display Progressive Message
    function displayProgressiveMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        const words = message.split(' ');
        let currentIndex = 0;

        function addNextWord() {
            if (currentIndex < words.length) {
                messageDiv.innerHTML = sanitizeMessage(words.slice(0, currentIndex + 1).join(' '));
                currentIndex++;
                setTimeout(addNextWord, 100);
            } else {
                saveChatHistory(message, sender);
            }
        }

        addNextWord();

        if (welcomeMessage && welcomeMessage.style.display !== 'none') {
            welcomeMessage.classList.add('fade-out');
            setTimeout(() => {
                welcomeMessage.style.display = 'none';
                welcomeMessage.classList.remove('fade-out');
            }, 300);
        }
    }

    // Display Message
    function displayMessage(message, sender) {
        if (sender === 'bot') {
            displayProgressiveMessage(sanitizeMessage(message), sender);
        } else {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('user-message', 'slide-in');
            messageDiv.innerHTML = sanitizeMessage(message);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            if (welcomeMessage && welcomeMessage.style.display !== 'none') {
                welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    welcomeMessage.classList.remove('fade-out');
                }, 300);
            }
            saveChatHistory(message, sender);
        }
    }

    // Message Sending
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.repeat) sendMessage();
        });
    }

    function sendMessage() {
        const message = userInput?.value.trim();
        if (message) {
            displayMessage(message, 'user');
            saveChatHistory(message, 'user');
            callRasaAPI(message);
            userInput.value = '';
        } else if (selectedFile) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('user-message', 'slide-in');
            const img = document.createElement('img');
            img.src = previewImage?.src || '';
            img.classList.add('image-preview');
            img.addEventListener('click', () => openImageModal(img.src));
            messageDiv.appendChild(img);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            if (welcomeMessage && welcomeMessage.style.display !== 'none') {
                welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    welcomeMessage.classList.remove('fade-out');
                }, 300);
            }

            const formData = new FormData();
            formData.append('image', selectedFile);
            fetch('http://localhost:5000/upload-image', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.image_url) {
                        callRasaAPI(data.image_url);
                        saveChatHistory(`[Image: ${selectedFile.name}]`, 'user');
                    } else if (data.error) {
                        console.error('Image Upload Error:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Image Upload Error:', error);
                });
            clearPreview();
        }
    }

    // Image Upload and Preview
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => fileInput?.click());
    }
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (previewImage) {
                        previewImage.src = e.target.result;
                    }
                    if (previewContainer) {
                        previewContainer.style.display = 'flex';
                    }
                    if (userInput) {
                        userInput.style.paddingLeft = '110px';
                    }
                };
                reader.onerror = () => {
                    displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                };
                reader.readAsDataURL(file);
            }
            fileInput.value = '';
        });
    }

    // Image Review Modal
    if (previewImage) {
        previewImage.addEventListener('click', () => {
            if (reviewImage) {
                reviewImage.src = previewImage.src;
            }
            if (imageReviewModal) {
                imageReviewModal.style.display = 'flex';
            }
        });
    }

    // Image Editing
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            image.src = previewImage?.src || '';
            image.onload = () => {
                if (editCanvas) {
                    editCanvas.width = image.width;
                    editCanvas.height = image.height;
                    cropRect.width = Math.min(200, image.width);
                    cropRect.height = Math.min(200, image.height);
                    drawImage();
                    if (editModal) {
                        editModal.style.display = 'flex';
                    }
                }
            };
        });
    }

    // Canvas Editing Controls
    if (cropX) {
        cropX.addEventListener('input', () => {
            cropRect.x = parseInt(cropX.value);
            drawImage();
        });
    }
    if (cropY) {
        cropY.addEventListener('input', () => {
            cropRect.y = parseInt(cropY.value);
            drawImage();
        });
    }
    if (cropWidth) {
        cropWidth.addEventListener('input', () => {
            cropRect.width = parseInt(cropWidth.value);
            drawImage();
        });
    }
    if (cropHeight) {
        cropHeight.addEventListener('input', () => {
            cropRect.height = parseInt(cropHeight.value);
            drawImage();
        });
    }
    if (brightness) {
        brightness.addEventListener('input', () => {
            brightnessValue = parseInt(brightness.value);
            drawImage();
        });
    }
    if (contrast) {
        contrast.addEventListener('input', () => {
            contrastValue = parseInt(contrast.value);
            drawImage();
        });
    }
    if (backgroundColor) {
        backgroundColor.addEventListener('change', () => {
            bgColor = backgroundColor.value;
            drawImage();
        });
    }

    function drawImage() {
        if (ctx) {
            ctx.clearRect(0, 0, editCanvas.width, editCanvas.height);
            ctx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
            ctx.fillRect(0, 0, editCanvas.width, editCanvas.height);
            ctx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
            ctx.drawImage(image, 0, 0);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);
            ctx.filter = 'none';
        }
    }

    // Apply Edited Image
    if (editApplyBtn) {
        editApplyBtn.addEventListener('click', () => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = cropRect.width;
            tempCanvas.height = cropRect.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
                tempCtx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
                tempCtx.fillRect(0, 0, cropRect.width, cropRect.height);
                tempCtx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
                tempCtx.drawImage(image, cropRect.x, cropRect.y, cropRect.width, cropRect.height, 0, 0, cropRect.width, cropRect.height);
                editedImage = tempCanvas.toDataURL('image/jpeg');
                if (previewImage) {
                    previewImage.src = editedImage;
                }
                callRasaAPI("show_review");
                if (editModal) {
                    editModal.style.display = 'none';
                }
            }
        });
    }

    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', () => {
            if (editModal) {
                editModal.style.display = 'none';
            }
        });
    }

    function openImageModal(imageSrc) {
        if (reviewImage) {
            reviewImage.src = imageSrc;
        }
        if (imageReviewModal) {
            imageReviewModal.style.display = 'flex';
        }
    }

    if (imageReviewModal) {
        imageReviewModal.addEventListener('click', (e) => {
            if (e.target === imageReviewModal || e.target === deleteImageBtn) {
                imageReviewModal.style.display = 'none';
            }
        });
    }

    if (deleteImageBtn) {
        deleteImageBtn.addEventListener('click', () => {
            clearPreview();
            if (imageReviewModal) {
                imageReviewModal.style.display = 'none';
            }
        });
    }

    function clearPreview() {
        selectedFile = null;
        editedImage = null;
        if (previewImage) {
            previewImage.src = '';
        }
        if (previewContainer) {
            previewContainer.style.display = 'none';
        }
        if (userInput) {
            userInput.style.paddingLeft = '15px';
        }
    }

    function displayReview(reviewData) {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card', 'slide-in');
        reviewCard.setAttribute('data-editable', 'true');
        reviewCard.setAttribute('data-id', Date.now());
        reviewCard.setAttribute('data-confirmed', 'false');
        reviewCard.innerHTML = '<h3>আপনার তথ্য রিভিউ</h3>';

        const reviewContent = document.createElement('div');
        reviewContent.classList.add('review-content');

        for (const [key, value] of Object.entries(reviewData)) {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.setAttribute('data-key', key);

            const label = document.createElement('label');
            label.innerText = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ') + ':';
            reviewItem.appendChild(label);

            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                const img = document.createElement('img');
                img.src = value;
                reviewItem.appendChild(img);
            } else {
                const p = document.createElement('p');
                p.innerText = value;
                reviewItem.appendChild(p);
            }

            reviewContent.appendChild(reviewItem);
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'review-buttons';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn ripple-btn';
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', () => toggleEditMode(reviewCard, reviewData));

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'confirm-btn ripple-btn';
        confirmBtn.innerText = 'Confirm';
        confirmBtn.style.display = 'inline-block';
        let isProcessing = false;

        confirmBtn.addEventListener('click', async () => {
            if (isProcessing) return;
            isProcessing = true;
            confirmBtn.disabled = true;

            try {
                const updatedData = {};
                reviewContent.querySelectorAll('.review-item').forEach(item => {
                    const key = item.getAttribute('data-key');
                    const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                    if (!value) {
                        console.warn(`কোনো মান পাওয়া যায়নি: ${key}`);
                    }
                    updatedData[key] = value;
                });

                await db.collection('submissions').add({
                    review_data: updatedData,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    chat_id: currentChatId
                });

                displayMessage('আপনার তথ্য সফলভাবে ফায়ারবেজে পাঠানো হয়েছে!', 'bot');
                // Call generatePDF from pdfGenerator.js
                generatePDF(updatedData, reviewCard);
                reviewCard.setAttribute('data-confirmed', 'true');
                reviewCard.setAttribute('data-editable', 'false');
                editBtn.disabled = true;
                editBtn.style.display = 'none';
                confirmBtn.style.display = 'none';

                buttonContainer.innerHTML = '';
                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download-btn ripple-btn';
                downloadBtn.innerText = 'Download PDF';
                downloadBtn.addEventListener('click', () => {
                    const pdfUrl = reviewCard.getAttribute('data-pdf-url');
                    if (pdfUrl) {
                        const link = document.createElement('a');
                        link.href = pdfUrl;
                        link.download = 'formbondhu_submission.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        displayMessage('পিডিএফ ডাউনলোডের জন্য URL পাওয়া যায়নি।', 'bot');
                    }
                });
                buttonContainer.appendChild(downloadBtn);
            } catch (error) {
                let errorMessage = 'অজানা ত্রুটি ঘটেছে।';
                if (error.code && error.message) {
                    errorMessage = `ফায়ারবেজে তথ্য পাঠাতে সমস্যা: ${error.message}`;
                }
                displayMessage(errorMessage, 'bot');
                console.error('Error in confirm button:', error);
                confirmBtn.disabled = false;
            } finally {
                isProcessing = false;
            }
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(confirmBtn);

        reviewCard.appendChild(reviewContent);
        reviewCard.appendChild(buttonContainer);
        if (messagesDiv) {
            messagesDiv.appendChild(reviewCard);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        if (welcomeMessage && welcomeMessage.style.display !== 'none') {
            welcomeMessage.classList.add('fade-out');
            setTimeout(() => {
                welcomeMessage.style.display = 'none';
                welcomeMessage.classList.remove('fade-out');
            }, 300);
        }
    }

    function toggleEditMode(card, reviewData) {
        if (card.getAttribute('data-confirmed') === 'true') {
            displayMessage('ডেটা কনফার্ম হয়ে গেছে। এডিট করা যাবে না।', 'bot');
            return;
        }

        const isEditable = card.getAttribute('data-editable') === 'true';
        const reviewContent = card.querySelector('.review-content');
        const editBtn = card.querySelector('.edit-btn');
        const confirmBtn = card.querySelector('.confirm-btn');

        if (!isEditable) {
            card.setAttribute('data-editable', 'true');
            editBtn.innerText = 'Save';
            confirmBtn.style.display = 'none';

            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label>`;

                if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                    const img = document.createElement('img');
                    img.src = value;
                    item.appendChild(img);

                    const replaceIcon = document.createElement('i');
                    replaceIcon.className = 'fas fa-camera replace-image-icon';
                    item.appendChild(replaceIcon);

                    const replaceInput = document.createElement('input');
                    replaceInput.type = 'file';
                    replaceInput.className = 'replace-image-input';
                    replaceInput.accept = 'image/png, image/jpeg';
                    replaceInput.style.display = 'none';
                    item.appendChild(replaceInput);

                    replaceIcon.addEventListener('click', () => replaceInput.click());

                    replaceInput.addEventListener('change', () => {
                        const file = replaceInput.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                img.src = e.target.result;
                            };
                            reader.onerror = () => {
                                displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                            };
                            reader.readAsDataURL(file);
                        } else {
                            displayMessage('কোনো ইমেজ সিলেক্ট করা হয়নি।', 'bot');
                        }
                    });
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = value || '';
                    input.className = 'edit-input';
                    item.appendChild(input);
                }
            });
        } else {
            const updatedData = { ...reviewData };
            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const input = item.querySelector('input.edit-input');
                const img = item.querySelector('img');
                if (input) {
                    const newValue = input.value.trim();
                    updatedData[key] = newValue;
                    item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><p>${sanitizeMessage(newValue)}</p>`;
                } else if (img) {
                    updatedData[key] = img.src;
                    item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><img src="${img.src}">`;
                }
            });

            card.setAttribute('data-editable', 'false');
            editBtn.innerText = 'Edit';
            confirmBtn.style.display = 'inline-block';
        }
    }

    function displayLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('loading', 'slide-in');
        loadingDiv.innerHTML = 'Loading <span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        if (messagesDiv) {
            messagesDiv.appendChild(loadingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        return loadingDiv;
    }

    function removeLoading(loadingDiv) {
        if (loadingDiv) {
            loadingDiv.classList.add('slide-out');
            setTimeout(() => loadingDiv.remove(), 300);
        }
    }

    function callRasaAPI(message, metadata = {}) {
        const typingDiv = showTypingIndicator();
        const payload = { sender: currentChatId, message: message };
        if (Object.keys(metadata).length > 0) {
            payload.metadata = metadata;
        }
        setTimeout(() => {
            if (typeof $ !== 'undefined') {
                $.ajax({
                    url: 'http://localhost:5005/webhooks/rest/webhook',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(payload),
                    success: (data) => {
                        typingDiv.remove();
                        if (!data || data.length === 0) {
                            displayMessage('কোনো প্রতিক্রিয়া পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।', 'bot');
                            return;
                        }
                        data.forEach(response => {
                            if (response.text && !response.text.toLowerCase().includes('hi')) {
                                displayMessage(sanitizeMessage(response.text), 'bot');
                            }
                            if (response.custom && response.custom.review_data) {
                                displayReview(response.custom.review_data);
                            }
                            if (response.buttons) {
                                const buttonDiv = document.createElement('div');
                                buttonDiv.classList.add('welcome-buttons');
                                response.buttons.forEach(btn => {
                                    const button = document.createElement('button');
                                    button.innerText = sanitizeMessage(btn.title);
                                    button.classList.add('ripple-btn');
                                    button.addEventListener('click', () => sendMessage(btn.payload));
                                    buttonDiv.appendChild(button);
                                });
                                if (messagesDiv) {
                                    messagesDiv.appendChild(buttonDiv);
                                }
                            }
                        });
                    },
                    error: (error) => {
                        typingDiv.remove();
                        displayMessage('বটের সাথে সংযোগে সমস্যা হয়েছে। দয়া করে সার্ভার চেক করুন।', 'bot');
                        console.error('Rasa API Error:', error.status, error.statusText, error.responseText);
                    }
                });
            } else {
                typingDiv.remove();
                displayMessage('jQuery লোড হয়নি। দয়া করে jQuery লাইব্রেরি যোগ করুন।', 'bot');
            }
        }, 500);
    }

    function renderGenresList() {
        if (genresList) {
            genresList.innerHTML = '';
            genres.forEach(genre => {
                const genreItem = document.createElement('div');
                genreItem.className = 'genre-item ripple-btn';
                genreItem.innerHTML = `<i class="${genre.icon}"></i><span>${sanitizeMessage(genre.name)}</span>`;
                genreItem.addEventListener('click', () => {
                    if (genre.message) {
                        genresModal.classList.add('slide-out');
                        setTimeout(() => {
                            genresModal.style.display = 'none';
                            genresModal.classList.remove('slide-out');
                        }, 300);
                        welcomeMessage.classList.add('fade-out');
                        setTimeout(() => {
                            welcomeMessage.style.display = 'none';
                            welcomeMessage.classList.remove('fade-out');
                        }, 300);
                        displayMessage(sanitizeMessage(genre.message), 'user');
                        saveChatHistory(sanitizeMessage(genre.message), 'user');
                        callRasaAPI(sanitizeMessage(genre.message));
                    } else {
                        console.error(`Message undefined for genre: ${genre.name}`);
                        displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়। দয়া করে অন্য সেবা নির্বাচন করুন।', 'bot');
                    }
                });
                genresList.appendChild(genreItem);
            });
        }
    }

    function openGenresModal() {
        renderGenresList();
        genresModal.classList.add('slide-in');
        genresModal.style.display = 'flex';
        setTimeout(() => genresModal.classList.remove('slide-in'), 300);
    }

    function closeGenresModalFunc() {
        genresModal.classList.add('slide-out');
        setTimeout(() => {
            genresModal.style.display = 'none';
            genresModal.classList.remove('slide-out');
        }, 300);
    }

    if (moreOptionsBtn) {
        moreOptionsBtn.addEventListener('click', openGenresModal);
    }
    if (closeGenresModal) {
        closeGenresModal.addEventListener('click', closeGenresModalFunc);
    }

    document.querySelectorAll('.welcome-buttons button[data-genre]').forEach(button => {
        button.classList.add('ripple-btn');
        button.addEventListener('click', () => {
            const genreName = button.getAttribute('data-genre');
            const genre = genres.find(g => g.name === genreName);
            if (genre && genre.message) {
                welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    welcomeMessage.classList.remove('fade-out');
                }, 300);
                displayMessage(sanitizeMessage(genre.message), 'user');
                saveChatHistory(sanitizeMessage(genre.message), 'user');
                callRasaAPI(sanitizeMessage(genre.message));
            } else {
                console.error(`Genre not found or message undefined for: ${genreName}`);
                displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়। দয়া করে অন্য সেবা নির্বাচন করুন।', 'bot');
            }
        });
    });

    // Initialize
    loadChatHistory();
});
