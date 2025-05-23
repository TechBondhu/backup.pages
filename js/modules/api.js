// js/modules/api.js
import { displayMessage } from './messaging.js';
import { displayReview } from './review.js';
import { sanitizeMessage } from './utilities.js';
import { getCurrentChatId } from './chatHistory.js';

export function initializeFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCoIdMx9Zd7kQt9MSZmowbphaQVRl8D16E",
        authDomain: "admissionformdb.firebaseapp.com",
        projectId: "admissionformdb",
        storageBucket: "admissionformdb.firebasestorage.app",
        messagingSenderId: "398052082157",
        appId: "1:398052082157:web:0bc02d66cbdf55dd2567e4",
    };
    firebase.initializeApp(firebaseConfig);
}

function showTypingIndicator(messagesDiv) {
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

export function callRasaAPI(message, metadata = {}) {
    const messagesDiv = document.getElementById('messages');
    const typingDiv = showTypingIndicator(messagesDiv);
    const payload = { sender: getCurrentChatId(), message: message };
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