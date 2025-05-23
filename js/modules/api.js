import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { sanitizeMessage } from './utilities.js';
import { displayMessage, showTypingIndicator } from './messaging.js';
import { displayReview } from './review.js';

let db = null;

export function initializeFirebase() {
    try {
        const firebaseConfig = {
            apiKey: "AIzaSyCoIdMx9Zd7kQt9MSZmowbphaQVRl8D16E",
            authDomain: "formbondhu-5c7b6.firebaseapp.com",
            projectId: "formbondhu-5c7b6",
            storageBucket: "formbondhu-5c7b6.appspot.com",
            messagingSenderId: "399864215487",
            appId: "1:399864215487:web:c2eb9e3601f69fadfaa5c5",
            measurementId: "G-GF7N7W4L4P"
        };
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        return db;
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        throw error;
    }
}

export function getDb() {
    if (!db) {
        initializeFirebase();
    }
    return db;
}

export function callRasaAPI(message, metadata = {}) {
    const typingDiv = showTypingIndicator();
    const currentChatId = sessionStorage.getItem('chatId') || Date.now().toString();
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
                    typingDiv?.remove();
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
                        if (response.buttons && response.buttons.length > 0) {
                            const buttonContainer = document.createElement('div');
                            buttonContainer.className = 'button-container slide-in';
                            response.buttons.forEach(button => {
                                const btn = document.createElement('button');
                                btn.className = 'response-btn ripple-btn';
                                btn.innerText = button.title;
                                btn.addEventListener('click', () => {
                                    displayMessage(sanitizeMessage(button.title), 'user');
                                    callRasaAPI(sanitizeMessage(button.payload));
                                });
                                buttonContainer.appendChild(btn);
                            });
                            const messagesDiv = document.getElementById('messages');
                            if (messagesDiv) {
                                messagesDiv.appendChild(buttonContainer);
                                messagesDiv.scrollTop = messagesDiv.scrollHeight;
                            }
                        }
                    });
                },
                error: (error) => {
                    typingDiv?.remove();
                    displayMessage('বটের সাথে সংযোগে সমস্যা হয়েছে। দয়া করে সার্ভার চেক করুন।', 'bot');
                    console.error('Rasa API Error:', error.status, error.statusText, error.responseText);
                }
            });
        } else {
            typingDiv?.remove();
            displayMessage('jQuery লোড হয়নি। দয়া করে jQuery লাইব্রেরি যোগ করুন।', 'bot');
        }
    }, 500);
}
