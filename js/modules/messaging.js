import { sanitizeMessage } from './utilities.js';
import { saveChatHistory } from './chatHistory.js';
import { callRasaAPI } from './api.js';
import { clearPreview, getSelectedFile } from './imageHandling.js';
import { elements } from './dom.js';
import { openImageModal } from './imageHandling.js';

export function showTypingIndicator() {
    if (!elements.messagesDiv) return null;
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    `;
    elements.messagesDiv.appendChild(typingDiv);
    elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;
    return typingDiv;
}

export function displayProgressiveMessage(message, sender) {
    if (!elements.messagesDiv || !elements.welcomeMessage) return;
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
    elements.messagesDiv.appendChild(messageDiv);
    elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;

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

    if (elements.welcomeMessage.style.display !== 'none') {
        elements.welcomeMessage.classList.add('fade-out');
        setTimeout(() => {
            elements.welcomeMessage.style.display = 'none';
            elements.welcomeMessage.classList.remove('fade-out');
        }, 300);
    }
}

export function displayMessage(message, sender) {
    if (sender === 'bot') {
        displayProgressiveMessage(sanitizeMessage(message), sender);
    } else {
        if (!elements.messagesDiv || !elements.welcomeMessage) return;
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('user-message', 'slide-in');
        messageDiv.innerHTML = sanitizeMessage(message);
        elements.messagesDiv.appendChild(messageDiv);
        elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;
        if (elements.welcomeMessage.style.display !== 'none') {
            elements.welcomeMessage.classList.add('fade-out');
            setTimeout(() => {
                elements.welcomeMessage.style.display = 'none';
                elements.welcomeMessage.classList.remove('fade-out');
            }, 300);
        }
        saveChatHistory(message, sender);
    }
}

export function sendMessage() {
    const message = elements.userInput?.value.trim() || '';
    const selectedFile = getSelectedFile();
    if (message || selectedFile) {
        if (message) {
            const sanitizedMessage = sanitizeMessage(message);
            displayMessage(sanitizedMessage, 'user');
            saveChatHistory(sanitizedMessage, 'user');
            callRasaAPI(sanitizedMessage);
            elements.userInput.value = '';
        }
        if (selectedFile) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('user-message', 'slide-in');
            const img = document.createElement('img');
            img.src = elements.previewImage?.src || '';
            img.classList.add('image-preview');
            img.addEventListener('click', () => openImageModal(img.src));
            messageDiv.appendChild(img);
            if (elements.messagesDiv) {
                elements.messagesDiv.appendChild(messageDiv);
                elements.messagesDiv.scrollTop = elements.messagesDiv.scrollHeight;
            }
            if (elements.welcomeMessage && elements.welcomeMessage.style.display !== 'none') {
                elements.welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    elements.welcomeMessage.style.display = 'none';
                    elements.welcomeMessage.classList.remove('fade-out');
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