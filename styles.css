/* Existing CSS remains unchanged until welcome-message and welcome-buttons */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: 'Tiro Bangla', 'Segoe UI', sans-serif;
    background: #E5E7EB;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    overflow: hidden;
}
.chat-container {
    width: 100vw;
    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: margin-left 0.3s ease, width 0.3s ease;
    position: relative;
    z-index: 1;
}
.chat-container:not(.sidebar-open) {
    margin-left: 0;
    width: 100vw;
}
.chat-container.sidebar-open {
    margin-left: 300px;
    width: calc(100vw - 300px);
}
.header {
    background: #1E3A8A;
    color: #fff;
    padding: 15px;
    font-size: 24px;
    font-weight: 700;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    transition: gap 0.3s ease;
}
.header-brand.active .brand-logo {
    transform: translateX(-10px);
}
.brand-logo {
    font-size: 24px;
    font-weight: 700;
    transition: transform 0.3s ease;
}
.dynamic-text {
    font-size: 16px;
    opacity: 0;
    background: #FFFFFF;
    color: #1E3A8A;
    border: none;
    border-radius: 12px;
    padding: 5px 10px;
    transition: opacity 0.3s ease, transform 0.3s ease;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.dynamic-text.active {
    opacity: 1;
    transform: translateY(0);
    animation: floatIn 0.5s ease-out;
}
@keyframes floatIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.header-icons {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 15px;
}
.header-right-icons {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 15px;
}
.history-icon, .new-chat-icon, .home-icon, .settings-icon, .account-icon {
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.2s ease;
}
.history-icon:hover, .new-chat-icon:hover, .home-icon:hover, .settings-icon:hover, .account-icon:hover {
    color: #3B82F6;
    transform: scale(1.1);
}
.sidebar {
    position: fixed;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100%;
    background: linear-gradient(135deg, #1E3A8A, #3B82F6);
    color: #fff;
    padding: 20px;
    transition: left 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}
.sidebar.open {
    left: 0;
    opacity: 1;
}
.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.sidebar-icon {
    font-size: 24px;
    cursor: pointer;
}
.close-sidebar {
    font-size: 24px;
    cursor: pointer;
    color: #fff;
    transition: color 0.3s ease, transform 0.2s ease;
}
.close-sidebar:hover {
    color: #3B82F6;
    transform: scale(1.1);
}
.search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transition: background 0.3s ease;
}
.search-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}
.search-input:focus {
    background: rgba(255, 255, 255, 0.2);
}
.history-list {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 10px 0 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
}
.history-list::-webkit-scrollbar {
    width: 8px;
}
.history-list::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
}
.history-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
}
.history-list::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
}
.history-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.history-item:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
}
.history-item-content {
    flex-grow: 1;
    overflow: hidden;
}
.history-item p {
    font-size: 16px;
    color: #fff;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.history-item .timestamp {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 5px;
}
.history-item .options {
    opacity: 0;
    position: absolute;
    right: 15px;
    transition: opacity 0.3s ease;
}
.history-item:hover .options {
    opacity: 1;
}
.options i {
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
    transition: color 0.3s ease, transform 0.2s ease;
}
.options i:hover {
    color: #3B82F6;
    transform: scale(1.2);
}
.dropdown {
    display: none;
    position: absolute;
    right: 10px;
    top: 40px;
    background: #1E3A8A;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 20;
}
.dropdown.active {
    display: block;
}
.dropdown-item {
    padding: 8px 15px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s ease;
}
.dropdown-item:hover {
    background: #3B82F6;
}
.chat-box {
    flex-grow: 1;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    height: 100%;
    background: #fff;
    position: relative;
    transition: opacity 0.3s ease;
}
.chat-box.fade-in {
    animation: fadeIn 0.5s ease-in-out;
}
.welcome-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1; /* Reduced from 2 to avoid overlap */
    width: 100%;
    padding: 20px;
    animation: slideUp 0.5s ease-in-out;
}
@keyframes slideUp {
    from { transform: translate(-50%, -30%); opacity: 0; }
    to { transform: translate(-50%, -50%); opacity: 1; }
}
.welcome-message.fade-out {
    animation: fadeOut 0.3s ease-in forwards;
}
@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
.welcome-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    position: relative;
    z-index: 2; /* Ensure buttons are clickable */
}
.welcome-buttons button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    background: #fff;
    color: #333;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    min-width: 150px; /* Ensure minimum clickable area */
    min-height: 50px; /* Ensure minimum clickable area */
    touch-action: manipulation; /* Improve touch responsiveness */
}
.welcome-buttons button:hover {
    background: #f0f0f0;
    transform: scale(1.05);
}
.welcome-buttons button:active {
    transform: scale(0.95); /* Visual feedback on tap */
}
.welcome-buttons button i {
    margin-right: 5px;
}
.welcome-buttons button:nth-child(1) {
    color: #FF6F61;
}
.welcome-buttons button:nth-child(2) {
    color: #6B7280;
}
.welcome-buttons button:nth-child(3) {
    color: #F59E0B;
}
.welcome-buttons button#moreOptionsBtn {
    color: #6B7280;
}
.messages {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 0 16px 60px 0;
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
}
.messages::-webkit-scrollbar {
    width: 8px;
}
.messages::-webkit-scrollbar-track {
    background: #f1f1f1;
}
.messages::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}
.messages::-webkit-scrollbar-thumb:hover {
    background: #555;
}
.typing-indicator {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px;
    background: #f3f4f6;
    border-radius: 15px;
    width: fit-content;
    margin: 10px;
    animation: fadeIn 0.3s ease-out;
}
.typing-dot {
    width: 8px;
    height: 8px;
    background: #1E3A8A;
    border-radius: 50%;
    animation: bounce 1.2s infinite;
}
.typing-dot:nth-child(2) {
    animation-delay: 0.2s;
}
.typing-dot:nth-child(3) {
    animation-delay: 0.4s;
}
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}
.loading {
    align-self: flex-start;
    margin: 5px 0 10px 10px;
    padding: 8px 12px;
    font-size: 14px;
    color: #1E3A8A;
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
}
.dot {
    width: 8px;
    height: 8px;
    background: #1E3A8A;
    border-radius: 50%;
    animation: glow 1.5s infinite ease-in-out;
}
.dot:nth-child(2) {
    animation-delay: 0.3s;
}
.dot:nth-child(3) {
    animation-delay: 0.6s;
}
@keyframes glow {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 8px rgba(30, 58, 138, 0.6); }
}
.user-message, .bot-message {
    padding: 15px 20px;
    border-radius: 12px;
    max-width: 60%;
    word-wrap: break-word;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    margin: 10px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
    transition: all 0.3s ease;
}
.user-message {
    background: #1e3a8a;
    color: #fff;
    text-align: right;
    margin-left: auto;
}
.bot-message {
    background: #fff;
    color: #111827;
    text-align: left;
    margin-right: auto;
    animation: fadeIn 0.3s ease-out;
    text-shadow: none;
    border: none;
}
@keyframes slideIn {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
.slide-out {
    animation: slideOut 0.3s ease-in;
}
@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(20px); opacity: 0; }
}
.review-card {
    background: #fff;
    border-radius: 0;
    padding: 20px;
    max-width: 60%;
    margin: 10px;
    box-shadow: none;
    animation: slideIn 0.3s ease-out;
}
.review-card h3 {
    font-size: 20px;
    color: #1E3A8A;
    margin-bottom: 15px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
}
.review-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.review-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
}
.review-item label {
    font-size: 16px;
    color: #333;
    font-weight: 700;
}
.review-item p {
    font-size: 16px;
    color: #555;
    margin: 0;
}
.review-item img {
    max-width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-top: 5px;
}
.replace-image-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    color: #3B82F6;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.2s ease;
}
.replace-image-icon:hover {
    color: #2563EB;
    transform: scale(1.2);
}
.replace-image-input {
    display: none;
}
.review-buttons {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    gap: 10px;
}
.confirm-btn, .download-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    font-size: 14px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
}
.confirm-btn {
    background: linear-gradient(135deg, #10B981, #047857);
    color: #fff;
}
.confirm-btn:hover {
    background: linear-gradient(135deg, #059669, #065F46);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
.confirm-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
}
.confirm-btn:hover::before {
    width: 200px;
    height: 200px;
}
.download-btn {
    background: linear-gradient(135deg, #F59E0B, #D97706);
    color: #fff;
}
.download-btn:hover {
    background: linear-gradient(135deg, #D97706, #B45309);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
.download-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
}
.download-btn:hover::before {
    width: 200px;
    height: 200px;
}
.image-preview {
    max-width: 200px;
    height: auto;
    border-radius: 10px;
    margin-top: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
.input-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background: transparent;
    position: relative;
    z-index: 2;
    width: 100%;
    margin-top: auto;
    gap: 10px;
}
.input-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    max-width: 800px;
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 25px;
    padding: 10px 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    gap: 10px;
    transition: height 0.3s ease;
}
#userInput {
    flex-grow: 1;
    padding: 10px 12px;
    font-size: 16px;
    border: none;
    border-radius: 20px;
    outline: none;
    background: transparent;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
    resize: none;
    overflow-y: auto;
    min-height: 60px;
    max-height: 120px;
    width: 100%;
    box-sizing: border-box;
    line-height: 1.6;
    transition: height 0.3s ease;
}
#userInput:focus {
    border: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    outline: none;
}
#sendBtn, #uploadBtn {
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease, transform 0.2s ease;
}
#sendBtn {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #1E3A8A;
    color: #fff;
    font-size: 16px;
}
#sendBtn:hover {
    background: #3B82F6;
    transform: scale(1.1);
}
#uploadBtn {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #1E3A8A;
    color: #fff;
    font-size: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    margin-left: 10px;
}
#uploadBtn i {
    font-size: 16px;
}
#uploadBtn:hover {
    background: #3B82F6;
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}
.button-container {
    display: flex;
    gap: 5px;
    justify-content: flex-end;
}
.preview-container {
    position: absolute;
    left: 15px;
    top: 10px;
    transform: none;
    display: none;
    align-items: center;
    gap: 5px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    animation: fadeInPreview 0.3s ease-out;
}
@keyframes fadeInPreview {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.preview-container.fade-in {
    animation: fadeInPreview 0.3s ease-out;
}
.preview-image {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.image-review-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.image-review-content {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.review-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 10px;
}
.delete-image-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #EF4444;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
}
.delete-image-btn:hover {
    background: #DC2626;
    transform: scale(1.1);
}
.delete-image-btn i {
    font-size: 16px;
}
.edit-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.edit-modal-content {
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}
.edit-modal-content h3 {
    font-size: 20px;
    color: #1E3A8A;
    margin-bottom: 15px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
}
#editCanvas {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 15px;
}
.edit-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.edit-controls label {
    font-size: 14px;
    color: #333;
    font-weight: 700;
}
.edit-controls input[type="range"],
.edit-controls input[type="color"] {
    width: 100%;
    margin-top: 5px;
}
.edit-controls input[type="number"] {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 5px;
}
.edit-modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
}
#cancelEdit, #editApplyBtn {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    font-size: 14px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
}
#cancelEdit {
    background: #EF4444;
    color: #fff;
}
#cancelEdit:hover {
    background: #DC2626;
    transform: translateY(-2px);
}
#editApplyBtn {
    background: #10B981;
    color: #fff;
}
#editApplyBtn:hover {
    background: #059669;
    transform: translateY(-2px);
}
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.modal-content {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 90%;
}
.modal-content p {
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
}
.modal-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
}
.modal-buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    font-size: 14px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
}
.cancel {
    background: #EF4444;
    color: #fff;
}
.cancel:hover {
    background: #DC2626;
    transform: translateY(-2px);
}
.confirm {
    background: #10B981;
    color: #fff;
}
.confirm:hover {
    background: #059669;
    transform: translateY(-2px);
}
.rename-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.rename-modal-content {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 90%;
}
.rename-modal-content h3 {
    font-size: 20px;
    color: #1E3A8A;
    margin-bottom: 15px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
}
#renameInput {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
}
.rename-modal-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
}
.rename-modal-buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    font-size: 14px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
}
.genres-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.genres-modal-content {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}
.genres-modal-content h3 {
    font-size: 20px;
    color: #1E3A8A;
    margin-bottom: 15px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
}
.genres-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.genre-item {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
}
.genre-item:hover {
    background: #f0f0f0;
    transform: translateX(5px);
}
.genre-item i {
    font-size: 18px;
    color: #3B82F6;
}
.genre-item span {
    font-size: 16px;
    color: #333;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
}
.genres-modal-buttons {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
.genres-modal-buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    font-size: 14px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
.ripple-btn {
    position: relative;
    overflow: hidden;
}
.ripple-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
}
.ripple-btn:hover::before {
    width: 200px;
    height: 200px;
}
.edit-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    font-size: 14px;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #3B82F6, #1E3A8A);
    color: #fff;
}
.edit-btn:hover {
    background: linear-gradient(135deg, #2563EB, #1E40AF);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
.edit-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
}
.edit-btn:hover::before {
    width: 200px;
    height: 200px;
}
.edit-input {
    padding: 5px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    font-family: 'Tiro Bangla', serif;
    font-weight: 700;
}
@media (max-width: 768px) {
    .chat-container.sidebar-open {
        margin-left: 0;
        width: 100vw;
    }
    .chat-container:not(.sidebar-open) {
        margin-left: 0;
        width: 100vw;
    }
    .sidebar {
        width: 100%;
        left: -100%;
    }
    .sidebar.open {
        left: 0;
    }
    .chat-box {
        padding: 15px;
    }
    .welcome-buttons button {
        padding: 8px 16px;
        font-size: 12px;
        min-width: 120px; /* Adjusted for smaller screens */
        min-height: 40px; /* Adjusted for smaller screens */
    }
    .welcome-buttons button i {
        margin-right: 3px;
    }
    .user-message, .bot-message {
        max-width: 80%;
        font-size: 16px;
    }
    .review-card {
        max-width: 80%;
    }
    .input-wrapper {
        width: 90%;
    }
}
@media (max-width: 480px) {
    .header {
        padding: 10px;
    }
    .header-icons, .header-right-icons {
        gap: 10px;
    }
    .history-icon, .new-chat-icon, .home-icon, .settings-icon, .account-icon {
        font-size: 20px;
    }
    .brand-logo {
        font-size: 20px;
    }
    .dynamic-text {
        font-size: 14px;
        max-width: 120px;
    }
    .chat-box {
        padding: 10px;
    }
    .welcome-buttons {
        gap: 8px;
    }
    .welcome-buttons button {
        padding: 6px 12px;
        font-size: 10px;
        min-width: 100px; /* Further adjusted for very small screens */
        min-height: 36px; /* Further adjusted for very small screens */
    }
    .user-message, .bot-message {
        max-width: 90%;
        font-size: 14px;
    }
    .review-card {
        max-width: 90%;
    }
    .review-card h3 {
        font-size: 18px;
    }
    .review-item label, .review-item p {
        font-size: 14px;
    }
    .input-wrapper {
        width: 95%;
        padding: 8px;
    }
    #userInput {
        font-size: 14px;
        min-height: 50px;
    }
    #sendBtn, #uploadBtn {
        width: 30px;
        height: 30px;
        font-size: 14px;
    }
}
