export const genres = [
    { name: 'এনআইডি আবেদন', icon: 'fas fa-id-card', intent: 'apply_nid' },
    { name: 'পাসপোর্ট আবেদন', icon: 'fas fa-passport', intent: 'apply_passport' },
    { name: 'কোম্পানি রেজিস্ট্রেশন', icon: 'fas fa-building', intent: 'register_company' },
    { name: 'পেনশন আবেদন ফর্ম', icon: 'fas fa-money-check-alt', intent: 'apply_pension' },
    { name: 'টিআইএন (TIN) সার্টিফিকেট আবেদন', icon: 'fas fa-file-invoice', intent: 'apply_tin' },
    { name: 'ভূমি নামজারি (Mutation) আবেদনপত্র', icon: 'fas fa-map-marked-alt', intent: 'apply_land_mutation' },
    { name: 'উপবৃত্তি বা শিক্ষাবৃত্তির আবেদন', icon: 'fas fa-graduation-cap', intent: 'apply_scholarship' },
    { name: 'জন্ম ও মৃত্যু নিবন্ধন', icon: 'fas fa-certificate', intent: 'register_birth_death' },
    { name: 'ড্রাইভিং লাইসেন্স আবেদন', icon: 'fas fa-car', intent: 'apply_driving_license' },
    { name: 'নাগরিক সনদ (Citizen Certificate) আবেদন', icon: 'fas fa-user-check', intent: 'apply_citizen_certificate' },
    { name: 'চারিত্রিক সনদপত্র (Character Certificate) আবেদন', icon: 'fas fa-award', intent: 'apply_character_certificate' },
    { name: 'ট্রেড লাইসেন্স', icon: 'fas fa-store', intent: 'apply_trade_license' },
    { name: 'ভ্যাট রেজিস্ট্রেশন', icon: 'fas fa-calculator', intent: 'register_vat' },
    { name: 'প্রপার্টি রেজিস্ট্রেশন', icon: 'fas fa-home', intent: 'register_property' },
    { name: 'ব্যাংক অ্যাকাউন্ট খোলা', icon: 'fas fa-university', intent: 'open_bank_account' },
    { name: 'ঢাকা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_du_admission' },
    { name: 'খুলনা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_ku_admission' },
    { name: 'রাজশাহী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_ru_admission' },
    { name: 'চট্টগ্রাম বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_cu_admission' },
    { name: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_ju_admission' },
    { name: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_bau_admission' },
    { name: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_sust_admission' },
    { name: 'জগন্নাথ বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_jnu_admission' },
    { name: 'কুমিল্লা বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_comu_admission' },
    { name: 'বরিশাল বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_bu_admission' },
    { name: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_nstu_admission' },
    { name: 'হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_hstu_admission' },
    { name: 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_mbstu_admission' },
    { name: 'পটুয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_pstu_admission' },
    { name: 'ইসলামী বিশ্ববিদ্যালয় ভর্তি আবেদন', icon: 'fas fa-university', intent: 'apply_iu_admission' },
    { name: 'গ্যাস সংযোগ আবেদন', icon: 'fas fa-fire', intent: 'apply_gas_connection' },
    { name: 'বিদ্যুৎ সংযোগ আবেদন', icon: 'fas fa-bolt', intent: 'apply_electricity_connection' },
    { name: 'পানি সংযোগ আবেদন', icon: 'fas fa-faucet', intent: 'apply_water_connection' },
    { name: 'জমির খতিয়ান সংশোধন', icon: 'fas fa-file-alt', intent: 'correct_land_record' },
    { name: 'ভূমি উন্নয়ন কর পরিশোধ', icon: 'fas fa-money-bill', intent: 'pay_land_development_tax' },
    { name: 'ইমিগ্রেশন ক্লিয়ারেন্স', icon: 'fas fa-plane-departure', intent: 'apply_immigration_clearance' },
    { name: 'ওয়ারিশ সনদ আবেদন', icon: 'fas fa-users', intent: 'apply_heir_certificate' },
    { name: 'পৌরসভা সেবা আবেদন', icon: 'fas fa-city', intent: 'apply_municipal_service' },
    { name: 'বন্ধকী জমি রেজিস্ট্রেশন', icon: 'fas fa-handshake', intent: 'register_mortgaged_land' },
    { name: 'বিবাহ নিবন্ধন আবেদন', icon: 'fas fa-ring', intent: 'register_marriage' },
    { name: 'তালাক নিবন্ধন আবেদন', icon: 'fas fa-heart-broken', intent: 'register_divorce' },
    { name: 'জাতীয় পেনশন স্কিমে যোগদান', icon: 'fas fa-piggy-bank', intent: 'join_national_pension' },
    { name: 'পরিবেশ ছাড়পত্র আবেদন', icon: 'fas fa-leaf', intent: 'apply_environment_clearance' },
    { name: 'ফায়ার সেফটি সার্টিফিকেট', icon: 'fas fa-fire-extinguisher', intent: 'apply_fire_safety' },
    { name: 'বিল্ডিং প্ল্যান অনুমোদন', icon: 'fas fa-drafting-compass', intent: 'approve_building_plan' },
    { name: 'সরকারি চাকরি আবেদন', icon: 'fas fa-briefcase', intent: 'apply_government_job' },
    { name: 'প্রবাসী কল্যাণ সেবা আবেদন', icon: 'fas fa-globe', intent: 'apply_migrant_welfare' },
    { name: 'হজ ভিসা আবেদন', icon: 'fas fa-kaaba', intent: 'apply_hajj_visa' },
    { name: 'পেশাদার লাইসেন্স (ডাক্তার/ইঞ্জিনিয়ার)', icon: 'fas fa-stethoscope', intent: 'apply_professional_license' },
    { name: 'সরকারি অনুদান আবেদন', icon: 'fas fa-hand-holding-usd', intent: 'apply_government_grant' },
    { name: 'সেনাবাহিনী চাকরি', icon: 'fas fa-shield-alt', intent: 'apply_army_job' },
    { name: 'পুলিশ চাকরি', icon: 'fas fa-user-shield', intent: 'apply_police_job' },
    { name: 'আনসার-ভিডিপি চাকরি', icon: 'fas fa-users-cog', intent: 'apply_ansar_vdp_job' },
    { name: 'রেলওয়ে চাকরি', icon: 'fas fa-train', intent: 'apply_railway_job' },
    { name: 'পোস্ট অফিস চাকরি', icon: 'fas fa-envelope', intent: 'apply_post_office_job' },
    { name: 'শিক্ষক নিয়োগ (সরকারি)', icon: 'fas fa-chalkboard-teacher', intent: 'apply_teacher_job' },
    { name: 'স্বাস্থ্যকর্মী চাকরি', icon: 'fas fa-user-md', intent: 'apply_health_worker_job' },
    { name: 'বাংলা একাডেমি চাকরি', icon: 'fas fa-book', intent: 'apply_bangla_academy_job' },
    { name: 'বিআরটিসি চাকরি', icon: 'fas fa-bus', intent: 'apply_brtc_job' },
    { name: 'কাস্টমস চাকরি', icon: 'fas fa-boxes', intent: 'apply_customs_job' },
    { name: 'ট্যাক্স চাকরি', icon: 'fas fa-file-invoice-dollar', intent: 'apply_tax_job' },
    { name: 'ফায়ার সার্ভিস চাকরি', icon: 'fas fa-fire', intent: 'apply_fire_service_job' },
    { name: 'জেলা প্রশাসন চাকরি', icon: 'fas fa-landmark', intent: 'apply_district_admin_job' },
    { name: 'বিমান বন্দর চাকরি', icon: 'fas fa-plane', intent: 'apply_airport_job' },
    { name: 'বিসিসি (BCS) চাকরি', icon: 'fas fa-graduation-cap', intent: 'apply_bcs_job' },
    { name: 'ব্যাংক চাকরি (বেসরকারি)', icon: 'fas fa-university', intent: 'apply_private_bank_job' },
    { name: 'এনজিও চাকরি', icon: 'fas fa-hands-helping', intent: 'apply_ngo_job' },
    { name: 'আইটি চাকরি (সফটওয়্যার)', icon: 'fas fa-laptop-code', intent: 'apply_software_job' },
    { name: 'টেলিকম চাকরি', icon: 'fas fa-phone', intent: 'apply_telecom_job' },
    { name: 'গ্যার্মেন্ট চাকরি', icon: 'fas fa-tshirt', intent: 'apply_garment_job' },
    { name: 'ফার্মাসি চাকরি', icon: 'fas fa-prescription-bottle', intent: 'apply_pharmacy_job' },
    { name: 'হোটেল চাকরি', icon: 'fas fa-hotel', intent: 'apply_hotel_job' },
    { name: 'রেস্টুরেন্ট চাকরি', icon: 'fas fa-utensils', intent: 'apply_restaurant_job' },
    { name: 'কনস্ট্রাকশন চাকরি', icon: 'fas fa-tools', intent: 'apply_construction_job' },
    { name: 'অটোমোবাইল চাকরি', icon: 'fas fa-car-side', intent: 'apply_automobile_job' },
    { name: 'মার্কেটিং চাকরি', icon: 'fas fa-bullhorn', intent: 'apply_marketing_job' },
    { name: 'একাউন্টস চাকরি', icon: 'fas fa-calculator', intent: 'apply_accounts_job' },
    { name: 'এইচআর চাকরি', icon: 'fas fa-users', intent: 'apply_hr_job' },
    { name: 'গ্রাফিক ডিজাইন চাকরি', icon: 'fas fa-paint-brush', intent: 'apply_graphic_design_job' },
    { name: 'ফটোগ্রাফি চাকরি', icon: 'fas fa-camera', intent: 'apply_photography_job' },
    { name: 'জার্নালিজম চাকরি', icon: 'fas fa-newspaper', intent: 'apply_journalism_job' },
    { name: 'রিয়েল এস্টেট চাকরি', icon: 'fas fa-home', intent: 'apply_real_estate_job' },
    { name: 'লজিস্টিক্স চাকরি', icon: 'fas fa-truck', intent: 'apply_logistics_job' },
    { name: 'রিটেইল চাকরি', icon: 'fas fa-shopping-cart', intent: 'apply_retail_job' },
    { name: 'ইন্টারনেট মার্কেটিং চাকরি', icon: 'fas fa-globe', intent: 'apply_internet_marketing_job' },
    { name: 'কনটেন্ট রাইটিং চাকরি', icon: 'fas fa-pen', intent: 'apply_content_writing_job' },
    { name: 'ডিজিটাল মার্কেটিং চাকরি', icon: 'fas fa-chart-line', intent: 'apply_digital_marketing_job' },
    { name: 'সেলস চাকরি', icon: 'fas fa-hand-holding-usd', intent: 'apply_sales_job' },
    { name: 'কাস্টমার সার্ভিস চাকরি', icon: 'fas fa-headset', intent: 'apply_customer_service_job' },
    { name: 'প্রোডাকশন চাকরি', icon: 'fas fa-industry', intent: 'apply_production_job' },
    { name: 'এডভোকেসি চাকরি', icon: 'fas fa-balance-scale', intent: 'apply_advocacy_job' },
    { name: 'এডুকেশনাল কনসালটেন্ট চাকরি', icon: 'fas fa-chalkboard', intent: 'apply_educational_consultant_job' },
    { name: 'ট্রেনিং চাকরি', icon: 'fas fa-user-graduate', intent: 'apply_training_job' },
    { name: 'রিসার্চ চাকরি', icon: 'fas fa-flask', intent: 'apply_research_job' },
    { name: 'ফ্রিল্যান্স চাকরি', icon: 'fas fa-user-tie', intent: 'apply_freelance_job' },
    { name: 'ইনশিওরেন্স চাকরি', icon: 'fas fa-shield-alt', intent: 'apply_insurance_job' },
    { name: 'এভিয়েশন চাকরি', icon: 'fas fa-plane-departure', intent: 'apply_aviation_job' },
    { name: 'এন্টারটেইনমেন্ট চাকরি', icon: 'fas fa-film', intent: 'apply_entertainment_job' },
    { name: 'অর্গানিক ফার্মিং চাকরি', icon: 'fas fa-leaf', intent: 'apply_organic_farming_job' }
];

export function renderGenresList(triggerIntent, updateGenreHeader) {
    const genresList = document.getElementById('genresList');
    if (!genresList) {
        console.error('genresList element not found!');
        return;
    }
    genresList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    genres.forEach(genre => {
        const genreItem = document.createElement('div');
        genreItem.className = 'genre-item';
        genreItem.innerHTML = `<i class="${genre.icon}"></i><span>${genre.name}</span>`;
        genreItem.addEventListener('click', () => {
            console.log(`Genre clicked: ${genre.name}`);
            updateGenreHeader(genre.name);
            triggerIntent(genre.intent);
            document.getElementById('genresModal').style.display = 'none';
        });
        fragment.appendChild(genreItem);
    });
    genresList.appendChild(fragment);
}

export function openGenresModal() {
    const genresModal = document.getElementById('genresModal');
    if (genresModal) {
        genresModal.style.display = 'flex';
    } else {
        console.error('genresModal element not found!');
    }
}

export function closeGenresModal() {
    const genresModal = document.getElementById('genresModal');
    if (genresModal) {
        genresModal.style.display = 'none';
    }
}
