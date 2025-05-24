import { genres, firebaseConfig } from './constants.js';
import { displayMessage, displayLoading, removeLoading } from './domUtils.js';
import { saveChatHistory, loadChatHistory, startNewChat, toggleSidebar, hideSidebar, loadChat } from './chatManager.js';
import { setupImageUpload, setupImagePreview, setupImageEditing, setupImageReviewModal, selectedFile, clearPreview } from './imageHandler.js';
import { callRasaAPI, uploadImage } from './apiService.js';
import { renderGenresList, openGenresModal, closeGenresModalFunc } from './genresModal.js';
import { displayReview } from './reviewData.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const sidebar = document.getElementById('sidebar');
    const historyList = document.getElementById('historyList');
    const chatContainer = document.querySelector('.chat-container');
    const historyIcon = document.getElementById('historyIcon');
    const newChatIcon = document.getElementById('newChatIcon');
    const closeSidebar = document.getElementById('closeSidebar');
    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    const genresModal = document.getElementById('genresModal');
    const closeGenresModal = document.getElementById('closeGenresModal');
    const genresList = document.getElementById('genresList');
    const homeIcon = document.querySelector('.home-icon');
    const settingsIcon = document.getElementById('settingsIcon');
    const accountIcon = document.getElementById('accountIcon');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const editBtn = document.getElementById('editBtn');
    const imageReviewModal = document.getElementById('imageReviewModal');
    const reviewImage = document.getElementById('reviewImage');
    const deleteImageBtn = document.getElementById('deleteImageBtn');
    const editModal = document.getElementById('editModal');
    const editCanvas = document.getElementById('editCanvas');
    const cropX = document.getElementById('cropX');
    const cropY = document.getElementById('cropY');
    const cropWidth = document.getElementById('cropWidth');
    const cropHeight = document.getElementById('cropHeight');
    const brightness = document.getElementById('brightness');
    const contrast = document.getElementById('contrast');
    const backgroundColor = document.getElementById('bgColor');
    const editCancelBtn = document.getElementById('cancelEdit');
    const editApplyBtn = document.getElementById('editApplyBtn');
    const renameModal = document.getElementById('renameModal');
    const renameInput = document.getElementById('renameInput');
    const renameCancelBtn = document.getElementById('cancelRename');
    const renameSaveBtn = document.getElementById('saveRename');
    const deleteModal = document.getElementById('deleteModal');
    const deleteCancelBtn = document.getElementById('cancelDelete');
    const deleteConfirmBtn = document.getElementById('confirmDelete');
    const chatBox = document.querySelector('.chat-box');

    // State
    let currentChatId = sessionStorage.getItem('chatId') || Date.now().toString();
    sessionStorage.setItem('chatId', currentChatId);

    // Firebase Initialization
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
    } else {
        console.error('Firebase library not loaded.');
        displayMessage('Firebase লোড হয়নি। দয়া করে Firebase লাইব্রেরি যোগ করুন।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
        return;
    }
    const db = firebase.firestore();

    // Navigation Events
    if (homeIcon) {
        homeIcon.addEventListener('click', () => window.location.href = 'index.html');
    }
    if (settingsIcon) {
        settingsIcon.addEventListener('click', () => window.location.href = 'settings.html');
    }
    if (accountIcon) {
        accountIcon.addEventListener('click', () => window.location.href = 'account.html');
    }

    // Message Sending
    function sendMessage() {
        const message = userInput.value.trim();
        if (message || selectedFile) {
            if (message) {
                displayMessage(message, 'user', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
                callRasaAPI(message, {}, currentChatId, messagesDiv, welcomeMessage, saveChatHistory, displayReview);
                userInput.value = '';
            }
            if (selectedFile) {
                uploadImage(selectedFile, messagesDiv, welcomeMessage, currentChatId, saveChatHistory, callRasaAPI, clearPreview, previewImage);
            }
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.repeat) sendMessage();
        });
    }

    // Sidebar and Chat History
    if (historyIcon) {
        historyIcon.addEventListener('click', () => toggleSidebar(sidebar, chatContainer));
    }
    if (newChatIcon) {
        newChatIcon.addEventListener('click', () => startNewChat(messagesDiv, welcomeMessage, chatBox));
    }
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => hideSidebar(sidebar, chatContainer));
    }

    // Genres Modal
    if (moreOptionsBtn) {
        moreOptionsBtn.addEventListener('click', () => openGenresModal(genresModal));
    }
    if (closeGenresModal) {
        closeGenresModal.addEventListener('click', () => closeGenresModalFunc(genresModal));
    }
    if (genresList) {
        renderGenresList(genresList, genres, messagesDiv, welcomeMessage, currentChatId, callRasaAPI);
    }

    // Image Handling
    setupImageUpload(uploadBtn, fileInput, previewImage, previewContainer, userInput, messagesDiv, welcomeMessage, currentChatId, saveChatHistory);
    setupImagePreview(previewImage, reviewImage, imageReviewModal);
    setupImageEditing(editBtn, previewImage, editCanvas, editModal, cropX, cropY, cropWidth, cropHeight, brightness, contrast, backgroundColor, editApplyBtn, editCancelBtn, callRasaAPI, currentChatId);
    setupImageReviewModal(imageReviewModal, deleteImageBtn, clearPreview, previewImage, previewContainer, userInput);

    // Rename Modal
    if (renameCancelBtn) {
        renameCancelBtn.addEventListener('click', () => {
            renameModal.style.display = 'none';
        });
    }
    if (renameSaveBtn) {
        renameSaveBtn.addEventListener('click', () => {
            const newTitle = renameInput.value.trim();
            if (newTitle) {
                const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
                const chatId = sessionStorage.getItem('currentChatId');
                if (chats[chatId]) {
                    chats[chatId].title = newTitle;
                    localStorage.setItem('chatHistory', JSON.stringify(chats));
                    loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, (chatId) => loadChat(chatId, messagesDiv, welcomeMessage, displayMessage));
                }
                renameModal.style.display = 'none';
            } else {
                displayMessage('চ্যাটের নাম খালি রাখা যাবে না।', 'bot', messagesDiv, welcomeMessage, saveChatHistory, currentChatId);
            }
        });
    }

    // Delete Modal
    if (deleteCancelBtn) {
        deleteCancelBtn.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });
    }
    if (deleteConfirmBtn) {
        deleteConfirmBtn.addEventListener('click', () => {
            const chatId = sessionStorage.getItem('currentChatId');
            const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
            delete chats[chatId];
            localStorage.setItem('chatHistory', JSON.stringify(chats));
            deleteModal.style.display = 'none';
            if (chatId === currentChatId) {
                startNewChat(messagesDiv, welcomeMessage, chatBox);
            } else {
                loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, (chatId) => loadChat(chatId, messagesDiv, welcomeMessage, displayMessage));
            }
        });
    }

    // Initial Chat Load
    loadChatHistory(historyList, sidebar, chatContainer, messagesDiv, welcomeMessage, (chatId) => loadChat(chatId, messagesDiv, welcomeMessage, displayMessage));
});