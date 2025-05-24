export function sanitizeMessage(message) {
    if (typeof message !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = message;
    return div.innerHTML
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        .replace(/&/g, '&amp;');
}

export function showTypingIndicator(messagesDiv) {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    `;
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return typingDiv;
}

export function displayProgressiveMessage(message, sender, messagesDiv, welcomeMessage, saveChatHistory, currentChatId) {
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
            saveChatHistory(message, sender, currentChatId);
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

export function displayMessage(message, sender, messagesDiv, welcomeMessage, saveChatHistory, currentChatId) {
    if (sender === 'bot') {
        displayProgressiveMessage(message, sender, messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
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
        saveChatHistory(message, sender, currentChatId);
    }
}

export function displayLoading(messagesDiv) {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading', 'slide-in');
    loadingDiv.innerHTML = 'Loading <span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    messagesDiv.appendChild(loadingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return loadingDiv;
}

export function removeLoading(loadingDiv) {
    if (loadingDiv) {
        loadingDiv.classList.add('slide-out');
        setTimeout(() => loadingDiv.remove(), 300);
    }
}