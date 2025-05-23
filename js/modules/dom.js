// js/modules/dom.js
import { callRasaAPI } from './api.js';
import { toggleSidebar, startNewChat, hideSidebar } from './sidebar.js';
import { displayMessage, sendMessage } from './messaging.js';
import { renameChat, deleteChat } from './chatHistory.js';

export const elements = {
    messagesDiv: document.getElementById('messages'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    uploadBtn: document.getElementById('uploadBtn'),
    historyIcon: document.getElementById('historyIcon'),
    newChatIcon: document.getElementById('newChatIcon'),
    sidebar: document.getElementById('sidebar'),
    chatContainer: document.querySelector('.chat-container'),
    chatBox: document.getElementById('chatBox'),
    homeIcon: document.querySelector('.home-icon'),
    settingsIcon: document.querySelector('.settings-icon'),
    accountIcon: document.querySelector('.account-icon'),
    closeSidebar: document.getElementById('closeSidebar'),
    sidebarIcon: document.getElementById('sidebarIcon'),
    deleteModal: document.getElementById('deleteModal'),
    renameModal: document.getElementById('renameModal'),
    renameInput: document.getElementById('renameInput'),
    renameCancelBtn: document.getElementById('cancelRename'),
    renameSaveBtn: document.getElementById('saveRename'),
    deleteCancelBtn: document.getElementById('cancelDelete'),
    deleteConfirmBtn: document.getElementById('confirmDelete'),
};

export function setupEventListeners() {
    // সেন্ড বাটন
    if (elements.sendBtn) {
        elements.sendBtn.addEventListener('click', sendMessage);
    }

    // এন্টার কী দিয়ে মেসেজ পাঠানো
    if (elements.userInput) {
        elements.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.repeat) {
                sendMessage();
            }
        });
    }

    // সাইডবার টগল
    if (elements.historyIcon) {
        elements.historyIcon.addEventListener('click', toggleSidebar);
    }

    // নতুন চ্যাট
    if (elements.newChatIcon) {
        elements.newChatIcon.addEventListener('click', startNewChat);
    }

    // সাইডবার বন্ধ
    if (elements.closeSidebar) {
        elements.closeSidebar.addEventListener('click', hideSidebar);
    }

    // সাইডবার আইকন
    if (elements.sidebarIcon) {
        elements.sidebarIcon.addEventListener('click', toggleSidebar);
    }

    // রিনেম মডাল বাতিল
    if (elements.renameCancelBtn) {
        elements.renameCancelBtn.addEventListener('click', () => {
            if (elements.renameModal) {
                elements.renameModal.style.display = 'none';
            }
        });
    }

    // রিনেম সেভ
    if (elements.renameSaveBtn) {
        elements.renameSaveBtn.addEventListener('click', () => {
            const newTitle = elements.renameInput?.value.trim() || '';
            if (newTitle) {
                renameChat(newTitle);
            }
            if (elements.renameModal) {
                elements.renameModal.style.display = 'none';
            }
        });
    }

    // ডিলিট মডাল বাতিল
    if (elements.deleteCancelBtn) {
        elements.deleteCancelBtn.addEventListener('click', () => {
            if (elements.deleteModal) {
                elements.deleteModal.style.display = 'none';
            }
        });
    }

    // ডিলিট কনফার্ম
    if (elements.deleteConfirmBtn) {
        elements.deleteConfirmBtn.addEventListener('click', () => {
            deleteChat();
            if (elements.deleteModal) {
                elements.deleteModal.style.display = 'none';
            }
        });
    }
}