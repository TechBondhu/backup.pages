import { displayMessage, displayLoading, removeLoading } from './domUtils.js';

export async function callRasaAPI(message, metadata, currentChatId, messagesDiv, welcomeMessage, saveChatHistory, displayReview) {
    displayLoading(messagesDiv);
    try {
        const response = await $.ajax({
            url: 'http://localhost:5005/webhooks/rest/webhook',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ sender: currentChatId, message: message, metadata: metadata })
        });
        removeLoading(messagesDiv);
        if (response && response.length > 0) {
            response.forEach(resp => {
                if (resp.text) {
                    displayMessage(resp.text, 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
                    saveChatHistory(resp.text, 'bot', currentChatId);
                }
                if (resp.metadata && resp.metadata.review_data) {
                    displayReview(resp.metadata.review_data, messagesDiv, welcomeMessage, currentChatId, saveChatHistory);
                }
            });
        } else {
            displayMessage('দুঃখিত, কোনো উত্তর পাওয়া যায়নি। আবার চেষ্টা করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
        }
    } catch (error) {
        removeLoading(messagesDiv);
        console.error('Rasa API call failed:', error);
        displayMessage('সার্ভারের সাথে সংযোগে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
    }
}

export async function uploadImage(file, messagesDiv, welcomeMessage, currentChatId, saveChatHistory, callRasaAPI, clearPreview, previewImage) {
    const formData = new FormData();
    formData.append('image', file);
    displayLoading(messagesDiv);
    try {
        const response = await $.ajax({
            url: 'http://localhost:5000/upload-image',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false
        });
        removeLoading(messagesDiv);
        if (response && response.imageUrl) {
            const imageUrl = response.imageUrl;
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.className = 'chat-image';
            imageElement.alt = 'Uploaded Image';
            imageElement.style.maxWidth = '200px';
            imageElement.style.cursor = 'pointer';
            imageElement.addEventListener('click', () => {
                const reviewImage = document.getElementById('reviewImage');
                const imageReviewModal = document.getElementById('imageReviewModal');
                if (reviewImage && imageReviewModal) {
                    reviewImage.src = imageUrl;
                    imageReviewModal.style.display = 'flex';
                    imageReviewModal.classList.add('slide-in');
                    setTimeout(() => imageReviewModal.classList.remove('slide-in'), 300);
                } else {
                    console.error('Image review modal or review image element not found');
                }
            });
            const messageDiv = document.createElement('div');
            messageDiv.className = 'user-message';
            messageDiv.appendChild(imageElement);
            messagesDiv.appendChild(messageDiv);
            welcomeMessage.style.display = 'none';
            saveChatHistory(`[Image: ${imageUrl}]`, 'user', currentChatId);
            clearPreview(previewImage);
            callRasaAPI('ইমেজ আপলোড করা হয়েছে', { imageUrl: imageUrl }, currentChatId, messagesDiv, welcomeMessage, saveChatHistory);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        } else {
            displayMessage('ইমেজ আপলোড ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
        }
    } catch (error) {
        removeLoading(messagesDiv);
        console.error('Image upload failed:', error);
        displayMessage('ইমেজ আপলোডের সময় ত্রুটি হয়েছে। দয়া করে আবার চেষ্টা করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
    }
}
