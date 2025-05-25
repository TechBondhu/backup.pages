import { genres, renderGenresList, openGenresModal, closeGenresModalFunc } from './genres.js';
import { saveChatHistory, loadChatHistory, loadChat, startNewChat, toggleSidebar, hideSidebar } from './chat_history.js';
import { displayReview, toggleEditMode, generatePDF } from './review.js';

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
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/&/g, '&amp;');
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
        const message = userInput?.value.trim();
        if (message) {
            displayMessage(message, 'user');
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
            if (e.target === imageReviewModal) {
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
        historyIcon.addEventListener('click', () => toggleSidebar(sidebar, chatContainer, () => loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, displayMessage, sanitizeMessage)));
    }
    if (newChatIcon) {
        newChatIcon.addEventListener('click', () => startNewChat(messagesDiv, welcomeMessage, chatBox, saveChatHistory, () => loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, displayMessage, sanitizeMessage)));
    }
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => hideSidebar(sidebar, chatContainer));
    }
    if (sidebarIcon) {
        sidebarIcon.addEventListener('click', () => toggleSidebar(sidebar, chatContainer, () => loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, displayMessage, sanitizeMessage)));
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
                    loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, displayMessage, sanitizeMessage);
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
                loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, displayMessage, sanitizeMessage);
                if (Object.keys(chats).length === 0) {
                    startNewChat(messagesDiv, welcomeMessage, chatBox, saveChatHistory, () => loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, displayMessage, sanitizeMessage));
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

    // Genres Modal
    if (moreOptionsBtn) {
        moreOptionsBtn.addEventListener('click', () => {
            openGenresModal(genresModal, renderGenresList, genresList, welcomeMessage, displayMessage, saveChatHistory, callRasaAPI, sanitizeMessage);
        });
    }

    if (closeGenresModal) {
        closeGenresModal.addEventListener('click', () => closeGenresModalFunc(genresModal));
    }

    // Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
            historyList.innerHTML = '';
            Object.keys(chats).forEach(chatId => {
                const chat = chats[chatId];
                if (chat.title.toLowerCase().includes(searchTerm)) {
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

                    item.addEventListener('click', () => loadChat(chatId, messagesDiv, welcomeMessage, sidebar, chatContainer, displayMessage, sanitizeMessage));
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
                }
            });
        });
    }

    // Call Rasa API
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
                    success: function(data) {
                        typingDiv.remove();
                        if (!data || data.length === 0) {
                            displayMessage('কোনো প্রতিক্রিয়া পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।', 'bot');
                            return;
                        }
                        data.forEach(response => {
                            if (response.text && !response.text.toLowerCase().includes('hi')) {
                                displayMessage(sanitizeMessage(response.text), 'bot');
                            }
                            if (response.custom && response.custom.reviewData) {
                                displayReview(response.custom.reviewData, messagesDiv, welcomeMessage, db, currentChatId, generatePDF, displayMessage, sanitizeMessage);
                            }
                            if (response.buttons) {
                                const buttonDiv = document.createElement('div');
                                buttonDiv.classList.add('welcome-buttons');
                                response.buttons.forEach(btn => {
                                    const button = document.createElement('button');
                                    button.classList.add('welcome-btn', 'ripple-btn');
                                    button.innerText = sanitizeMessage(btn.title);
                                    button.addEventListener('click', () => {
                                        displayMessage(sanitizeMessage(btn.title), 'user');
                                        callRasaAPI(sanitizeMessage(btn.payload));
                                    });
                                    buttonDiv.appendChild(button);
                                });
                                if (messagesDiv) {
                                    messagesDiv.appendChild(buttonDiv);
                                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                                }
                            }
                        });
                    },
                    error: function(xhr, status, error) {
                        typingDiv.remove();
                        console.error('Rasa API Error:', error);
                        displayMessage('সার্ভারের সাথে সংযোগে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।', 'bot');
                    }
                });
            } else {
                typingDiv.remove();
                console.error('jQuery is not loaded');
                displayMessage('সিস্টেমে ত্রুটি: jQuery লোড হয়নি।', 'bot');
            }
        }, 500);
    }

    // Initial Chat History Load
    loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, displayMessage, sanitizeMessage);

    // Load Current Chat if Exists
    if (currentChatId) {
        const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        if (chats[currentChatId]) {
            loadChat(currentChatId, messagesDiv, welcomeMessage, sidebar, chatContainer, displayMessage, sanitizeMessage);
        }
    }
});
