import { displayMessage, showTypingIndicator, removeLoading } from './domUtils.js';

export function callRasaAPI(message, metadata = {}, currentChatId, messagesDiv, welcomeMessage, saveChatHistory, displayReview) {
    const typingDiv = showTypingIndicator(messagesDiv);
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
                        displayMessage('কোনো প্রতিক্রিয়া পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
                        return;
                    }
                    data.forEach(response => {
                        if (response.text && !response.text.toLowerCase().includes('hi')) {
                            displayMessage(response.text, 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
                        }
                        if (response.custom && response.custom.review_data) {
                            if (typeof displayReview === 'function') {
                                displayReview(response.custom.review_data, messagesDiv, welcomeMessage, currentChatId);
                            } else {
                                console.error('displayReview is not a function');
                                displayMessage('রিভিউ ডেটা প্রদর্শন করা যায়নি। দয়া করে আবার চেষ্টা করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
                            }
                        }
                        if (response.buttons) {
                            const buttonDiv = document.createElement('div');
                            buttonDiv.classList.add('welcome-buttons');
                            response.buttons.forEach(btn => {
                                const button = document.createElement('button');
                                button.innerText = response.text;
                                button.classList.add('ripple-btn');
                                button.addEventListener('click', () => sendMessage(btn.payload, messagesDiv, welcomeMessage, currentChatId, callRasaAPI));
                                buttonDiv.appendChild(button);
                            });
                            messagesDiv.appendChild(buttonDiv);
                        }
                    });
                },
                error: (error) => {
                    typingDiv.remove();
                    displayMessage('বটের সাথে সংযোগে সমস্যা হয়েছে। দয়া করে সার্ভার চেক করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
                    console.error('Rasa API Error:', error.status, error.statusText, error.responseText);
                }
            });
        } else {
            typingDiv.remove();
            displayMessage('jQuery লোড হয়নি। দয়া করে jQuery লাইব্রেরি যোগ করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
        }
    }, 500);
}

export function uploadImage(selectedFile, messagesDiv, welcomeMessage, currentChatId, saveChatHistory, callRasaAPI, clearPreview, previewImage) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('user-message', 'slide-in');
    const img = document.createElement('img');
    img.src = previewImage.src;
    img.classList.add('image-preview');
    img.addEventListener('click', () => {
        const reviewImage = document.getElementById('reviewImage');
        const imageReviewModal = document.getElementById('imageReviewModal');
        if (reviewImage && imageReviewModal) {
            reviewImage.src = img.src;
            imageReviewModal.style.display = 'flex';
            imageReviewModal.classList.add('slide-in');
            setTimeout(() => imageReviewModal.classList.remove('slide-in'), 300);
        } else {
            console.error('Image review modal or review image element not found');
        }
    });
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
                callRasaAPI(data.image_url, {}, currentChatId, messagesDiv, welcomeMessage, saveChatHistory);
                saveChatHistory(`[Image: ${selectedFile.name}]`, 'user', currentChatId);
            } else if (data.error) {
                displayMessage(`ইমেজ আপলোডে ত্রুটি: ${data.error}`, 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
            }
        })
        .catch(error => {
            displayMessage('ইমেজ আপলোডে ত্রুটি হয়েছে।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
            console.error('Image Upload Error:', error);
        });
    clearPreview(previewImage, document.getElementById('previewContainer'), document.getElementById('userInput'));
}
