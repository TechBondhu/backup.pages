import { callRasaAPI } from './api.js';

export function initializeChat() {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');
    const welcomeMessage = document.getElementById('welcomeMessage');

    if (!sendBtn || !userInput || !messagesDiv || !welcomeMessage) {
        console.error('Chat elements not found!');
        return;
    }

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        if (welcomeMessage.style.display !== 'none') {
            welcomeMessage.style.display = 'none';
        }
    }

    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            displayMessage(message, 'user');
            userInput.value = '';
            callRasaAPI(message)
                .then(data => {
                    data.forEach(response => {
                        if (response.text) {
                            displayMessage(response.text, 'bot');
                        }
                    });
                })
                .catch(error => {
                    displayMessage('বটের সাথে সংযোগে ত্রুটি। আবার চেষ্টা করুন।', 'bot');
                    console.error('Rasa API Error:', error);
                });
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.repeat) {
            sendBtn.click();
        }
    });

    return { displayMessage };
}
