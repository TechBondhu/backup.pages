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
    { name: 'সরকারি চাকরি আবেদন', icon: 'fas fa-briefcase' },
    { name: 'প্রবাসী কল্যাণ সেবা আবেদন', icon: 'fas fa-globe' },
    { name: 'হজ ভিসা আবেদন', icon: 'fas fa-kaaba' },
    { name: 'পেশাদার লাইসেন্স (ডাক্তার/ইঞ্জিনিয়ার)', icon: 'fas fa-stethoscope' },
    { name: 'সরকারি অনুদান আবেদন', icon: 'fas fa-hand-holding-usd' },
    // নতুন ৫০টি চাকরি-সম্পর্কিত ক্যাটাগরি
    { name: 'সেনাবাহিনী চাকরি', icon: 'fas fa-shield-alt' },
    { name: 'পুলিশ চাকরি', icon: 'fas fa-user-shield' },
    { name: 'আনসার-ভিডিপি চাকরি', icon: 'fas fa-users-cog' },
    { name: 'রেলওয়ে চাকরি', icon: 'fas fa-train' },
    { name: 'পোস্ট অফিস চাকরি', icon: 'fas fa-envelope' },
    { name: 'শিক্ষক নিয়োগ (সরকারি)', icon: 'fas fa-chalkboard-teacher' },
    { name: 'স্বাস্থ্যকর্মী চাকরি', icon: 'fas fa-user-md' },
    { name: 'বাংলা একাডেমি চাকরি', icon: 'fas fa-book' },
    { name: 'বিআরটিসি চাকরি', icon: 'fas fa-bus' },
    { name: 'কাস্টমস চাকরি', icon: 'fas fa-boxes' },
    { name: 'ট্যাক্স চাকরি', icon: 'fas fa-file-invoice-dollar' },
    { name: 'ফায়ার সার্ভিস চাকরি', icon: 'fas fa-fire' },
    { name: 'জেলা প্রশাসন চাকরি', icon: 'fas fa-landmark' },
    { name: 'বিমান বন্দর চাকরি', icon: 'fas fa-plane' },
    { name: 'বিসিসি (BCS) চাকরি', icon: 'fas fa-graduation-cap' },
    { name: 'ব্যাংক চাকরি (বেসরকারি)', icon: 'fas fa-university' },
    { name: 'এনজিও চাকরি', icon: 'fas fa-hands-helping' },
    { name: 'আইটি চাকরি (সফটওয়্যার)', icon: 'fas fa-laptop-code' },
    { name: 'টেলিকম চাকরি', icon: 'fas fa-phone' },
    { name: 'গ্যার্মেন্ট চাকরি', icon: 'fas fa-tshirt' },
    { name: 'ফার্মাসি চাকরি', icon: 'fas fa-prescription-bottle' },
    { name: 'হোটেল চাকরি', icon: 'fas fa-hotel' },
    { name: 'রেস্টুরেন্ট চাকরি', icon: 'fas fa-utensils' },
    { name: 'কনস্ট্রাকশন চাকরি', icon: 'fas fa-tools' },
    { name: 'অটোমোবাইল চাকরি', icon: 'fas fa-car-side' },
    { name: 'মার্কেটিং চাকরি', icon: 'fas fa-bullhorn' },
    { name: 'একাউন্টস চাকরি', icon: 'fas fa-calculator' },
    { name: 'এইচআর চাকরি', icon: 'fas fa-users' },
    { name: 'গ্রাফিক ডিজাইন চাকরি', icon: 'fas fa-paint-brush' },
    { name: 'ফটোগ্রাফি চাকরি', icon: 'fas fa-camera' },
    { name: 'জার্নালিজম চাকরি', icon: 'fas fa-newspaper' },
    { name: 'রিয়েল এস্টেট চাকরি', icon: 'fas fa-home' },
    { name: 'লজিস্টিক্স চাকরি', icon: 'fas fa-truck' },
    { name: 'রিটেইল চাকরি', icon: 'fas fa-shopping-cart' },
    { name: 'ইন্টারনেট মার্কেটিং চাকরি', icon: 'fas fa-globe' },
    { name: 'কনটেন্ট রাইটিং চাকরি', icon: 'fas fa-pen' },
    { name: 'ডিজিটাল মার্কেটিং চাকরি', icon: 'fas fa-chart-line' },
    { name: 'সেলস চাকরি', icon: 'fas fa-hand-holding-usd' },
    { name: 'কাস্টমার সার্ভিস চাকরি', icon: 'fas fa-headset' },
    { name: 'প্রোডাকশন চাকরি', icon: 'fas fa-industry' },
    { name: 'এডভোকেসি চাকরি', icon: 'fas fa-balance-scale' },
    { name: 'এডুকেশনাল কনসালটেন্ট চাকরি', icon: 'fas fa-chalkboard' },
    { name: 'ট্রেনিং চাকরি', icon: 'fas fa-user-graduate' },
    { name: 'রিসার্চ চাকরি', icon: 'fas fa-flask' },
    { name: 'ফ্রিল্যান্স চাকরি', icon: 'fas fa-user-tie' },
    { name: 'ইনশিওরেন্স চাকরি', icon: 'fas fa-shield-alt' },
    { name: 'এভিয়েশন চাকরি', icon: 'fas fa-plane-departure' },
    { name: 'এন্টারটেইনমেন্ট চাকরি', icon: 'fas fa-film' },
    { name: 'অর্গানিক ফার্মিং চাকরি', icon: 'fas fa-leaf' }
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
