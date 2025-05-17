const genres = [
    { name: 'এনআইডি আবেদন', icon: 'fas fa-id-card', message: 'আমার জন্য একটি এনআইডি তৈরি করতে চাই' },
    { name: 'পাসপোর্ট আবেদন', icon: 'fas fa-passport', message: 'আমি পাসপোর্ট আবেদন করতে চাই' },
    { name: 'কোম্পানি রেজিস্ট্রেশন', icon: 'fas fa-building', message: 'আমি কোম্পানি রেজিস্ট্রেশন করতে চাই' },
    { name: 'পেনশন আবেদন ফর্ম', icon: 'fas fa-money-check-alt', message: 'আমি পেনশন আবেদন করতে চাই' },
    { name: 'টিআইএন (TIN) সার্টিফিকেট আবেদন', icon: 'fas fa-file-invoice', message: 'আমি টিআইএন সার্টিফিকেট আবেদন করতে চাই' },
    { name: 'ভূমি নামজারি (Mutation) আবেদনপত্র', icon: 'fas fa-map-marked-alt', message: 'আমি ভূমি নামজারি আবেদন করতে চাই' },
    { name: 'উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন', icon: 'fas fa-graduation-cap', message: 'আমি উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন করতে চাই' },
    { name: 'জন্ম ও মৃত্যু নিবন্ধন', icon: 'fas fa-certificate', message: 'আমি জন্ম ও মৃত্যু নিবন্ধন করতে চাই' },
    { name: 'ড্রাইভিং লাইসেন্স আবেদন', icon: 'fas fa-car', message: 'আমি ড্রাইভিং লাইসেন্স আবেদন করতে চাই' },
    { name: 'নাগরিক সনদ (Citizen Certificate) আবেদন', icon: 'fas fa-user-check', message: 'আমি নাগরিক সনদ আবেদন করতে চাই' },
    { name: 'চারিত্রিক সনদপত্র (Character Certificate) আবেদন', icon: 'fas fa-award', message: 'আমি চারিত্রিক সনদপত্র আবেদন করতে চাই' },
    { name: 'ট্রেড লাইসেন্স', icon: 'fas fa-store', message: 'আমি ট্রেড লাইসেন্স আবেদন করতে চাই' },
    { name: 'ভ্যাট রেজিস্ট্রেশন', icon: 'fas fa-calculator', message: 'আমি ভ্যাট রেজিস্ট্রেশন করতে চাই' },
    { name: 'প্রপার্টি রেজিস্ট্রেশন', icon: 'fas fa-home', message: 'আমি প্রপার্টি রেজিস্ট্রেশন করতে চাই' },
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
    { name: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'পটুয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি পটুয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'ইসলামী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', message: 'আমি ইসলামী বিশ্ববিদ্যালয় ভর্তি আবেদন করতে চাই' },
    { name: 'গ্যাস সংযোগ আবেদন', icon: 'fas fa-fire', message: 'আমি গ্যাস সংযোগ আবেদন করতে চাই' },
    { name: 'বিদ্যুৎ সংযোগ আবেদন', icon: 'fas fa-bolt', message: 'আমি বিদ্যুৎ সংযোগ আবেদন করতে চাই' },
    { name: 'পানি সংযোগ আবেদন', icon: 'fas fa-faucet', message: 'আমি পানি সংযোগ আবেদন করতে চাই' },
    { name: 'জমির খতিয়ান সংশোধন', icon: 'fas fa-file-alt', message: 'আমি জমির খতিয়ান সংশোধন করতে চাই' },
    { name: 'ভূমি উন্নয়ন কর পরিশোধ', icon: 'fas fa-money-bill', message: 'আমি ভূমি উন্নয়ন কর পরিশোধ করতে চাই' },
    { name: 'ইমিগ্রেশন ক্লিয়ারেন্স', icon: 'fas fa-plane-departure', message: 'আমি ইমিগ্রেশন ক্লিয়ারেন্সের জন্য আবেদন করতে চাই' },
    { name: 'ওয়ারিশ সনদ আবেদন', icon: 'fas fa-users', message: 'আমি ওয়ারিশ সনদ আবেদন করতে চাই' },
    { name: 'পৌরসভা সেবা আবেদন', icon: 'fas fa-city', message: 'আমি পৌরসভা সেবা আবেদন করতে চাই' },
    { name: 'বন্ধকী জমি রেজিস্ট্রেশন', icon: 'fas fa-handshake', message: 'আমি বন্ধকী জমি রেজিস্ট্রেশন করতে চাই' },
    { name: 'বিবাহ নিবন্ধন আবেদন', icon: 'fas fa-ring', message: 'আমি বিবাহ নিবন্ধন করতে চাই' },
    { name: 'তালাক নিবন্ধন আবেদন', icon: 'fas fa-heart-broken', message: 'আমি তালাক নিবন্ধন করতে চাই' },
    { name: 'জাতীয় পেনশন স্কিমে যোগদান', icon: 'fas fa-piggy-bank', message: 'আমি জাতীয় পেনশন স্কিমে যোগ দিতে চাই' },
    { name: 'পরিবেশ ছাড়পত্র আবেদন', icon: 'fas fa-leaf', message: 'আমি পরিবেশ ছাড়পত্র আবেদন করতে চাই' },
    { name: 'ফায়ার সেফটি সার্টিফিকেট', icon: 'fas fa-fire-extinguisher', message: 'আমি ফায়ার সেফটি সার্টিফিকেট আবেদন করতে চাই' },
    { name: 'বিল্ডিং প্ল্যান অনুমোদন', icon: 'fas fa-drafting-compass', message: 'আমি বিল্ডিং প্ল্যান অনুমোদনের জন্য আবেদন করতে চাই' },
    { name: 'সরকারি চাকরি আবেদন', icon: 'fas fa-briefcase', message: 'আমি সরকারি চাকরির জন্য আবেদন করতে চাই' },
    { name: 'প্রবাসী কল্যাণ সেবা আবেদন', icon: 'fas fa-globe', message: 'আমি প্রবাসী কল্যাণ সেবা আবেদন করতে চাই' },
    { name: 'হজ ভিসা আবেদন', icon: 'fas fa-kaaba', message: 'আমি হজ ভিসা আবেদন করতে চাই' },
    { name: 'পেশাদার লাইসেন্স (ডাক্তার/ইঞ্জিনিয়ার)', icon: 'fas fa-stethoscope', message: 'আমি পেশাদার লাইসেন্স (ডাক্তার/ইঞ্জিনিয়ার) আবেদন করতে চাই' },
    { name: 'সরকারি অনুদান আবেদন', icon: 'fas fa-hand-holding-usd', message: 'আমি সরকারি অনুদান আবেদন করতে চাই' },
    { name: 'সেনাবাহিনী চাকরি', icon: 'fas fa-shield-alt', message: 'আমি সেনাবাহিনী চাকরির জন্য আবেদন করতে চাই' },
    { name: 'পুলিশ চাকরি', icon: 'fas fa-user-shield', message: 'আমি পুলিশ চাকরির জন্য আবেদন করতে চাই' },
    { name: 'আনসার-ভিডিপি চাকরি', icon: 'fas fa-users-cog', message: 'আমি আনসার-ভিডিপি চাকরির জন্য আবেদন করতে চাই' },
    { name: 'রেলওয়ে চাকরি', icon: 'fas fa-train', message: 'আমি রেলওয়ে চাকরির জন্য আবেদন করতে চাই' },
    { name: 'পোস্ট অফিস চাকরি', icon: 'fas fa-envelope', message: 'আমি পোস্ট অফিস চাকরির জন্য আবেদন করতে চাই' },
    { name: 'শিক্ষক নিয়োগ (সরকারি)', icon: 'fas fa-chalkboard-teacher', message: 'আমি শিক্ষক নিয়োগ (সরকারি) চাকরির জন্য আবেদন করতে চাই' },
    { name: 'স্বাস্থ্যকর্মী চাকরি', icon: 'fas fa-user-md', message: 'আমি স্বাস্থ্যকর্মী চাকরির জন্য আবেদন করতে চাই' },
    { name: 'বাংলা একাডেমি চাকরি', icon: 'fas fa-book', message: 'আমি বাংলা একাডেমি চাকরির জন্য আবেদন করতে চাই' },
    { name: 'বিআরটিসি চাকরি', icon: 'fas fa-bus', message: 'আমি বিআরটিসি চাকরির জন্য আবেদন করতে চাই' },
    { name: 'কাস্টমস চাকরি', icon: 'fas fa-boxes', message: 'আমি কাস্টমস চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ট্যাক্স চাকরি', icon: 'fas fa-file-invoice-dollar', message: 'আমি ট্যাক্স চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ফায়ার সার্ভিস চাকরি', icon: 'fas fa-fire', message: 'আমি ফায়ার সার্ভিস চাকরির জন্য আবেদন করতে চাই' },
    { name: 'জেলা প্রশাসন চাকরি', icon: 'fas fa-landmark', message: 'আমি জেলা প্রশাসন চাকরির জন্য আবেদন করতে চাই' },
    { name: 'বিমান বন্দর চাকরি', icon: 'fas fa-plane', message: 'আমি বিমান বন্দর চাকরির জন্য আবেদন করতে চাই' },
    { name: 'বিসিএস (BCS) চাকরি', icon: 'fas fa-graduation-cap', message: 'আমি বিসিএস চাকরির জন্য আবেদন করতে চাই' },
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
    { name: 'ইন্টারনেট মার্কেটিং চাকরি', icon: 'fas fa-globe', message: 'আমি ইন্টারনেট মার্কেটিং চাকরির জন্য আবেদন করতে চাই' }
];

// Firebase configuration
const firebaseConfig = {
    // Add your Firebase configuration here
    // apiKey: "your-api-key",
    // authDomain: "your-auth-domain",
    // projectId: "your-project-id",
    // storageBucket: "your-storage-bucket",
    // messagingSenderId: "your-messaging-sender-id",
    // appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const chatBox = document.getElementById('chatBox');
const messages = CGAL.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const editBtn = document.getElementById('editBtn');
const sidebar = document.getElementById('sidebar');
const historyIcon = document.getElementById('historyIcon');
const closeSidebar = document.getElementById('closeSidebar');
const historyList = document.getElementById('historyList');
const searchInput = document.getElementById('searchInput');
const newChatIcon = document.getElementById('newChatIcon');
const deleteModal = document.getElementById('deleteModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
const renameModal = document.getElementById('renameModal');
const renameInput = document.getElementById('renameInput');
const saveRename = document.getElementById('saveRename');
const cancelRename = document.getElementById('cancelRename');
const imageReviewModal = document.getElementById('imageReviewModal');
const reviewImage = document.getElementById('reviewImage');
const deleteImageBtn = document.getElementById('deleteImageBtn');
const editModal = document.getElementById('editModal');
const editCanvas = document.getElementById('editCanvas');
const editApplyBtn = document.getElementById('editApplyBtn');
const cancelEdit = document.getElementById('cancelEdit');
const genresModal = document.getElementById('genresModal');
const genresList = document.getElementById('genresList');
const closeGenresModal = document.getElementById('closeGenresModal');
const moreOptionsBtn = document.getElementById('moreOptionsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');

// Canvas context
const ctx = editCanvas.getContext('2d');

// Global variables
let currentChatId = null;
let uploadedImage = null;
let originalImage = null;
let currentHistoryItem = null;

// Initialize genres modal
function populateGenres() {
    genresList.innerHTML = '';
    genres.forEach(genre => {
        const genreItem = document.createElement('div');
        genreItem.classList.add('genre-item');
        genreItem.innerHTML = `<i class="${genre.icon}"></i><span>${genre.name}</span>`;
        genreItem.addEventListener('click', () => {
            sendMessage(genre.message);
            genresModal.style.display = 'none';
        });
        genresList.appendChild(genreItem);
    });
}

// Event listeners for welcome buttons
document.querySelectorAll('.welcome-btn').forEach(button => {
    button.addEventListener('click', () => {
        const genre = button.dataset.genre;
        const genreObj = genres.find(g => g.name === genre);
        if (genreObj) {
            sendMessage(genreObj.message);
        }
    });
});

// More options button
moreOptionsBtn.addEventListener('click', () => {
    populateGenres();
    genresModal.style.display = 'flex';
});

closeGenresModal.addEventListener('click', () => {
    genresModal.style.display = 'none';
});

// Firebase: Save chat history
async function saveChatHistory(message, isUser, image = null) {
    if (!currentChatId) {
        const chatRef = await db.collection('chats').add({
            title: message.slice(0, 30) + '...',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        currentChatId = chatRef.id;
    }

    await db.collection('chats').doc(currentChatId).collection('messages').add({
        message,
        isUser,
        image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    loadChatHistory();
}

// Firebase: Load chat history
async function loadChatHistory() {
    historyList.innerHTML = '';
    const snapshot = await db.collection('chats').orderBy('timestamp', 'desc').get();
    snapshot.forEach(doc => {
        const chat = { id: doc.id, ...doc.data() };
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <div class="history-item-content">
                <p>${chat.title}</p>
                <div class="timestamp">${new Date(chat.timestamp?.toDate()).toLocaleString()}</div>
            </div>
            <div class="options">
                <i class="fas fa-ellipsis-v" onclick="toggleDropdown('${chat.id}')"></i>
                <div class="dropdown" id="dropdown-${chat.id}">
                    <div class="dropdown-item" onclick="renameChat('${chat.id}')">Rename</div>
                    <div class="dropdown-item" onclick="deleteChat('${chat.id}')">Delete</div>
                </div>
            </div>
        `;
        historyItem.addEventListener('click', (e) => {
            if (!e.target.classList.contains('fas') && !e.target.classList.contains('dropdown-item')) {
                loadChatMessages(chat.id);
            }
        });
        historyList.appendChild(historyItem);
    });
}

// Load specific chat messages
async function loadChatMessages(chatId) {
    currentChatId = chatId;
    messages.innerHTML = '';
    welcomeMessage.style.display = 'none';
    const snapshot = await db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp').get();
    snapshot.forEach(doc => {
        const msg = doc.data();
        displayMessage(msg.message, msg.isUser, msg.image);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Toggle dropdown for history item options
function toggleDropdown(chatId) {
    const dropdown = document.getElementById(`dropdown-${chatId}`);
    dropdown.classList.toggle('active');
}

// Rename chat
function renameChat(chatId) {
    currentHistoryItem = chatId;
    renameModal.style.display = 'flex';
}

saveRename.addEventListener('click', async () => {
    const newTitle = renameInput.value.trim();
    if (newTitle) {
        await db.collection('chats').doc(currentHistoryItem).update({ title: newTitle });
        loadChatHistory();
        renameModal.style.display = 'none';
        renameInput.value = '';
    }
});

cancelRename.addEventListener('click', () => {
    renameModal.style.display = 'none';
    renameInput.value = '';
});

// Delete chat
function deleteChat(chatId) {
    currentHistoryItem = chatId;
    deleteModal.style.display = 'flex';
}

confirmDelete.addEventListener('click', async () => {
    await db.collection('chats').doc(currentHistoryItem).delete();
    if (currentChatId === currentHistoryItem) {
        messages.innerHTML = '';
        currentChatId = null;
        welcomeMessage.style.display = 'block';
    }
    loadChatHistory();
    deleteModal.style.display = 'none';
});

cancelDelete.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});

// Search chat history
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.toLowerCase();
    historyList.innerHTML = '';
    const snapshot = await db.collection('chats').orderBy('timestamp', 'desc').get();
    snapshot.forEach(doc => {
        const chat = { id: doc.id, ...doc.data() };
        if (chat.title.toLowerCase().includes(query)) {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            historyItem.innerHTML = `
                <div class="history-item-content">
                    <p>${chat.title}</p>
                    <div class="timestamp">${new Date(chat.timestamp?.toDate()).toLocaleString()}</div>
                </div>
                <div class="options">
                    <i class="fas fa-ellipsis-v" onclick="toggleDropdown('${chat.id}')"></i>
                    <div class="dropdown" id="dropdown-${chat.id}">
                        <div class="dropdown-item" onclick="renameChat('${chat.id}')">Rename</div>
                        <div class="dropdown-item" onclick="deleteChat('${chat.id}')">Delete</div>
                    </div>
                </div>
            `;
            historyItem.addEventListener('click', (e) => {
                if (!e.target.classList.contains('fas') && !e.target.classList.contains('dropdown-item')) {
                    loadChatMessages(chat.id);
                }
            });
            historyList.appendChild(historyItem);
        }
    });
});

// Send message
async function sendMessage(message) {
    if (!message && !uploadedImage) return;

    const msg = message || userInput.value.trim();
    if (msg || uploadedImage) {
        displayMessage(msg, true, uploadedImage);
        await saveChatHistory(msg, true, uploadedImage);
        welcomeMessage.style.display = 'none';
        userInput.value = '';
        previewContainer.style.display = 'none';
        uploadedImage = null;

        // Simulate bot response
        setTimeout(async () => {
            displayLoading();
            setTimeout(async () => {
                messages.removeChild(messages.querySelector('.loading'));
                const botResponse = await getBotResponse(msg);
                displayMessage(botResponse.message, false);
                if (botResponse.review) {
                    displayReviewCard(botResponse.review);
                }
                await saveChatHistory(botResponse.message, false);
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 1000);
        }, 500);
    }
}

sendBtn.addEventListener('click', () => sendMessage());
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Display message
function displayMessage(message, isUser, image = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    if (image) {
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('image-preview');
        messageDiv.appendChild(img);
    }
    messages.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Display loading animation
function displayLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading');
    loadingDiv.innerHTML = `অপেক্ষা করুন... <span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
    messages.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Simulate bot response
async function getBotResponse(message) {
    // Replace with actual API call to your backend
    return {
        message: `আপনার ${message} সম্পর্কিত অনুরোধ প্রক্রিয়াধীন।`,
        review: {
            title: 'আবেদনের বিবরণ',
            fields: [
                { label: 'নাম', value: 'জন ডো' },
                { label: 'আবেদনের ধরন', value: message },
                { label: 'ছবি', image: uploadedImage }
            ]
        }
    };
}

// Display review card
function displayReviewCard(review) {
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');
    reviewCard.innerHTML = `<h3>${review.title}</h3><div class="review-content"></div><div class="review-buttons">
        <button class="edit-btn">Edit</button>
        <button class="confirm-btn">Confirm</button>
        <button class="download-btn">Download</button>
    </div>`;
    const reviewContent = reviewCard.querySelector('.review-content');
    review.fields.forEach(field => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `<label>${field.label}</label><p>${field.value || ''}</p>`;
        if (field.image) {
            const img = document.createElement('img');
            img.src = field.image;
            img.classList.add('image-preview');
            const replaceIcon = document.createElement('i');
            replaceIcon.classList.add('fas', 'fa-camera', 'replace-image-icon');
            const replaceInput = document.createElement('input');
            replaceInput.type = 'file';
            replaceInput.accept = 'image/png, image/jpeg';
            replaceInput.classList.add('replace-image-input');
            replaceInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        img.src = reader.result;
                        field.image = reader.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
            replaceIcon.addEventListener('click', () => replaceInput.click());
            reviewItem.appendChild(img);
            reviewItem.appendChild(replaceIcon);
            reviewItem.appendChild(replaceInput);
        }
        reviewContent.appendChild(reviewItem);
    });

    reviewCard.querySelector('.edit-btn').addEventListener('click', () => {
        reviewContent.querySelectorAll('.review-item').forEach(item => {
            const p = item.querySelector('p');
            if (p) {
                const input = document.createElement('input');
                input.classList.add('edit-input');
                input.value = p.textContent;
                p.replaceWith(input);
            }
        });
        reviewCard.querySelector('.edit-btn').textContent = 'Save';
        reviewCard.querySelector('.edit-btn').classList.add('apply');
        reviewCard.querySelector('.edit-btn').addEventListener('click', () => {
            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const input = item.querySelector('.edit-input');
                if (input) {
                    const p = document.createElement('p');
                    p.textContent = input.value;
                    input.replaceWith(p);
                }
            });
            reviewCard.querySelector('.edit-btn').textContent = 'Edit';
            reviewCard.querySelector('.edit-btn').classList.remove('apply');
        }, { once: true });
    });

    reviewCard.querySelector('.confirm-btn').addEventListener('click', () => {
        alert('আবেদন নিশ্চিত করা হয়েছে!');
    });

    reviewCard.querySelector('.download-btn').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 10;
        doc.text(review.title, 10, y);
        y += 10;
        review.fields.forEach(field => {
            doc.text(`${field.label}: ${field.value || ''}`, 10, y);
            y += 10;
            if (field.image) {
                doc.addImage(field.image, 'JPEG', 10, y, 50, 50);
                y += 60;
            }
        });
        doc.save('application.pdf');
    });

    messages.appendChild(reviewCard);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Image upload
uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            uploadedImage = reader.result;
            previewImage.src = uploadedImage;
            previewContainer.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
});

// Image preview click
previewImage.addEventListener('click', () => {
    reviewImage.src = uploadedImage;
    imageReviewModal.style.display = 'flex';
});

// Delete image
deleteImageBtn.addEventListener('click', () => {
    uploadedImage = null;
    previewContainer.style.display = 'none';
    imageReviewModal.style.display = 'none';
    fileInput.value = '';
});

// Image review modal close
imageReviewModal.addEventListener('click', (e) => {
    if (e.target === imageReviewModal) {
        imageReviewModal.style.display = 'none';
    }
});

// Image editing
editBtn.addEventListener('click', () => {
    originalImage = new Image();
    originalImage.src = uploadedImage;
    originalImage.onload = () => {
        editCanvas.width = originalImage.width;
        editCanvas.height = originalImage.height;
        ctx.drawImage(originalImage, 0, 0);
        editModal.style.display = 'flex';
    };
});

editApplyBtn.addEventListener('click', () => {
    const cropX = parseInt(document.getElementById('cropX').value);
    const cropY = parseInt(document.getElementById('cropY').value);
    const cropWidth = parseInt(document.getElementById('cropWidth').value);
    const cropHeight = parseInt(document.getElementById('cropHeight').value);
    const brightness = parseInt(document.getElementById('brightness').value) / 100;
    const contrast = parseInt(document.getElementById('contrast').value) / 100;
    const bgColor = document.getElementById('bgColor').value;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cropWidth;
    tempCanvas.height = cropHeight;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(originalImage, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    const imageData = tempCtx.getImageData(0, 0, cropWidth, cropHeight);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * brightness * contrast;
        data[i + 1] = data[i + 1] * brightness * contrast;
        data[i + 2] = data[i + 2] * brightness * contrast;
    }

    tempCtx.putImageData(imageData, 0, 0);
    uploadedImage = tempCanvas.toDataURL('image/jpeg');
    previewImage.src = uploadedImage;
    editModal.style.display = 'none';
});

cancelEdit.addEventListener('click', () => {
    editModal.style.display = 'none';
});

// Sidebar toggle
historyIcon.addEventListener('click', () => {
    sidebar.classList.add('open');
    document.querySelector('.chat-container').classList.add('sidebar-open');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
    document.querySelector('.chat-container').classList.remove('sidebar-open');
});

// New chat
newChatIcon.addEventListener('click', () => {
    currentChatId = null;
    messages.innerHTML = '';
    welcomeMessage.style.display = 'block';
    userInput.value = '';
    previewContainer.style.display = 'none';
    uploadedImage = null;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();
    populateGenres();
});
