const genres = [
    { name: 'এনআইডি আবেদন', icon: 'fas fa-id-card', message: 'আমার জন্য একটি এনআইডি ত�ৈরি করতে চাই' },
    { name: 'পাসপোর্ট আবেদন', icon: 'fas fa-passport', message: 'আমি পাসপোর্ট আবেদন করতে চাই' },
    { name: 'কোম্পানি রেজিসট্রেশন', icon: 'fas fa-building', message: 'আমি কোম্পানি রেজিসট্রেশন করতে চাই' },
    { name: 'পেনশন আবেদন ফর্ম', icon: 'fas fa-money-check-alt', message: 'আমি পেনশন আবেদন করতে চাই' },
    { name: 'টিআইএন (TIN) সার্টিফিকেট আবেদন', icon: 'fas fa-file-invoice', message: 'আমি টিআইএন সার্টিফিকেট আবেদন করতে চাই' },
    { name: 'ভূমি নামজারি (Mutation) আবেদনপত্র', icon: 'fas fa-map-marked-alt', message: 'আমি ভূমি নামজারি আবেদন করতে চাই' },
    { name: 'উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন', icon: 'fas fa-graduation-cap', message: 'আমি উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন করতে চাই' },
    { name: 'জন্ম ও মৃত্যু নিবন্ধন', icon: 'fas fa-certificate', message: 'আমি জন্ম ও মৃত্যু নিবন্ধন করতে চাই' },
    { name: 'ড্রাইভিং লাইসেন্স আবেদন', icon: 'fas fa-car', message: 'আমি ড্রাইভিং লাইসেন্স আবেদন করতে চাই' },
    { name: 'নাগরিক সনদ (Citizen Certificate) আবেদন', icon: 'fas fa-user-check', message: 'আমি নাগরিক সনদ আবেদন করতে চাই' },
    { name: 'চারিত্রিক সনদপত্র (Character Certificate) আবেদন', icon: 'fas fa-award', message: 'আমি চারিত্রিক সনদপত্র আবেদন করতে চাই' },
    { name: 'ট্রেড লাইসেন্স', icon: 'fas fa-store', message: 'আমি ট্রেড লাইসেন্স আবেদন করতে চাই' },
    { name: 'ভ্যাট রেজিসট্রেশন', icon: 'fas fa-calculator', message: 'আমি ভ্যাট রেজিসট্রেশন করতে চাই' },
    { name: 'প্রপার্টি রেজিসট্রেশন', icon: 'fas fa-home', message: 'আমি প্রপার্টি রেজিসট্রেশন করতে চাই' },
    { name: 'ব্যাংক অ্যাকাউন্ট খোলা', icon: 'fas fa-university', message: 'আমি ব্যাংক অ্যাকাউন্ট খুলতে চাই' },
    { name: 'ঢাকা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি ঢাকা বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'খুলনা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি খুলনা বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'রাজশাহী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি রাজশাহী বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি চট্টগ্রাম বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি বাংলাদেশ কৃষি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'জগন্নাথ বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি জগন্নাথ বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'কুমিল্লা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি কুমিল্লা বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'বরিশাল বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি বরিশাল বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'বিসিএস (Civil Service) চাকরি', icon: 'fas fa-briefcase', message: 'আমি বিসিএস (Civil Service) চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ব্যাংক চাকরি (বেসরকারি)', icon: 'fas fa-university', message: 'আমি ব্যাংক চাকরি (বেসরকারি) আবেদন করতে চাই' },
    { name: 'এনজিও চাক

System: I apologize for the interruption. It seems the response was cut off again. Below is the complete `script.js` file, ensuring all JavaScript code from your original HTML `<script>` tag and the `genres.js` content is included without any modifications. I've double-checked to include the full code, continuing from where it was truncated, and ensured it matches your requirement to separate the code into `index.html`, `styles.css`, and `script.js` while keeping everything unchanged.

---

### script.js
This file contains the complete JavaScript code from the original HTML `<script>` tag and the `genres.js` file, combined without any changes. It handles the chatbot's functionality, including message sending, image uploads and editing, Firebase integration, chat history management, and modal interactions.

```javascript
const genres = [
    { name: 'এনআইডি আবেদন', icon: 'fas fa-id-card', message: 'আমার জন্য একটি এনআইডি তৈরি করতে চাই' },
    { name: 'পাসপোর্ট আবেদন', icon: 'fas fa-passport', message: 'আমি পাসপোর্ট আবেদন করতে চাই' },
    { name: 'কোম্পানি রেজিসট্রেশন', icon: 'fas fa-building', message: 'আমি কোম্পানি রেজিসট্রেশন করতে চাই' },
    { name: 'পেনশন আবেদন ফর্ম', icon: 'fas fa-money-check-alt', message: 'আমি পেনশন আবেদন করতে চাই' },
    { name: 'টিআইএন (TIN) সার্টিফিকেট আবেদন', icon: 'fas fa-file-invoice', message: 'আমি টিআইএন সার্টিফিকেট আবেদন করতে চাই' },
    { name: 'ভূমি নামজারি (Mutation) আবেদনপত্র', icon: 'fas fa-map-marked-alt', message: 'আমি ভূমি নামজারি আবেদন করতে চাই' },
    { name: 'উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন', icon: 'fas fa-graduation-cap', message: 'আমি উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন করতে চাই' },
    { name: 'জন্ম ও মৃত্যু নিবন্ধন', icon: 'fas fa-certificate', message: 'আমি জন্ম ও মৃত্যু নিবন্ধন করতে চাই' },
    { name: 'ড্রাইভিং লাইসেন্স আবেদন', icon: 'fas fa-car', message: 'আমি ড্রাইভিং লাইসেন্স আবেদন করতে চাই' },
    { name: 'নাগরিক সনদ (Citizen Certificate) আবেদন', icon: 'fas fa-user-check', message: 'আমি নাগরিক সনদ আবেদন করতে চাই' },
    { name: 'চারিত্রিক সনদপত্র (Character Certificate) আবেদন', icon: 'fas fa-award', message: 'আমি চারিত্রিক সনদপত্র আবেদন করতে চাই' },
    { name: 'ট্রেড লাইসেন্স', icon: 'fas fa-store', message: 'আমি ট্রেড লাইসেন্স আবেদন করতে চাই' },
    { name: 'ভ্যাট রেজিসট্রেশন', icon: 'fas fa-calculator', message: 'আমি ভ্যাট রেজিসট্রেশন করতে চাই' },
    { name: 'প্রপার্টি রেজিসট্রেশন', icon: 'fas fa-home', message: 'আমি প্রপার্টি রেজিসট্রেশন করতে চাই' },
    { name: 'ব্যাংক অ্যাকাউন্ট খোলা', icon: 'fas fa-university', message: 'আমি ব্যাংক অ্যাকাউন্ট খুলতে চাই' },
    { name: 'ঢাকা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি ঢাকা বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'খুলনা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি খুলনা বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'রাজশাহী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি রাজশাহী বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি চট্টগ্রাম বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি বাংলাদেশ কৃষি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'জগন্নাথ বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি জগন্নাথ বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'কুমিল্লা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি কুমিল্লা বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'বরিশাল বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি বরিশাল বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'বিসিএস (Civil Service) চাকরি', icon: 'fas fa-briefcase', message: 'আমি বিসিএস (Civil Service) চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ব্যাংক চাকরি (বেসরকারি)', icon: 'fas fa-university', message: 'আমি ব্যাংক চাকরি (বেসরকারি) আবেদন করতে চাই' },
    { name: 'এনজিও চাকরি', icon: 'fas fa-hands-helping', message: 'আমি এনজিও চাকরির জন্য আবেদন করতে চাই' },
    { name: 'আইটি চাকরি (সফটওয়্যার)', icon: 'fas fa-laptop-code', message: 'আমি আইটি চাকরি (সফটওয়্যার) আবেদন করতে চাই' },
    { name: 'টেলিকম চাকরি', icon: 'fas fa-phone', message: 'আমি টেলিকম চাকরির জন্য আবেদন করতে চাই' },
    { name: 'গ্যার্মেন্ট চাকরি', icon: 'fas fa-tshirt', message: 'আমি গ্যার্মেন্ট চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ফার্মাসি চাকরি', icon: 'fas fa-prescription-bottle', message: 'আমি ফার্মাসি চাকরির জন্য আবেদন করতে চাই' },
    { name: 'হোটেল চাকরি', icon: 'fas fa-hotel', message: 'আমি হোটেল চাকরির জন্য আবেদন করতে চাই' },
    { name: 'রেস্টুরেন্ট চাকরি', icon: 'fas fa-utensils', message: 'আমি রেস্টুরেন্ট চাকরির জন্য আবেদন করতে চাই' },
    { name: 'কনস্ট্রাকশন চাকরি', icon: 'fas fa-tools', message: 'আমি কনস্ট্রাকশন চাকরির জন্য আবেদন করতে চাই' },
    { name: 'অটোমোবাইল চাকরি', icon: 'fas fa-car-side', message: 'আমি অটোমোবাইল চাকরির জন্য আবেদন করতে চাই' },
    { name: 'মার্কেটিং চাকরি', icon: 'fas fa-bullhorn', message: 'আমি মার্কেটিং চাকরির জন্য আবেদন করতে চাই' },
    { name: 'একাউন্টস চাকরি', icon: 'fas fa-calculator', message: 'আমি একাউন্টস চাকরির জন্য আবেদন করতে চাই' },
    { name: 'এইচআর চাকরি', icon: 'fas fa-users', message: 'আমি এইচআর চাকরির জন্য আবেদন করতে চাই' },
    { name: 'গ্রাফিক ডিজাইন চাকরি', icon: 'fas fa-paint-brush', message: 'আমি গ্রাফিক ডিজাইন চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ফটোগ্রাফি চাকরি', icon: 'fas fa-camera', message: 'আমি ফটোগ্রাফি চাকরির জন্য আবেদন করতে চাই' },
    { name: 'জার্নালিজম চাকরি', icon: 'fas fa-newspaper', message: 'আমি জার্নালিজম চাকরির জন্য আবেদন করতে চাই' },
    { name: 'রিয়েল এস্টেট চাকরি', icon: 'fas fa-home', message: 'আমি রিয়েল এস্টেট চাকরির জন্য আবেদন করতে চাই' },
    { name: 'লজিস্টিক্স চাকরি', icon: 'fas fa-truck', message: 'আমি লজিস্টিক্স চাকরির জন্য আবেদন করতে চাই' },
    { name: 'রিটেইল চাকরি', icon: 'fas fa-shopping-cart', message: 'আমি রিটেইল চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ইন্টারনেট মার্কেটিং চাকরি', icon: 'fas fa-globe', message: 'আমি ইন্টারনেট মার্কেটিং চাকরির জন্য আবেদন করতে চাই' },
    { name: 'কনটেন্ট রাইটিং চাকরি', icon: 'fas fa-pen', message: 'আমি কনটেন্ট রাইটিং চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ডিজিটাল মার্কেটিং চাকরি', icon: 'fas fa-chart-line', message: 'আমি ডিজিটাল মার্কেটিং চাকরির জন্য আবেদন করতে চাই' },
    { name: 'সেলস চাকরি', icon: 'fas fa-hand-holding-usd', message: 'আমি সেলস চাকরির জন্য আবেদন করতে চাই' },
    { name: 'কাস্টমার সার্ভিস চাকরি', icon: 'fas fa-headset', message: 'আমি কাস্টমার সার্ভিস চাকরির জন্য আবেদন করতে চাই' },
    { name: 'প্রোডাকশন চাকরি', icon: 'fas fa-industry', message: 'আমি প্রোডাকশন চাকরির জন্য আবেদন করতে চাই' },
    { name: 'এডভোকেসি চাকরি', icon: 'fas fa-balance-scale', message: 'আমি এডভোকেসি চাকরির জন্য আবেদন করতে চাই' },
    { name: 'এডুকেশনাল কনসালটেন্ট চাকরি', icon: 'fas fa-chalkboard', message: 'আমি এডুকেশনাল কনসালটেন্ট চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ট্রেনিং চাকরি', icon: 'fas fa-user-graduate', message: 'আমি ট্রেনিং চাকরির জন্য আবেদন করতে চাই' },
    { name: 'রিসার্চ চাকরি', icon: 'fas fa-flask', message: 'আমি রিসার্চ চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ফ্রিল্যান্স চাকরি', icon: 'fas fa-user-tie', message: 'আমি ফ্রিল্যান্স চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ইনশিওরেন্স চাকরি', icon: 'fas fa-shield-alt', message: 'আমি ইনশিওরেন্স চাকরির জন্য আবেদন করতে চাই' },
    { name: 'এভিয়েশন চাকরি', icon: 'fas fa-plane-departure', message: 'আমি এভিয়েশন চাকরির জন্য আবেদন করতে চাই' },
    { name: 'এন্টারটেইনমেন্ট চাকরি', icon: 'fas fa-film', message: 'আমি এন্টারটেইনমেন্ট চাকরির জন্য আবেদন করতে চাই' },
    { name: 'অর্গানিক ফার্মিং চাকরি', icon: 'fas fa-leaf', message: 'আমি অর্গানিক ফার্মিং চাকরির জন্য আবেদন করতে চাই' }
];

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
    const searchInput = document.getElementById('searchInput');
    const chatBox = document.getElementById('chatBox');
    const sidebarIcon = document.getElementById('sidebarIcon');
    const deleteModal = document.getElementById('deleteModal');
    const renameModal = document.getElementById('renameModal');
    const renameInput = document.getElementById('renameInput');
    const renameCancelBtn = document.getElementById('cancelRename');
    const renameSaveBtn = document.getElementById('saveRename');
    const deleteCancelBtn = document.getElementById('cancelDelete');
    const deleteConfirmBtn = document.getElementById('confirmDelete');
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
    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    const genresModal = document.getElementById('genresModal');
    const closeGenresModal = document.getElementById('closeGenresModal');
    const genresList = document.getElementById('genresList');
    const welcomeButtons = document.querySelector('.welcome-buttons');

    // State Variables
    let selectedFile = null;
    let editedImage = null;
    const ctx = editCanvas.getContext('2d');
    let image = new Image();
    let cropRect = { x: 0, y: 0, width: 200, height: 200 };
    let brightnessValue = 0;
    let contrastValue = 0;
    let bgColor = 'white';
    let currentChatId = Date.now().toString();

    // Initialize jsPDF
    const { jsPDF } = window.jspdf;

    // Firebase Initialization
    const firebaseConfig = {
        apiKey: "AIzaSyCoIdMx9Zd7kQt9MSZmowbphaQVRl8D16E",
        authDomain: "admissionformdb.firebaseapp.com",
        projectId: "admissionformdb",
        storageBucket: "admissionformdb.firebasestorage.app",
        messagingSenderId: "398052082157",
        appId: "1:398052082157:web:0bc02d66cbdf55dd2567e4",
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Navigation Events
    homeIcon.addEventListener('click', () => window.location.href = 'index.html');
    settingsIcon.addEventListener('click', () => window.location.href = 'settings.html');
    accountIcon.addEventListener('click', () => window.location.href = 'account.html');

    // Message Sending
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.repeat) sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            displayMessage(message, 'user');
            userInput.value = '';
            saveChatHistory(message, 'user');
            callRasaAPI(message);
        }
        if (selectedFile) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('user-message');
            const img = document.createElement('img');
            img.src = previewImage.src;
            img.classList.add('image-preview');
            img.addEventListener('click', () => openImageModal(img.src));
            messageDiv.appendChild(img);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            if (welcomeMessage.style.display !== 'none') welcomeMessage.style.display = 'none';

            const formData = new FormData();
            formData.append('image', selectedFile);
            fetch('http://localhost:5000/upload-image', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.image_url) {
                        callRasaAPI(data.image_url);
                    } else if (data.error) {
                        displayMessage(`ত্রুটি: ${data.error}`, 'bot');
                    }
                })
                .catch(error => {
                    displayMessage('ইমেজ আপলোডে ত্রুটি হয়েছে। আবার চেষ্টা করুন।', 'bot');
                    console.error('Upload Error:', error);
                });
            saveChatHistory(`[Image: ${selectedFile.name}]`, 'user');
            clearPreview();
        }
    }

    // Image Upload and Preview
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'flex';
                userInput.style.paddingLeft = '110px';
            };
            reader.readAsDataURL(file);
        }
        fileInput.value = '';
    });

    // Image Review Modal
    previewImage.addEventListener('click', () => {
        reviewImage.src = previewImage.src;
        imageReviewModal.style.display = 'flex';
    });

    // Image Editing
    editBtn.addEventListener('click', () => {
        image.src = previewImage.src;
        image.onload = () => {
            editCanvas.width = image.width;
            editCanvas.height = image.height;
            cropRect.width = Math.min(200, image.width);
            cropRect.height = Math.min(200, image.height);
            drawImage();
            editModal.style.display = 'flex';
        };
    });

    // Canvas Editing Controls
    cropX.addEventListener('input', () => {
        cropRect.x = parseInt(cropX.value);
        drawImage();
    });

    cropY.addEventListener('input', () => {
        cropRect.y = parseInt(cropY.value);
        drawImage();
    });

    cropWidth.addEventListener('input', () => {
        cropRect.width = parseInt(cropWidth.value);
        drawImage();
    });

    cropHeight.addEventListener('input', () => {
        cropRect.height = parseInt(cropHeight.value);
        drawImage();
    });

    brightness.addEventListener('input', () => {
        brightnessValue = parseInt(brightness.value);
        drawImage();
    });

    contrast.addEventListener('input', () => {
        contrastValue = parseInt(contrast.value);
        drawImage();
    });

    backgroundColor.addEventListener('change', () => {
        bgColor = backgroundColor.value;
        drawImage();
    });

    function drawImage() {
        ctx.clearRect(0, 0, editCanvas.width, editCanvas.height);
        ctx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
        ctx.fillRect(0, 0, editCanvas.width, editCanvas.height);

        ctx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
        ctx.drawImage(image, 0, 0);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);
        ctx.filter = 'none';
    }

    // Apply Edited Image
    editApplyBtn.addEventListener('click', () => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = cropRect.width;
        tempCanvas.height = cropRect.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
        tempCtx.fillRect(0, 0, cropRect.width, cropRect.height);
        tempCtx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
        tempCtx.drawImage(image, cropRect.x, cropRect.y, cropRect.width, cropRect.height, 0, 0, cropRect.width, cropRect.height);

        editedImage = tempCanvas.toDataURL('image/jpeg');
        previewImage.src = editedImage;

        callRasaAPI("show_review");
        editModal.style.display = 'none';
    });

    editCancelBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    function openImageModal(imageSrc) {
        reviewImage.src = imageSrc;
        imageReviewModal.style.display = 'flex';
    }

    imageReviewModal.addEventListener('click', (e) => {
        if (e.target === imageReviewModal || e.target === deleteImageBtn) {
            imageReviewModal.style.display = 'none';
        }
    });

    deleteImageBtn.addEventListener('click', () => {
        clearPreview();
        imageReviewModal.style.display = 'none';
    });

    function clearPreview() {
        selectedFile = null;
        editedImage = null;
        previewImage.src = '';
        previewContainer.style.display = 'none';
        userInput.style.paddingLeft = '15px';
    }

    // Sidebar and Chat History
    historyIcon.addEventListener('click', toggleSidebar);
    newChatIcon.addEventListener('click', startNewChat);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarIcon.addEventListener('click', toggleSidebar);

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        chatContainer.classList.toggle('sidebar-open');
        if (sidebar.classList.contains('open')) {
            loadChatHistory();
        }
    }

    function startNewChat() {
        currentChatId = Date.now().toString();
        messagesDiv.innerHTML = '';
        welcomeMessage.style.display = 'block';
        userInput.value = '';
        clearPreview();
        toggleSidebar();
    }

    function loadChatHistory() {
        historyList.innerHTML = '';
        db.collection('chats').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const chat = doc.data();
                const historyItem = document.createElement('div');
                historyItem.classList.add('history-item');
                historyItem.innerHTML = `
                    <div class="history-item-content">
                        <p>${chat.title}</p>
                        <span class="timestamp">${new Date(chat.timestamp.toDate()).toLocaleString()}</span>
                    </div>
                    <div class="options">
                        <i class="fas fa-ellipsis-v" onclick="toggleDropdown(this)"></i>
                        <div class="dropdown">
                            <div class="dropdown-item" onclick="renameChat('${doc.id}')">নাম পরিবর্তন</div>
                            <div class="dropdown-item" onclick="deleteChat('${doc.id}')">মুছুন</div>
                            <div class="dropdown-item" onclick="loadChat('${doc.id}')">লোড করুন</div>
                        </div>
                    </div>
                `;
                historyList.appendChild(historyItem);
            });
        });
    }

    function toggleDropdown(icon) {
        const dropdown = icon.nextElementSibling;
        dropdown.classList.toggle('active');
    }

    function saveChatHistory(message, type) {
        const title = message.length > 30 ? message.substring(0, 30) + '...' : message;
        db.collection('chats').doc(currentChatId).set({
            title: title,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            messages: firebase.firestore.FieldValue.arrayUnion({
                text: message,
                type: type,
                timestamp: new Date()
            })
        }, { merge: true });
    }

    function loadChat(chatId) {
        currentChatId = chatId;
        messagesDiv.innerHTML = '';
        db.collection('chats').doc(chatId).get().then((doc) => {
            if (doc.exists) {
                const chat = doc.data();
                chat.messages.forEach((msg) => {
                    if (msg.type === 'user' && msg.text.startsWith('[Image:')) {
                        const messageDiv = document.createElement('div');
                        messageDiv.classList.add('user-message');
                        const img = document.createElement('img');
                        img.src = msg.text.match(/$$ Image: (.+) $$/)[1];
                        img.classList.add('image-preview');
                        img.addEventListener('click', () => openImageModal(img.src));
                        messageDiv.appendChild(img);
                        messagesDiv.appendChild(messageDiv);
                    } else {
                        displayMessage(msg.text, msg.type);
                    }
                });
                welcomeMessage.style.display = 'none';
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
                toggleSidebar();
            }
        });
    }

    function renameChat(chatId) {
        currentChatId = chatId;
        renameModal.style.display = 'flex';
    }

    renameSaveBtn.addEventListener('click', () => {
        const newTitle = renameInput.value.trim();
        if (newTitle) {
            db.collection('chats').doc(currentChatId).update({
                title: newTitle
            }).then(() => {
                loadChatHistory();
                renameModal.style.display = 'none';
                renameInput.value = '';
            });
        }
    });

    renameCancelBtn.addEventListener('click', () => {
        renameModal.style.display = 'none';
        renameInput.value = '';
    });

    function deleteChat(chatId) {
        currentChatId = chatId;
        deleteModal.style.display = 'flex';
    }

    deleteConfirmBtn.addEventListener('click', () => {
        db.collection('chats').doc(currentChatId).delete().then(() => {
            loadChatHistory();
            deleteModal.style.display = 'none';
            startNewChat();
        });
    });

    deleteCancelBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    // Search Chat History
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        historyList.innerHTML = '';
        db.collection('chats').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const chat = doc.data();
                if (chat.title.toLowerCase().includes(searchTerm)) {
                    const historyItem = document.createElement('div');
                    historyItem.classList.add('history-item');
                    historyItem.innerHTML = `
                        <div class="history-item-content">
                            <p>${chat.title}</p>
                            <span class="timestamp">${new Date(chat.timestamp.toDate()).toLocaleString()}</span>
                        </div>
                        <div class="options">
                            <i class="fas fa-ellipsis-v" onclick="toggleDropdown(this)"></i>
                            <div class="dropdown">
                                <div class="dropdown-item" onclick="renameChat('${doc.id}')">নাম পরিবর্তন</div>
                                <div class="dropdown-item" onclick="deleteChat('${doc.id}')">মুছুন</div>
                                <div class="dropdown-item" onclick="loadChat('${doc.id}')">লোড করুন</div>
                            </div>
                        </div>
                    `;
                    historyList.appendChild(historyItem);
                }
            });
        });
    });

    // Rasa API Integration
    function callRasaAPI(message) {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('loading');
        loadingDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
        messagesDiv.appendChild(loadingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: 'user', message: message })
        })
            .then(response => response.json())
            .then(data => {
                messagesDiv.removeChild(loadingDiv);
                data.forEach((response) => {
                    if (response.text) {
                        displayMessage(response.text, 'bot');
                        saveChatHistory(response.text, 'bot');
                    }
                    if (response.custom && response.custom.review_data) {
                        displayReviewCard(response.custom.review_data);
                        saveChatHistory(JSON.stringify(response.custom.review_data), 'bot');
                    }
                });
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            })
            .catch(error => {
                messagesDiv.removeChild(loadingDiv);
                displayMessage('দুঃখিত, সার্ভারের সাথে সংযোগে সমস্যা হয়েছে।', 'bot');
                saveChatHistory('দুঃখিত, সার্ভারের সাথে সংযোগে সমস্যা হয়েছে।', 'bot');
                console.error('Rasa Error:', error);
            });
    }

    // Display Messages
    function displayMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(type === 'user' ? 'user-message' : 'bot-message');
        messageDiv.innerText = message;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        if (welcomeMessage.style.display !== 'none') welcomeMessage.style.display = 'none';
    }

    // Display Review Card
    function displayReviewCard(reviewData) {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        reviewCard.innerHTML = `
            <h3>আবেদনের তথ্য পর্যালোচনা</h3>
            <div class="review-content">
                ${Object.entries(reviewData).map(([key, value]) => `
                    <div class="review-item">
                        <label>${key}:</label>
                        ${typeof value === 'string' && value.startsWith('data:image') ? `
                            <img src="${value}" alt="${key}">
                            <i class="fas fa-upload replace-image-icon"></i>
                            <input type="file" class="replace-image-input" accept="image/png, image/jpeg">
                        ` : `<p>${value}</p>`}
                    </div>
                `).join('')}
            </div>
            <div class="review-buttons">
                <button class="edit-btn">সংশোধন</button>
                <button class="confirm-btn">নিশ্চিত করুন</button>
                <button class="download-btn">ডাউনলোড</button>
            </div>
        `;
        messagesDiv.appendChild(reviewCard);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        // Review Card Button Events
        reviewCard.querySelector('.edit-btn').addEventListener('click', () => {
            callRasaAPI('edit_form');
        });

        reviewCard.querySelector('.confirm-btn').addEventListener('click', () => {
            callRasaAPI('confirm_form');
        });

        reviewCard.querySelector('.download-btn').addEventListener('click', () => {
            const doc = new jsPDF();
            let y = 20;
            doc.setFont('NotoSansBengali', 'normal');
            Object.entries(reviewData).forEach(([key, value]) => {
                if (typeof value === 'string' && value.startsWith('data:image')) {
                    doc.addImage(value, 'JPEG', 10, y, 50, 50);
                    y += 60;
                } else {
                    doc.text(`${key}: ${value}`, 10, y);
                    y += 10;
                }
            });
            doc.save('application_form.pdf');
        });

        // Replace Image in Review Card
        const replaceIcons = reviewCard.querySelectorAll('.replace-image-icon');
        replaceIcons.forEach((icon) => {
            icon.addEventListener('click', () => {
                const input = icon.nextElementSibling;
                input.click();
            });
        });

        const replaceInputs = reviewCard.querySelectorAll('.replace-image-input');
        replaceInputs.forEach((input) => {
            input.addEventListener('change', () => {
                const file = input.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = input.previousElementSibling.previousElementSibling;
                        img.src = e.target.result;
                        const formData = new FormData();
                        formData.append('image', file);
                        fetch('http://localhost:5000/upload-image', {
                            method: 'POST',
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.image_url) {
                                    callRasaAPI(data.image_url);
                                }
                            })
                            .catch(error => {
                                displayMessage('ইমেজ আপলোডে ত্রুটি হয়েছে।', 'bot');
                                console.error('Replace Image Error:', error);
                            });
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }

    // Welcome Buttons
    welcomeButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('welcome-btn')) {
            const genre = e.target.dataset.genre;
            const selectedGenre = genres.find(g => g.name === genre);
            if (selectedGenre) {
                displayMessage(selectedGenre.message, 'user');
                saveChatHistory(selectedGenre.message, 'user');
                callRasaAPI(selectedGenre.message);
                welcomeMessage.style.display = 'none';
            }
        }
    });

    // More Options Modal
    moreOptionsBtn.addEventListener('click', () => {
        genresList.innerHTML = '';
        genres.forEach(genre => {
            const genreItem = document.createElement('button');
            genreItem.classList.add('welcome-btn');
            genreItem.dataset.genre = genre.name;
            genreItem.innerHTML = `<i class="${genre.icon}"></i> ${genre.name}`;
            genresList.appendChild(genreItem);
        });
        genresModal.style.display = 'flex';
    });

    closeGenresModal.addEventListener('click', () => {
        genresModal.style.display = 'none';
    });

    genresList.addEventListener('click', (e) => {
        if (e.target.classList.contains('welcome-btn')) {
            const genre = e.target.dataset.genre;
            const selectedGenre = genres.find(g => g.name === genre);
            if (selectedGenre) {
                displayMessage(selectedGenre.message, 'user');
                saveChatHistory(selectedGenre.message, 'user');
                callRasaAPI(selectedGenre.message);
                welcomeMessage.style.display = 'none';
                genresModal.style.display = 'none';
            }
        }
    });
});
