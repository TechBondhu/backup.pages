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
    // নতুন বিশ্ববিদ্যালয় ক্যাটাগরি
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
    { name: 'ইসলামী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university' }
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
