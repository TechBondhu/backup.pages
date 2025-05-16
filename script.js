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

    let selectedFile = null;
    let editedImage = null;
    const ctx = editCanvas.getContext('2d');
    let image = new Image();
    let cropRect = { x: 0, y: 0, width: 200, height: 200 };
    let brightnessValue = 0;
    let contrastValue = 0;
    let bgColor = 'white';
    let currentChatId = Date.now().toString();

    // Initialize jsPDF
    const { jsPDF } = window.jspdf;

    // Redirect to home page on home icon click
    homeIcon.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Redirect to settings page on settings icon click
    settingsIcon.addEventListener('click', () => {
        window.location.href = 'settings.html';
    });

    // Redirect to account page on account icon click
    accountIcon.addEventListener('click', () => {
        window.location.href = 'account.html';
    });

    // Send message to Rasa
    function sendMessage(message) {
        console.log('Sending message:', message);
        if (message) {
            displayMessage(message, 'user');
            userInput.value = '';
            saveChatHistory(message, 'user');
            callRasaAPI(message);
        }
        if (selectedFile) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('user-message');
            const img = document.createElement('img');
            img.src = previewImage.src;
            img.classList.add('image-preview');
            img.addEventListener('click', () => openImageModal(img.src));
            messageDiv.appendChild(img);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            if (welcomeMessage.style.display !== 'none') welcomeMessage.style.display = 'none';

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
                    } else if (data.error) {
                        displayMessage(`ত্রুটি: ${data.error}`, 'bot');
                    }
                })
                .catch(error => {
                    displayMessage('ইমেজ আপলোডে ত্রুটি হয়েছে। আবার চেষ্টা করুন।', 'bot');
                    console.error('Upload Error:', error);
                });
            saveChatHistory(`[Image: ${selectedFile.name}]`, 'user');
            clearPreview();
        }
    }

    // Handle Welcome Buttons
    document.querySelectorAll('.welcome-btn').forEach(button => {
        button.addEventListener('click', () => {
            const genreName = button.getAttribute('data-genre');
            const genre = genres.find(g => g.name === genreName);
            if (genre) {
                console.log(`Welcome button clicked: ${genre.name}, Intent: ${genre.intent}`);
                welcomeMessage.style.display = 'none';
                sendMessage(genre.message);
            }
        });
    });

    // Handle More Options Button
    moreOptionsBtn.addEventListener('click', () => {
        console.log('More Options button clicked');
        genresModal.style.display = 'flex';
        populateGenres(sendMessage); // Populate genres from genres.js
    });

    // Close Genres Modal
    closeGenresModal.addEventListener('click', () => {
        console.log('Genres modal closed');
        genresModal.style.display = 'none';
    });

    // Send button and Enter key
    sendBtn.addEventListener('click', () => sendMessage(userInput.value.trim()));
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.repeat) {
            sendMessage(userInput.value.trim());
        }
    });

    // Upload functionality with preview
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            console.log('File selected:', file.name);
            selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'flex';
                userInput.style.paddingLeft = '110px'; // Adjust for preview and edit button
            };
            reader.readAsDataURL(file);
        }
        fileInput.value = '';
    });

    // Preview click to open review modal
    previewImage.addEventListener('click', () => {
        console.log('Preview image clicked');
        reviewImage.src = previewImage.src;
        imageReviewModal.style.display = 'flex';
    });

    // Edit button click to open edit modal
    editBtn.addEventListener('click', () => {
        console.log('Edit button clicked');
        image.src = previewImage.src;
        image.onload = () => {
            editCanvas.width = image.width;
            editCanvas.height = image.height;
            cropRect.width = Math.min(200, image.width);
            cropRect.height = Math.min(200, image.height);
            drawImage();
            editModal.style.display = 'flex';
        };
    });

    // Canvas editing controls
    cropWidth.addEventListener('input', () => {
        cropRect.width = parseInt(cropWidth.value);
        drawImage();
    });

    cropHeight.addEventListener('input', () => {
        cropRect.height = parseInt(cropHeight.value);
        drawImage();
    });

    brightness.addEventListener('input', () => {
        brightnessValue = parseInt(brightness.value);
        drawImage();
    });

    contrast.addEventListener('input', () => {
        contrastValue = parseInt(contrast.value);
        drawImage();
    });

    backgroundColor.addEventListener('change', () => {
        bgColor = backgroundColor.value;
        drawImage();
    });

    function drawImage() {
        ctx.clearRect(0, 0, editCanvas.width, editCanvas.height);
        ctx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
        ctx.fillRect(0, 0, editCanvas.width, editCanvas.height);

        // Apply brightness and contrast
        ctx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
        ctx.drawImage(image, 0, 0);

        // Draw crop rectangle
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);
        ctx.filter = 'none';
    }

    // Apply edited image
    editApplyBtn.addEventListener('click', () => {
        console.log('Applying edited image');
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = cropRect.width;
        tempCanvas.height = cropRect.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
        tempCtx.fillRect(0, 0, cropRect.width, cropRect.height);
        tempCtx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
        tempCtx.drawImage(image, cropRect.x, cropRect.y, cropRect.width, cropRect.height, 0, 0, cropRect.width, cropRect.height);

        editedImage = tempCanvas.toDataURL('image/jpeg');
        previewImage.src = editedImage;

        // Trigger review after editing
        callRasaAPI("show_review");
        editModal.style.display = 'none';
    });

    editCancelBtn.addEventListener('click', () => {
        console.log('Edit cancelled');
        editModal.style.display = 'none';
    });

    // Open image modal from chat
    function openImageModal(imageSrc) {
        console.log('Opening image modal');
        reviewImage.src = imageSrc;
        imageReviewModal.style.display = 'flex';
    }

    // Close review modal on click outside or delete
    imageReviewModal.addEventListener('click', (e) => {
        if (e.target === imageReviewModal || e.target === deleteImageBtn) {
            console.log('Closing image review modal');
            imageReviewModal.style.display = 'none';
        }
    });

    // Delete image from preview
    deleteImageBtn.addEventListener('click', () => {
        console.log('Deleting preview image');
        clearPreview();
        imageReviewModal.style.display = 'none';
    });

    function clearPreview() {
        selectedFile = null;
        editedImage = null;
        previewImage.src = '';
        previewContainer.style.display = 'none';
        userInput.style.paddingLeft = '15px';
    }

    // Sidebar toggle
    historyIcon.addEventListener('click', toggleSidebar);
    newChatIcon.addEventListener('click', startNewChat);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarIcon.addEventListener('click', toggleSidebar);

    function toggleSidebar() {
        console.log('Toggling sidebar');
        sidebar.classList.toggle('open');
        chatContainer.classList.toggle('sidebar-open');
        loadChatHistory();
    }

    function startNewChat() {
        console.log('Starting new chat');
        currentChatId = Date.now().toString();
        messagesDiv.innerHTML = '';
        welcomeMessage.style.display = 'block';
        chatBox.classList.add('fade-in');
        setTimeout(() => chatBox.classList.remove('fade-in'), 500);
        saveChatHistory('New Chat Started', 'system');
        loadChatHistory();
    }

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.innerText = message;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        if (welcomeMessage.style.display !== 'none') welcomeMessage.style.display = 'none';
        saveChatHistory(message, sender);
    }

    function displayReview(reviewData) {
        console.log('Displaying review:', reviewData);
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        reviewCard.setAttribute('data-editable', 'false');
        reviewCard.setAttribute('data-id', Date.now());
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
        editBtn.className = 'edit-btn';
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', () => toggleEditMode(reviewCard, reviewData));

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'confirm-btn';
        confirmBtn.innerText = 'Confirm';
        confirmBtn.style.display = 'inline-block';
        confirmBtn.addEventListener('click', () => {
            console.log('Confirming review');
            const updatedData = {};
            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                updatedData[key] = value;
            });

            // Send confirmed data to Rasa
            $.ajax({
                url: 'http://localhost:5005/webhooks/rest/webhook',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ 
                    sender: 'user', 
                    message: 'confirm_review',
                    metadata: { review_data: updatedData }
                }),
                success: (data) => {
                    displayMessage('আপনার তথ্য সফলভাবে কনফার্ম হয়েছে!', 'bot');
                    
                    // Generate and update PDF
                    generatePDF(updatedData, reviewCard);

                    // Replace buttons with only Download PDF button
                    buttonContainer.innerHTML = '';
                    const downloadBtn = document.createElement('button');
                    downloadBtn.className = 'download-btn';
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
                        }
                    });
                    buttonContainer.appendChild(downloadBtn);

                    data.forEach(response => {
                        if (response.text) {
                            displayMessage(response.text, 'bot');
                        }
                        if (response.custom && response.custom.review_data) {
                            displayReview(response.custom.review_data);
                        }
                    });
                },
                error: (error) => {
                    displayMessage('তথ্য কনফার্ম করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'bot');
                    console.error('Rasa API Error:', error);
                }
            });
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(confirmBtn);

        reviewCard.appendChild(reviewContent);
        reviewCard.appendChild(buttonContainer);
        messagesDiv.appendChild(reviewCard);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        if (welcomeMessage.style.display !== 'none') welcomeMessage.style.display = 'none';
    }

    function toggleEditMode(card, reviewData) {
        console.log('Toggling edit mode for review card');
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
                item.innerHTML = `<label>${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:</label>`;

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
                            reader.readAsDataURL(file);
                        }
                    });
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = value;
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
                    item.innerHTML = `<label>${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:</label><p>${newValue}</p>`;
                } else if (img) {
                    updatedData[key] = img.src;
                    item.innerHTML = `<label>${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:</label><img src="${img.src}">`;
                }
            });

            card.setAttribute('data-editable', 'false');
            editBtn.innerText = 'Edit';
            confirmBtn.style.display = 'inline-block';

            console.log('Updated Review Data:', updatedData);
        }
    }

    function displayLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('loading');
        loadingDiv.innerHTML = 'Loading <span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        messagesDiv.appendChild(loadingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        return loadingDiv;
    }

    function removeLoading(loadingDiv) {
        if (loadingDiv) loadingDiv.remove();
    }

    function callRasaAPI(message, metadata = {}) {
        console.log('Calling Rasa API with message:', message);
        const loadingDiv = displayLoading();
        const payload = { sender: 'user', message: message };
        if (Object.keys(metadata).length > 0) {
            payload.metadata = metadata;
        }
        $.ajax({
            url: 'http://localhost:5005/webhooks/rest/webhook',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: (data) => {
                removeLoading(loadingDiv);
                data.forEach(response => {
                    if (response.text && !response.text.toLowerCase().includes('hi')) {
                        displayMessage(response.text, 'bot');
                    }
                    if (response.custom && response.custom.review_data) {
                        displayReview(response.custom.review_data);
                    }
                    if (response.buttons) {
                        const buttonDiv = document.createElement('div');
                        buttonDiv.classList.add('welcome-buttons');
                        response.buttons.forEach(btn => {
                            const button = document.createElement('button');
                            button.innerText = btn.title;
                            button.addEventListener('click', () => sendMessage(btn.payload));
                            buttonDiv.appendChild(button);
                        });
                        messagesDiv.appendChild(buttonDiv);
                    }
                });
            },
            error: (error) => {
                removeLoading(loadingDiv);
                displayMessage('বটের সাথে সংযোগে ত্রুটি হয়েছে। আবার চেষ্টা করুন।', 'bot');
                console.error('Rasa API Error:', error);
            }
        });
    }

    // Generate professional PDF
    function generatePDF(reviewData, reviewCard) {
        console.log('Generating PDF for review data:', reviewData);
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Set font and styles
        doc.setFont("helvetica");
        doc.setFontSize(16);

        // Stylish header
        doc.setFillColor(30, 58, 138); // Dark blue
        doc.rect(0, 0, 210, 40, 'F'); // Header background
        doc.setTextColor(255, 255, 255);
        doc.text("Formbondhu Submission", 20, 20);
        doc.setFontSize(12);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);

        // Add border
        doc.setDrawColor(30, 58, 138);
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277); // Page border

        // Reset text color for content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);

        // Add review data
        let y = 50;
        for (const [key, value] of Object.entries(reviewData)) {
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
            doc.setFont("helvetica", "bold");
            doc.text(`${label}:`, 20, y);
            doc.setFont("helvetica", "normal");

            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                // Handle image
                try {
                    const imgData = value;
                    doc.addImage(imgData, 'JPEG', 20, y + 5, 80, 60, undefined, 'FAST'); // Optimized for speed
                    y += 70;
                } catch (error) {
                    doc.text("Image could not be loaded", 20, y + 5);
                    y += 10;
                    console.error('PDF Image Error:', error);
                }
            } else {
                // Split text to fit within page width
                const lines = doc.splitTextToSize(value, 170);
                doc.text(lines, 20, y + 5);
                y += lines.length * 5 + 5;
            }
            y += 5; // Extra spacing
        }

        // Add footer
        doc.setFillColor(229, 231, 235); // Light gray
        doc.rect(0, 277, 210, 20, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text("Generated by Formbondhu - www.formbondhu.com", 20, 287);
        doc.text("Page 1 of 1", 180, 287);

        // Save PDF to a blob and update card
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        reviewCard.setAttribute('data-pdf-url', pdfUrl);
    }

    // Chat history management
    function saveChatHistory(message, sender) {
        console.log('Saving chat history:', message);
        let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        if (!chats[currentChatId]) {
            chats[currentChatId] = { title: `Chat ${Object.keys(chats).length + 1}`, messages: [], timestamp: new Date().toISOString() };
        }
        chats[currentChatId].messages.push({ text: message, sender: sender, time: new Date().toISOString() });
        localStorage.setItem('chatHistory', JSON.stringify(chats));
    }

    function loadChatHistory() {
        console.log('Loading chat history');
        historyList.innerHTML = '';
        const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        Object.keys(chats).forEach(chatId => {
            const chat = chats[chatId];
            const item = document.createElement('div');
            item.classList.add('history-item');
            item.setAttribute('data-chat-id', chatId);
            item.innerHTML = `
                <div class="history-item-content">
                    <p>${chat.title}</p>
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
                renameModal.style.display = 'flex';
                renameInput.value = chat.title;
                currentChatId = chatId;
            });

            deleteItem.addEventListener('click', () => {
                deleteModal.style.display = 'flex';
                currentChatId = chatId;
            });
        });
    }

    function loadChat(chatId) {
        console.log('Loading chat:', chatId);
        currentChatId = chatId;
        const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        const chat = chats[chatId];
        if (chat) {
            messagesDiv.innerHTML = '';
            chat.messages.forEach(msg => {
                displayMessage(msg.text, msg.sender);
            });
            welcomeMessage.style.display = 'none';
            sidebar.classList.remove('open');
            chatContainer.classList.remove('sidebar-open');
        }
    }

    renameCancelBtn.addEventListener('click', () => {
        console.log('Rename cancelled');
        renameModal.style.display = 'none';
    });

    renameSaveBtn.addEventListener('click', () => {
        console.log('Saving renamed chat');
        const newTitle = renameInput.value.trim();
        if (newTitle) {
            let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
            if (chats[currentChatId]) {
                chats[currentChatId].title = newTitle;
                localStorage.setItem('chatHistory', JSON.stringify(chats));
                loadChatHistory();
            }
        }
        renameModal.style.display = 'none';
    });

    deleteCancelBtn.addEventListener('click', () => {
        console.log('Delete cancelled');
        deleteModal.style.display = 'none';
    });

    deleteConfirmBtn.addEventListener('click', () => {
        console.log('Deleting chat:', currentChatId);
        let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        if (chats[currentChatId]) {
            delete chats[currentChatId];
            localStorage.setItem('chatHistory', JSON.stringify(chats));
            loadChatHistory();
            if (Object.keys(chats).length === 0) {
                startNewChat();
            } else {
                messagesDiv.innerHTML = '';
                welcomeMessage.style.display = 'block';
            }
        }
        deleteModal.style.display = 'none';
    });

    // Load history on page load
    loadChatHistory();
});
