// js/modules/utilities.js
export function sanitizeMessage(message) {
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

export function displayLoading() {
    const messagesDiv = document.getElementById('messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading', 'slide-in');
    loadingDiv.innerHTML = 'Loading <span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    if (messagesDiv) {
        messagesDiv.appendChild(loadingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    return loadingDiv;
}

export function removeLoading(loadingDiv) {
    if (loadingDiv) {
        loadingDiv.classList.add('slide-out');
        setTimeout(() => loadingDiv.remove(), 300);
    }
}