const genres = [
    { name: 'এনআইডি আবেদন', icon: 'fas fa-id-card' },
    { name: 'পাসপোর্ট আবেদন', icon: 'fas fa-passport' },
    { name: 'কোম্পানি রেজিস্ট্রেশন', icon: 'fas fa-building' },
    { name: 'পেনশন আবেদন ফর্ম', icon: 'fas fa-money-check-alt' },
    { name: 'টিআইএন (TIN) সার্টিফিকেট আবেদন', icon: 'fas fa-file-invoice' },
    { name: 'ভূমি নামজারি (Mutation) আবেদনপত্র', icon: 'fas fa-map-marked-alt' },
    { name: 'উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন', icon: 'fas fa-graduation-cap' },
    { name: 'জন্ম ও মৃত্যু নিবন্ধন', icon: 'fas fa-certificate' },
    { name: 'ড্রাইভিং লাইসেন্স আবেদন', icon: 'fas fa-car' },
    { name: 'নাগরিক সনদ (Citizen Certificate) আবেদন', icon: 'fas fa-user-check' },
    { name: 'চারিত্রিক সনদপত্র (Character Certificate) আবেদন', icon: 'fas fa-award' },
    { name: 'ট্রেড লাইসেন্স', icon: 'fas fa-store' },
    { name: 'ভ্যাট রেজিস্ট্রেশন', icon: 'fas fa-calculator' },
    { name: 'প্রপার্টি রেজিস্ট্রেশন', icon: 'fas fa-home' },
    { name: 'ব্যাংক অ্যাকাউন্ট খোলা', icon: 'fas fa-university' },
    { name: 'ঢাকা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'খুলনা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'রাজশাহী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'জগন্নাথ বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'কুমিল্লা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'বরিশাল বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'পটুয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    { name: 'ইসলামী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' },
    // নতুন ২০টি ইউনিক ক্যাটাগরি যেগুলোর জন্য ভোগান্তি হয়
    { name: 'গ্যাস সংযোগ আবেদন', icon: 'fas fa-fire' },
    { name: 'বিদ্যুৎ সংযোগ আবেদন', icon: 'fas fa-bolt' },
    { name: 'পানি সংযোগ আবেদন', icon: 'fas fa-faucet' },
    { name: 'জমির খতিয়ান সংশোধন', icon: 'fas fa-file-alt' },
    { name: 'ভূমি উন্নয়ন কর পরিশোধ', icon: 'fas fa-money-bill' },
    { name: 'ইমিগ্রেশন ক্লিয়ারেন্স', icon: 'fas fa-plane-departure' },
    { name: 'ওয়ারিশ সনদ আবেদন', icon: 'fas fa-users' },
    { name: 'পৌরসভা সেবা আবেদন', icon: 'fas fa-city' },
    { name: 'বন্ধকী জমি রেজিস্ট্রেশন', icon: 'fas fa-handshake' },
    { name: 'বিবাহ নিবন্ধন আবেদন', icon: 'fas fa-ring' },
    { name: 'তালাক নিবন্ধন আবেদন', icon: 'fas fa-heart-broken' },
    { name: 'জাতীয় পেনশন স্কিমে যোগদান', icon: 'fas fa-piggy-bank' },
    { name: 'পরিবেশ ছাড়পত্র আবেদন', icon: 'fas fa-leaf' },
    { name: 'ফায়ার সেফটি সার্টিফিকেট', icon: 'fas fa-fire-extinguisher' },
    { name: 'বিল্ডিং প্ল্যান অনুমোদন', icon: 'fas fa-drafting-compass' },
    { name: 'সরকারি চাকরির আবেদন', icon: 'fas fa-briefcase' },
    { name: 'প্রবাসী কল্যাণ সেবা আবেদন', icon: 'fas fa-globe' },
    { name: 'হজ ভিসা আবেদন', icon: 'fas fa-kaaba' },
    { name: 'পেশাদার লাইসেন্স (ডাক্তার/ইঞ্জিনিয়ার)', icon: 'fas fa-stethoscope' },
    { name: 'সরকারি অনুদান আবেদন', icon: 'fas fa-hand-holding-usd' }
];

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
            sendMessage(genre.name);
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
        const genre = button.getAttribute('data-genre');
        sendMessage(genre);
    });
});
