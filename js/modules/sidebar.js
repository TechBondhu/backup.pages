import { loadChatHistory, saveChatHistory } from './chatHistory.js';
import { elements } from './dom.js';

export function toggleSidebar() {
    if (elements.sidebar && elements.chatContainer) {
        elements.sidebar.classList.toggle('open');
        elements.chatContainer.classList.toggle('sidebar-open');
        loadChatHistory();
    }
}

export function hideSidebar() {
    if (elements.sidebar && elements.chatContainer) {
        elements.sidebar.classList.remove('open');
        elements.chatContainer.classList.remove('sidebar-open');
    }
}

export function startNewChat() {
    const currentChatId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('chatId', currentChatId);
    if (elements.messagesDiv) {
        elements.messagesDiv.innerHTML = '';
    }
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'block';
    }
    if (elements.chatBox) {
        elements.chatBox.classList.add('fade-in');
        setTimeout(() => elements.chatBox.classList.remove('fade-in'), 500);
    }
    saveChatHistory('New Chat Started', 'system');
    loadChatHistory();
}