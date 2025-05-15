const genres = [
    { name: 'এনআইডি আবেদন', icon: 'fas fa-id-card', intent: 'apply_nid', message: 'আমি এনআইডি আবেদন করতে চাই' },
    { name: 'পাসপোর্ট আবেদন', icon: 'fas fa-passport', intent: 'apply_passport', message: 'আমি পাসপোর্ট আবেদন করতে চাই' },
    { name: 'কোম্পানি রেজিস্ট্রেশন', icon: 'fas fa-building', intent: 'register_company', message: 'আমি কোম্পানি রেজিস্ট্রেশন করতে চাই' },
    { name: 'পেনশন আবেদন ফর্ম', icon: 'fas fa-money-check-alt', intent: 'apply_pension', message: 'আমি পেনশন আবেদন করতে চাই' },
    { name: 'টিআইএন (TIN) সার্টিফিকেট আবেদন', icon: 'fas fa-file-invoice', intent: 'apply_tin', message: 'আমি টিআইএন সার্টিফিকেট আবেদন করতে চাই' },
    { name: 'ভূমি নামজারি (Mutation) আবেদনপত্র', icon: 'fas fa-map-marked-alt', intent: 'apply_land_mutation', message: 'আমি ভূমি নামজারি আবেদন করতে চাই' },
    { name: 'উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন', icon: 'fas fa-graduation-cap', intent: 'apply_scholarship', message: 'আমি উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন করতে চাই' },
    { name: 'জন্ম ও মৃত্যু নিবন্ধন', icon: 'fas fa-certificate', intent: 'register_birth_death', message: 'আমি জন্ম ও মৃত্যু নিবন্ধন করতে চাই' },
    { name: 'ড্রাইভিং লাইসেন্স আবেদন', icon: 'fas fa-car', intent: 'apply_driving_license', message: 'আমি ড্রাইভিং লাইসেন্স আবেদন করতে চাই' },
    { name: 'নাগরিক সনদ (Citizen Certificate) আবেদন', icon: 'fas fa-user-check', intent: 'apply_citizen_certificate', message: 'আমি নাগরিক সনদ আবেদন করতে চাই' },
    { name: 'ভোটার আইডি আবেদন', icon: 'fas fa-vote-yea', intent: 'apply_voter_id', message: 'আমি ভোটার আইডি আবেদন করতে চাই' },
    { name: 'ব্যাংক অ্যাকাউন্ট খোলার আবেদন', icon: 'fas fa-university', intent: 'open_bank_account', message: 'আমি ব্যাংক অ্যাকাউন্ট খুলতে চাই' },
    { name: 'গ্যাস সংযোগ আবেদন', icon: 'fas fa-burn', intent: 'apply_gas_connection', message: 'আমি গ্যাস সংযোগ আবেদন করতে চাই' },
    { name: 'বিদ্যুৎ সংযোগ আবেদন', icon: 'fas fa-bolt', intent: 'apply_electricity_connection', message: 'আমি বিদ্যুৎ সংযোগ আবেদন করতে চাই' },
    { name: 'পানি সংযোগ আবেদন', icon: 'fas fa-tint', intent: 'apply_water_connection', message: 'আমি পানি সংযোগ আবেদন করতে চাই' },
    { name: 'ট্রেড লাইসেন্স আবেদন', icon: 'fas fa-file-alt', intent: 'apply_trade_license', message: 'আমি ট্রেড লাইসেন্স আবেদন করতে চাই' },
    { name: 'বিয়ের নিবন্ধন', icon: 'fas fa-ring', intent: 'register_marriage', message: 'আমি বিয়ের নিবন্ধন করতে চাই' },
    { name: 'সরকারি চাকরির আবেদন', icon: 'fas fa-briefcase', intent: 'apply_government_job', message: 'আমি সরকারি চাকরির জন্য আবেদন করতে চাই' },
    { name: 'ই-কমার্স ব্যবসা শুরু', icon: 'fas fa-shopping-cart', intent: 'start_ecommerce_business', message: 'আমি ই-কমার্স ব্যবসা শুরু করতে চাই' },
    { name: 'অর্গানিক ফার্মিং চাকরি', icon: 'fas fa-leaf', intent: 'apply_organic_farming_job', message: 'আমি অর্গানিক ফার্মিং চাকরির জন্য আবেদন করতে চাই' }
];

// Rasa API কল করার ফাংশন
async function callRasaAPI(message, metadata = {}) {
    try {
        const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: 'user',
                message: message,
                metadata: metadata
            })
        });
        const data = await response.json();
        if (data && data.length > 0) {
            data.forEach(item => {
                if (item.text) {
                    displayMessage(item.text, 'bot'); // বটের প্রতিক্রিয়া UI-তে দেখানো
                }
            });
        }
    } catch (error) {
        console.error('Rasa API call failed:', error);
        displayMessage('দুঃখিত, সার্ভারের সাথে সংযোগ করতে সমস্যা হচ্ছে।', 'bot');
    }
}

// UI-তে মেসেজ দেখানোর ফাংশন (ধরে নিচ্ছি এটি অন্য ফাইলে সংজ্ঞায়িত, কিন্তু এখানে ইন্টিগ্রেট করছি)
function displayMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// UI-এ মোড ব্যানার আপডেট করার ফাংশন
function updateGenreHeader(genreName) {
    const modeBanner = document.getElementById('modeBanner');
    if (modeBanner) {
        modeBanner.textContent = `${genreName} মোড অন`;
        modeBanner.style.display = 'block';
    }
}

// ইনটেন্ট ট্রিগার করার ফাংশন
function triggerIntent(genre) {
    const message = genre.message; // জনরার নির্দিষ্ট মেসেজ
    callRasaAPI(message, { genre: genre.name }); // Rasa-তে মেসেজ পাঠানো, UI-তে দেখানো হবে না
}

const moreOptionsBtn = document.getElementById('moreOptionsBtn');
const genresModal = document.getElementById('genresModal');
const closeGenresModal = document.getElementById('closeGenresModal');
const genresList = document.getElementById('genresList');

function renderGenresList() {
    genresList.innerHTML = '';
    genres.forEach(genre => {
        const genreItem = document.createElement('div');
        genreItem.className = 'genre-item';
        genreItem.innerHTML = `<i class="${genre.icon}"></i><span>${genre.name}</span>`;
        genreItem.addEventListener('click', () => {
            updateGenreHeader(genre.name); // মোড ব্যানার আপডেট
            triggerIntent(genre); // জনরার নির্দিষ্ট মেসেজ পাঠানো
            genresModal.style.display = 'none';
        });
        genresList.appendChild(genreItem);
    });
}

function openGenresModal() {
    renderGenresList();
    genresModal.style.display = 'flex';
}

function closeGenresModalFunc() {
    genresModal.style.display = 'none';
}

moreOptionsBtn.addEventListener('click', openGenresModal);
closeGenresModal.addEventListener('click', closeGenresModalFunc);

// Welcome Buttons
document.querySelectorAll('.welcome-buttons button[data-genre]').forEach(button => {
    button.addEventListener('click', () => {
        const genreName = button.getAttribute('data-genre');
        const genre = genres.find(g => g.name === genreName);
        if (genre) {
            updateGenreHeader(genre.name); // মোড ব্যানার আপডেট
            triggerIntent(genre); // জনরার নির্দিষ্ট মেসেজ পাঠানো
        }
    });
});
