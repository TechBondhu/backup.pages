document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const sidebar = document.getElementById('sidebar');
    const historyList = document.getElementById('historyList');
    const chatContainer = document.querySelector('.chat-container');
    const historyIcon = document.getElementById('historyIcon');
    const newChatIcon = document.getElementById('newChatIcon');
    const closeSidebar = document.getElementById('closeSidebar');
    const searchInput = document.getElementById('searchInput');
    const chatBox = document.getElementById('chatBox');
    const sidebarIcon = document.getElementById('sidebarIcon');
    const deleteModal = document.getElementById('deleteModal');
    const renameModal = document.getElementById('renameModal');
    const renameInput = document.getElementById('renameInput');
    const renameCancelBtn = document.getElementById('cancelRename');
    const renameSaveBtn = document.getElementById('saveRename');
    const deleteCancelBtn = document.getElementById('cancelDelete');
    const deleteConfirmBtn = document.getElementById('confirmDelete');
    const homeIcon = document.querySelector('.home-icon');
    const settingsIcon = document.getElementById('settingsIcon');
    const accountIcon = document.getElementById('accountIcon');
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

    // State Variables
    let selectedFile = null;
    let editedImage = null;
    const ctx = editCanvas?.getContext('2d');
    let image = new Image();
    let cropRect = { x: 0, y: 0, width: 200, height: 200 };
    let brightnessValue = 0;
    let contrastValue = 0;
    let bgColor = 'white';
    let currentChatId = sessionStorage.getItem('chatId') || Date.now().toString();
    sessionStorage.setItem('chatId', currentChatId);

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
    if (homeIcon) {
        homeIcon.addEventListener('click', () => window.location.href = 'index.html');
    }
    if (settingsIcon) {
        settingsIcon.addEventListener('click', () => window.location.href = 'settings.html');
    }
    if (accountIcon) {
        accountIcon.addEventListener('click', () => window.location.href = 'account.html');
    }

    // Utility: Sanitize Message to Prevent XSS
    function sanitizeMessage(message) {
        if (typeof message !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = message;
        return div.innerHTML
            .replace(/</g, '<')
            .replace(/>/g, '>')
            .replace(/"/g, '"')
            .replace(/'/g, ''')
            .replace(/&/g, '&');
    }

    // Utility: Show Typing Indicator
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

    // Utility: Progressive Message Loading
    function displayProgressiveMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
        if (messagesDiv) {
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

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
        const message = userInput?.value.trim() || '';
        if (message || selectedFile) {
            if (message) {
                const sanitizedMessage = sanitizeMessage(message);
                displayMessage(sanitizedMessage, 'user');
                saveChatHistory(sanitizedMessage, 'user');
                callRasaAPI(sanitizedMessage);
                userInput.value = '';
            }
            if (selectedFile) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('user-message', 'slide-in');
                const img = document.createElement('img');
                img.src = previewImage?.src || '';
                img.classList.add('image-preview');
                img.addEventListener('click', () => openImageModal(img.src));
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
                            displayMessage(`ইমেজ আপলোডে ত্রুটি: ${sanitizeMessage(data.error)}`, 'bot');
                        }
                    })
                    .catch(error => {
                        displayMessage('ইমেজ আপলোডে ত্রুটি হয়েছে।', 'bot');
                        console.error('Image Upload Error:', error);
                    });
                clearPreview();
            }
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

    // Sidebar and Chat History
    if (historyIcon) {
        historyIcon.addEventListener('click', toggleSidebar);
    }
    if (newChatIcon) {
        newChatIcon.addEventListener('click', startNewChat);
    }
    if (closeSidebar) {
        closeSidebar.addEventListener('click', hideSidebar);
    }
    if (sidebarIcon) {
        sidebarIcon.addEventListener('click', toggleSidebar);
    }

    function toggleSidebar() {
        if (sidebar && chatContainer) {
            sidebar.classList.toggle('open');
            chatContainer.classList.toggle('sidebar-open');
            loadChatHistory();
        }
    }

    function hideSidebar() {
        if (sidebar && chatContainer) {
            sidebar.classList.remove('open');
            chatContainer.classList.remove('sidebar-open');
        }
    }

    function startNewChat() {
        currentChatId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('chatId', currentChatId);
        if (messagesDiv) {
            messagesDiv.innerHTML = '';
        }
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
        if (chatBox) {
            chatBox.classList.add('fade-in');
            setTimeout(() => chatBox.classList.remove('fade-in'), 500);
        }
        saveChatHistory('New Chat Started', 'system');
        loadChatHistory();
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

                // Save to Firebase
                await db.collection('submissions').add({
                    review_data: updatedData,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    chat_id: currentChatId
                });

                displayMessage('আপনার তথ্য সফলভাবে ফায়ারবেজে পাঠানো হয়েছে!', 'bot');
                await generatePDF(updatedData, reviewCard);
                reviewCard.setAttribute('data-confirmed', 'true');
                reviewCard.setAttribute('data-editable', 'false');
                editBtn.disabled = true;
                editBtn.style.display = 'none';
                confirmBtn.style.display = 'none';

                // Create Download Button
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

    async function generatePDF(reviewData, reviewCard) {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.setFillColor(30, 58, 138);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text("Formbondhu Submission", 20, 20);
        doc.setFontSize(12);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
        doc.setDrawColor(30, 58, 138);
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);

        let y = 50;
        for (const [key, value] of Object.entries(reviewData)) {
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
            doc.setFont("helvetica", "bold");
            doc.text(`${label}:`, 20, y);
            doc.setFont("helvetica", "normal");

            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                try {
                    const imgData = value;
                    doc.addImage(imgData, 'JPEG', 20, y + 5, 80, 60, undefined, 'FAST');
                    y += 70;
                } catch (error) {
                    doc.text("Image could not be loaded", 20, y + 5);
                    y += 10;
                    console.error('PDF Image Error:', error);
                }
            } else {
                const lines = doc.splitTextToSize(value, 170);
                doc.text(lines, 20, y + 5);
                y += lines.length * 5 + 5;
            }
            y += 5;
        }

        doc.setFillColor(229, 231, 235);
        doc.rect(0, 277, 210, 20, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text("Generated by Formbondhu - www.formbondhu.com", 20, 287);
        doc.text("Page 1 of 1", 180, 287);

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        reviewCard.setAttribute('data-pdf-url', pdfUrl);
    }

    function saveChatHistory(message, sender) {
        let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        if (!chats[currentChatId]) {
            chats[currentChatId] = { title: `Chat ${Object.keys(chats).length + 1}`, messages: [], timestamp: new Date().toISOString() };
        }
        chats[currentChatId].messages.push({ text: message, sender: sender, time: new Date().toISOString() });
        localStorage.setItem('chatHistory', JSON.stringify(chats));
    }

    function loadChatHistory() {
        if (historyList) {
            historyList.innerHTML = '';
        }
        const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        Object.keys(chats).forEach(chatId => {
            const chat = chats[chatId];
            if (chat && chat.title) {
                const item = document.createElement('div');
                item.classList.add('history-item');
                item.setAttribute('data-chat-id', chatId);
                item.innerHTML = `
                    <div class="history-item-content">
                        <p>${sanitizeMessage(chat.title)}</p>
                        <div class="timestamp">${new Date(chat.timestamp).toLocaleString()}</div>
                    </div>
                    <div class="options">
                        <i class="fas fa-ellipsis-v" id="optionIcon-${chatId}"></i>
                    </div>
                    <div class="dropdown" id="dropdown-${chatId}">
                        <div class="dropdown-item rename-item-${chatId}">Rename</div>
                        <div class="dropdown-item delete-item-${chatId}">Delete</div>
                    </div>
                `;
                historyList.appendChild(item);

                item.addEventListener('click', () => loadChat(chatId));
                const optionIcon = item.querySelector(`#optionIcon-${chatId}`);
                const dropdown = item.querySelector(`#dropdown-${chatId}`);
                const renameItem = item.querySelector(`.rename-item-${chatId}`);
                const deleteItem = item.querySelector(`.delete-item-${chatId}`);

                optionIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });

                renameItem.addEventListener('click', () => {
                    if (renameModal) {
                        renameModal.style.display = 'flex';
                    }
                    if (renameInput) {
                        renameInput.value = chat.title;
                    }
                    currentChatId = chatId;
                });

                deleteItem.addEventListener('click', () => {
                    if (deleteModal) {
                        deleteModal.style.display = 'flex';
                    }
                    currentChatId = chatId;
                });
            } else {
                console.warn(`Chat with ID ${chatId} is missing or invalid. Skipping...`);
            }
        });

        if (historyList && historyList.children.length > 0) {
            sidebar.classList.add('open');
            chatContainer.classList.add('sidebar-open');
        }
    }

    function loadChat(chatId) {
        currentChatId = chatId;
        sessionStorage.setItem('chatId', currentChatId);
        const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        const chat = chats[chatId];
        if (chat) {
            messagesDiv.innerHTML = '';
            chat.messages.forEach(msg => {
                displayMessage(msg.text, msg.sender);
            });
            if (welcomeMessage) {
                welcomeMessage.style.display = 'none';
            }
            sidebar.classList.remove('open');
            chatContainer.classList.remove('sidebar-open');
            loadChatHistory();
        }
    }

    if (renameCancelBtn) {
        renameCancelBtn.addEventListener('click', () => {
            if (renameModal) {
                renameModal.style.display = 'none';
            }
        });
    }

    if (renameSaveBtn) {
        renameSaveBtn.addEventListener('click', () => {
            const newTitle = renameInput?.value.trim() || '';
            if (newTitle) {
                let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
                if (chats[currentChatId]) {
                    chats[currentChatId].title = sanitizeMessage(newTitle);
                    localStorage.setItem('chatHistory', JSON.stringify(chats));
                    loadChatHistory();
                }
            }
            if (renameModal) {
                renameModal.style.display = 'none';
            }
        });
    }

    if (deleteCancelBtn) {
        deleteCancelBtn.addEventListener('click', () => {
            if (deleteModal) {
                deleteModal.style.display = 'none';
            }
        });
    }

    if (deleteConfirmBtn) {
        deleteConfirmBtn.addEventListener('click', () => {
            let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
            if (chats[currentChatId]) {
                delete chats[currentChatId];
                localStorage.setItem('chatHistory', JSON.stringify(chats));
                loadChatHistory();
                if (Object.keys(chats).length === 0) {
                    startNewChat();
                } else {
                    messagesDiv.innerHTML = '';
                    if (welcomeMessage) {
                        welcomeMessage.style.display = 'block';
                    }
                }
            }
            if (deleteModal) {
                deleteModal.style.display = 'none';
            }
        });
    }

    // Initialize
    loadChatHistory();
});
