import { setupEventListeners } from './modules/dom.js';
import { setupImageHandlers } from './modules/imageHandling.js';
import { loadChatHistory } from './modules/chatHistory.js';
import { initializeFirebase } from './modules/api.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeFirebase();
    setupEventListeners();
    setupImageHandlers();
    loadChatHistory();
});