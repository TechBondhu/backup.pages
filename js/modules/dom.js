import { sendMessage } from './messaging.js';
import { openGenresModal, closeGenresModal, genres } from './genres.js';
import { toggleSidebar, hideSidebar, startNewChat } from './sidebar.js';
import { setupImageHandlers, openImageModal } from './imageHandling.js';
import { renameChat, deleteChat } from './chatHistory.js';
import { setupNavigation } from './navigation.js';

export const elements = {
    sendBtn: document.getElementById('sendBtn'),
    userInput: document.getElementById('userInput'),
    messagesDiv: document.getElementById('messages'),
    uploadBtn: document.getElementById('uploadBtn'),
    fileInput: document.getElementById('fileInput'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    sidebar: document.getElementById('sidebar'),
    historyList: document.getElementById('historyList'),
    chatContainer: document.querySelector('.chat-container'),
    historyIcon: document.getElementById('historyIcon'),
    newChatIcon: document.getElementById('newChatIcon'),
    closeSidebar: document.getElementById('closeSidebar'),
    searchInput: document.getElementById('searchInput'),
    chatBox: document.getElementById('chatBox'),
    sidebarIcon: document.getElementById('sidebarIcon'),
    deleteModal: document.getElementById('deleteModal'),
    renameModal: document.getElementById('renameModal'),
    renameInput: document.getElementById('renameInput'),
    renameCancelBtn: document.getElementById('cancelRename'),
    renameSaveBtn: document.getElementById('saveRename'),
    deleteCancelBtn: document.getElementById('cancelDelete'),
    deleteConfirmBtn: document.getElementById('confirmDelete'),
    homeIcon: document.querySelector('.home-icon'),
    settingsIcon: document.getElementById('settingsIcon'),
    accountIcon: document.getElementById('accountIcon'),
    previewContainer: document.getElementById('previewContainer'),
    previewImage: document.getElementById('previewImage'),
    editBtn: document.getElementById('editBtn'),
    imageReviewModal: document.getElementById('imageReviewModal'),
    reviewImage: document.getElementById('reviewImage'),
    deleteImageBtn: document.getElementById('deleteImageBtn'),
    editModal: document.getElementById('editModal'),
    editCanvas: document.getElementById('editCanvas'),
    cropX: document.getElementById('cropX'),
    cropY: document.getElementById('cropY'),
    cropWidth: document.getElementById('cropWidth'),
    cropHeight: document.getElementById('cropHeight'),
    brightness: document.getElementById('brightness'),
    contrast: document.getElementById('contrast'),
    backgroundColor: document.getElementById('bgColor'),
    editCancelBtn: document.getElementById('cancelEdit'),
    editApplyBtn: document.getElementById('editApplyBtn'),
    moreOptionsBtn: document.getElementById('moreOptionsBtn'),
    genresModal: document.getElementById('genresModal'),
    closeGenresModal: document.getElementById('closeGenresModal'),
    genresList: document.getElementById('genresList'),
};

export function setupEventListeners() {
    if (elements.sendBtn) elements.sendBtn.addEventListener('click', sendMessage);
    if (elements.userInput) elements.userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.repeat) sendMessage();
    });
    if (elements.moreOptionsBtn) elements.moreOptionsBtn.addEventListener('click', openGenresModal);
    if (elements.closeGenresModal) elements.closeGenresModal.addEventListener('click', closeGenresModal);
    if (elements.historyIcon) elements.historyIcon.addEventListener('click', toggleSidebar);
    if (elements.newChatIcon) elements.newChatIcon.addEventListener('click', startNewChat);
    if (elements.closeSidebar) elements.closeSidebar.addEventListener('click', hideSidebar);
    if (elements.sidebarIcon) elements.sidebarIcon.addEventListener('click', toggleSidebar);
    if (elements.renameCancelBtn) elements.renameCancelBtn.addEventListener('click', () => elements.renameModal.style.display = 'none');
    if (elements.renameSaveBtn) elements.renameSaveBtn.addEventListener('click', renameChat);
    if (elements.deleteCancelBtn) elements.deleteCancelBtn.addEventListener('click', () => elements.deleteModal.style.display = 'none');
    if (elements.deleteConfirmBtn) elements.deleteConfirmBtn.addEventListener('click', deleteChat);
    if (elements.previewImage) elements.previewImage.addEventListener('click', () => openImageModal(elements.previewImage.src));
    setupImageHandlers();
    setupNavigation();
    setupWelcomeButtons();
}

function setupWelcomeButtons() {
    document.querySelectorAll('.welcome-buttons button[data-genre]').forEach(button => {
        button.classList.add('ripple-btn');
        button.addEventListener('click', () => {
            const genreName = button.getAttribute('data-genre');
            const genre = genres.find(g => g.name === genreName);
            if (genre && genre.message) {
                elements.welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    elements.welcomeMessage.style.display = 'none';
                    elements.welcomeMessage.classList.remove('fade-out');
                }, 300);
                displayMessage(sanitizeMessage(genre.message), 'user');
                saveChatHistory(sanitizeMessage(genre.message), 'user');
                callRasaAPI(sanitizeMessage(genre.message));
            } else {
                displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়।', 'bot');
            }
        });
    });
}