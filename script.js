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
    { name: 'বিসিসি (BCS) চাকরি', icon: 'fas fa-graduation-cap', message: 'আমি বিসিসি চাকরির জন্য আবেদন করতে চাই' },
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

    // State Variables
    let selectedFile = null;
    let editedImage = null;
    const ctx = editCanvas?.getContext('2d');
    let image = new Image();
    let cropRect = { x: 0, y: 0, width: 200, height: 200 };
    let brightnessValue = 0;
    let contrastValue = 0;
    let bgColor = 'white';
    let currentChatId = sessionStorage.getItem('chatId') || Date.now().toString();
    sessionStorage.setItem('chatId', currentChatId);

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
    if (homeIcon) {
        homeIcon.addEventListener('click', () => window.location.href = 'index.html');
    }
    if (settingsIcon) {
        settingsIcon.addEventListener('click', () => window.location.href = 'settings.html');
    }
    if (accountIcon) {
        accountIcon.addEventListener('click', () => window.location.href = 'account.html');
    }

    // Utility: Sanitize Message to Prevent XSS
    function sanitizeMessage(message) {
        if (typeof message !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = message;
        return div.innerHTML
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/&/g, '&amp;');
    }

    // Utility: Show Typing Indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        if (messagesDiv) {
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        return typingDiv;
    }

    // Utility: Progressive Message Loading
    function displayProgressiveMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message', 'slide-in');
        if (messagesDiv) {
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        const words = message.split(' ');
        let currentIndex = 0;

        function addNextWord() {
            if (currentIndex < words.length) {
                messageDiv.innerHTML = sanitizeMessage(words.slice(0, currentIndex + 1).join(' '));
                currentIndex++;
                setTimeout(addNextWord, 100);
            } else {
                saveChatHistory(message, sender);
            }
        }

        addNextWord();

        if (welcomeMessage && welcomeMessage.style.display !== 'none') {
            welcomeMessage.classList.add('fade-out');
            setTimeout(() => {
                welcomeMessage.style.display = 'none';
                welcomeMessage.classList.remove('fade-out');
            }, 300);
        }
    }

    // Display Message
    function displayMessage(message, sender) {
        if (sender === 'bot') {
            displayProgressiveMessage(sanitizeMessage(message), sender);
        } else {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('user-message', 'slide-in');
            messageDiv.innerHTML = sanitizeMessage(message);
            if (messagesDiv) {
                messagesDiv.appendChild(messageDiv);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }
            if (welcomeMessage && welcomeMessage.style.display !== 'none') {
                welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    welcomeMessage.classList.remove('fade-out');
                }, 300);
            }
            saveChatHistory(message, sender);
        }
    }

    // Message Sending
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.repeat) sendMessage();
        });
    }

    function sendMessage() {
        const message = userInput?.value.trim() || '';
        if (message || selectedFile) {
            if (message) {
                const sanitizedMessage = sanitizeMessage(message);
                displayMessage(sanitizedMessage, 'user');
                saveChatHistory(sanitizedMessage, 'user');
                callRasaAPI(sanitizedMessage);
                userInput.value = '';
            }
            if (selectedFile) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('user-message', 'slide-in');
                const img = document.createElement('img');
                img.src = previewImage?.src || '';
                img.classList.add('image-preview');
                img.addEventListener('click', () => openImageModal(img.src));
                messageDiv.appendChild(img);
                if (messagesDiv) {
                    messagesDiv.appendChild(messageDiv);
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                }
                if (welcomeMessage && welcomeMessage.style.display !== 'none') {
                    welcomeMessage.classList.add('fade-out');
                    setTimeout(() => {
                        welcomeMessage.style.display = 'none';
                        welcomeMessage.classList.remove('fade-out');
                    }, 300);
                }

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
                            saveChatHistory(`[Image: ${selectedFile.name}]`, 'user');
                        } else if (data.error) {
                            displayMessage(`ইমেজ আপলোডে ত্রুটি: ${sanitizeMessage(data.error)}`, 'bot');
                        }
                    })
                    .catch(error => {
                        displayMessage('ইমেজ আপলোডে ত্রুটি হয়েছে।', 'bot');
                        console.error('Image Upload Error:', error);
                    });
                clearPreview();
            }
        }
    }

    // Image Upload and Preview
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => fileInput?.click());
    }
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (previewImage) {
                        previewImage.src = e.target.result;
                    }
                    if (previewContainer) {
                        previewContainer.style.display = 'flex';
                    }
                    if (userInput) {
                        userInput.style.paddingLeft = '110px';
                    }
                };
                reader.onerror = () => {
                    displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                };
                reader.readAsDataURL(file);
            }
            fileInput.value = '';
        });
    }

    // Image Review Modal
    if (previewImage) {
        previewImage.addEventListener('click', () => {
            if (reviewImage) {
                reviewImage.src = previewImage.src;
            }
            if (imageReviewModal) {
                imageReviewModal.style.display = 'flex';
            }
        });
    }

    // Image Editing
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            image.src = previewImage?.src || '';
            image.onload = () => {
                if (editCanvas) {
                    editCanvas.width = image.width;
                    editCanvas.height = image.height;
                    cropRect.width = Math.min(200, image.width);
                    cropRect.height = Math.min(200, image.height);
                    drawImage();
                    if (editModal) {
                        editModal.style.display = 'flex';
                    }
                }
            };
        });
    }

    // Canvas Editing Controls
    if (cropX) {
        cropX.addEventListener('input', () => {
            cropRect.x = parseInt(cropX.value);
            drawImage();
        });
    }

    if (cropY) {
        cropY.addEventListener('input', () => {
            cropRect.y = parseInt(cropY.value);
            drawImage();
        });
    }

    if (cropWidth) {
        cropWidth.addEventListener('input', () => {
            cropRect.width = parseInt(cropWidth.value);
            drawImage();
        });
    }

    if (cropHeight) {
        cropHeight.addEventListener('input', () => {
            cropRect.height = parseInt(cropHeight.value);
            drawImage();
        });
    }

    if (brightness) {
        brightness.addEventListener('input', () => {
            brightnessValue = parseInt(brightness.value);
            drawImage();
        });
    }

    if (contrast) {
        contrast.addEventListener('input', () => {
            contrastValue = parseInt(contrast.value);
            drawImage();
        });
    }

    if (backgroundColor) {
        backgroundColor.addEventListener('change', () => {
            bgColor = backgroundColor.value;
            drawImage();
        });
    }

    function drawImage() {
        if (ctx) {
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
    }

    // Apply Edited Image
    if (editApplyBtn) {
        editApplyBtn.addEventListener('click', () => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = cropRect.width;
            tempCanvas.height = cropRect.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
                tempCtx.fillStyle = bgColor === 'transparent' ? 'rgba(0,0,0,0)' : bgColor;
                tempCtx.fillRect(0, 0, cropRect.width, cropRect.height);
                tempCtx.filter = `brightness(${100 + brightnessValue}%) contrast(${100 + contrastValue}%)`;
                tempCtx.drawImage(image, cropRect.x, cropRect.y, cropRect.width, cropRect.height, 0, 0, cropRect.width, cropRect.height);

                editedImage = tempCanvas.toDataURL('image/jpeg');
                if (previewImage) {
                    previewImage.src = editedImage;
                }

                callRasaAPI("show_review");
                if (editModal) {
                    editModal.style.display = 'none';
                }
            }
        });
    }

    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', () => {
            if (editModal) {
                editModal.style.display = 'none';
            }
        });
    }

    function openImageModal(imageSrc) {
        if (reviewImage) {
            reviewImage.src = imageSrc;
        }
        if (imageReviewModal) {
            imageReviewModal.style.display = 'flex';
        }
    }

    if (imageReviewModal) {
        imageReviewModal.addEventListener('click', (e) => {
            if (e.target === imageReviewModal || e.target === deleteImageBtn) {
                imageReviewModal.style.display = 'none';
            }
        });
    }

    if (deleteImageBtn) {
        deleteImageBtn.addEventListener('click', () => {
            clearPreview();
            if (imageReviewModal) {
                imageReviewModal.style.display = 'none';
            }
        });
    }

    function clearPreview() {
        selectedFile = null;
        editedImage = null;
        if (previewImage) {
            previewImage.src = '';
        }
        if (previewContainer) {
            previewContainer.style.display = 'none';
        }
        if (userInput) {
            userInput.style.paddingLeft = '15px';
        }
    }

    // Sidebar and Chat History
    if (historyIcon) {
        historyIcon.addEventListener('click', toggleSidebar);
    }
    if (newChatIcon) {
        newChatIcon.addEventListener('click', startNewChat);
    }
    if (closeSidebar) {
        closeSidebar.addEventListener('click', hideSidebar);
    }
    if (sidebarIcon) {
        sidebarIcon.addEventListener('click', toggleSidebar);
    }

    function toggleSidebar() {
        if (sidebar && chatContainer) {
            sidebar.classList.toggle('open');
            chatContainer.classList.toggle('sidebar-open');
            loadChatHistory();
        }
    }

    function hideSidebar() {
        if (sidebar && chatContainer) {
            sidebar.classList.remove('open');
            chatContainer.classList.remove('sidebar-open');
        }
    }

    function startNewChat() {
        currentChatId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('chatId', currentChatId);
        if (messagesDiv) {
            messagesDiv.innerHTML = '';
        }
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
        if (chatBox) {
            chatBox.classList.add('fade-in');
            setTimeout(() => chatBox.classList.remove('fade-in'), 500);
        }
        saveChatHistory('New Chat Started', 'system');
        loadChatHistory();
    }

    function displayReview(reviewData) {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card', 'slide-in');
        reviewCard.setAttribute('data-editable', 'true');
        reviewCard.setAttribute('data-id', Date.now());
        reviewCard.setAttribute('data-confirmed', 'false');
        reviewCard.innerHTML = '<h3>আপনার তথ্য রিভিউ</h3>';

        const reviewContent = document.createElement('div');
        reviewContent.classList.add('review-content');

        for (const [key, value] of Object.entries(reviewData)) {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.setAttribute('data-key', key);

            const label = document.createElement('label');
            label.innerText = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ') + ':';
            reviewItem.appendChild(label);

            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                const img = document.createElement('img');
                img.src = value;
                reviewItem.appendChild(img);
            } else {
                const p = document.createElement('p');
                p.innerText = value;
                reviewItem.appendChild(p);
            }

            reviewContent.appendChild(reviewItem);
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'review-buttons';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn ripple-btn';
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', () => toggleEditMode(reviewCard, reviewData));

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'confirm-btn ripple-btn';
        confirmBtn.innerText = 'Confirm';
        confirmBtn.style.display = 'inline-block';
        let isProcessing = false;

        confirmBtn.addEventListener('click', async () => {
            if (isProcessing) return;
            isProcessing = true;
            confirmBtn.disabled = true;

            try {
                const updatedData = {};
                reviewContent.querySelectorAll('.review-item').forEach(item => {
                    const key = item.getAttribute('data-key');
                    const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                    if (!value) {
                        console.warn(`কোনো মান পাওয়া যায়নি: ${key}`);
                    }
                    updatedData[key] = value;
                });

                // ফায়ারবেজে ডেটা সেভ করা
                await db.collection('submissions').add({
                    review_data: updatedData,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    chat_id: currentChatId
                });

                displayMessage('আপনার তথ্য সফলভাবে ফায়ারবেজে পাঠানো হয়েছে!', 'bot');
                await generatePDF(updatedData, reviewCard); // await যোগ করা
                reviewCard.setAttribute('data-confirmed', 'true');
                reviewCard.setAttribute('data-editable', 'false');
                editBtn.disabled = true;
                editBtn.style.display = 'none';
                confirmBtn.style.display = 'none';

                // ডাউনলোড বাটন তৈরি
                buttonContainer.innerHTML = '';
                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download-btn ripple-btn';
                downloadBtn.innerText = 'Download PDF';
                downloadBtn.addEventListener('click', () => {
                    const pdfUrl = reviewCard.getAttribute('data-pdf-url');
                    if (pdfUrl) {
                        const link = document.createElement('a');
                        link.href = pdfUrl;
                        link.download = 'formbondhu_submission.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        displayMessage('পিডিএফ ডাউনলোডের জন্য URL পাওয়া যায়নি।', 'bot');
                    }
                });
                buttonContainer.appendChild(downloadBtn);
            } catch (error) {
                let errorMessage = 'অজানা ত্রুটি ঘটেছে।';
                if (error.code && error.message) {
                    errorMessage = `ফায়ারবেজে তথ্য পাঠাতে সমস্যা: ${error.message}`;
                }
                displayMessage(errorMessage, 'bot');
                console.error('Error in confirm button:', error);
                confirmBtn.disabled = false;
            } finally {
                isProcessing = false;
            }
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(confirmBtn);

        reviewCard.appendChild(reviewContent);
        reviewCard.appendChild(buttonContainer);
        if (messagesDiv) {
            messagesDiv.appendChild(reviewCard);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        if (welcomeMessage && welcomeMessage.style.display !== 'none') {
            welcomeMessage.classList.add('fade-out');
            setTimeout(() => {
                welcomeMessage.style.display = 'none';
                welcomeMessage.classList.remove('fade-out');
            }, 300);
        }
    }

    function toggleEditMode(card, reviewData) {
        if (card.getAttribute('data-confirmed') === 'true') {
            displayMessage('ডেটা কনফার্ম হয়ে গেছে। এডিট করা যাবে না।', 'bot');
            return;
        }

        const isEditable = card.getAttribute('data-editable') === 'true';
        const reviewContent = card.querySelector('.review-content');
        const editBtn = card.querySelector('.edit-btn');
        const confirmBtn = card.querySelector('.confirm-btn');

        if (!isEditable) {
            card.setAttribute('data-editable', 'true');
            editBtn.innerText = 'Save';
            confirmBtn.style.display = 'none';

            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const value = item.querySelector('p')?.innerText || item.querySelector('img')?.src;
                item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label>`;

                if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                    const img = document.createElement('img');
                    img.src = value;
                    item.appendChild(img);

                    const replaceIcon = document.createElement('i');
                    replaceIcon.className = 'fas fa-camera replace-image-icon';
                    item.appendChild(replaceIcon);

                    const replaceInput = document.createElement('input');
                    replaceInput.type = 'file';
                    replaceInput.className = 'replace-image-input';
                    replaceInput.accept = 'image/png, image/jpeg';
                    replaceInput.style.display = 'none';
                    item.appendChild(replaceInput);

                    replaceIcon.addEventListener('click', () => replaceInput.click());

                    replaceInput.addEventListener('change', () => {
                        const file = replaceInput.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                img.src = e.target.result;
                            };
                            reader.onerror = () => {
                                displayMessage('ইমেজ লোড করতে সমস্যা হয়েছে।', 'bot');
                            };
                            reader.readAsDataURL(file);
                        } else {
                            displayMessage('কোনো ইমেজ সিলেক্ট করা হয়নি।', 'bot');
                        }
                    });
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = value || '';
                    input.className = 'edit-input';
                    item.appendChild(input);
                }
            });
        } else {
            const updatedData = { ...reviewData };
            reviewContent.querySelectorAll('.review-item').forEach(item => {
                const key = item.getAttribute('data-key');
                const input = item.querySelector('input.edit-input');
                const img = item.querySelector('img');
                if (input) {
                    const newValue = input.value.trim();
                    updatedData[key] = newValue;
                    item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><p>${sanitizeMessage(newValue)}</p>`;
                } else if (img) {
                    updatedData[key] = img.src;
                    item.innerHTML = `<label>${sanitizeMessage(key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))}:</label><img src="${img.src}">`;
                }
            });

            card.setAttribute('data-editable', 'false');
            editBtn.innerText = 'Edit';
            confirmBtn.style.display = 'inline-block';
        }
    }

    function displayLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('loading', 'slide-in');
        loadingDiv.innerHTML = 'Loading <span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        if (messagesDiv) {
            messagesDiv.appendChild(loadingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        return loadingDiv;
    }

    function removeLoading(loadingDiv) {
        if (loadingDiv) {
            loadingDiv.classList.add('slide-out');
            setTimeout(() => loadingDiv.remove(), 300);
        }
    }

    function callRasaAPI(message, metadata = {}) {
        const typingDiv = showTypingIndicator();
        const payload = { sender: currentChatId, message: message };
        if (Object.keys(metadata).length > 0) {
            payload.metadata = metadata;
        }
        setTimeout(() => {
            if (typeof $ !== 'undefined') {
                $.ajax({
                    url: 'http://localhost:5005/webhooks/rest/webhook',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(payload),
                    success: (data) => {
                        typingDiv.remove();
                        if (!data || data.length === 0) {
                            displayMessage('কোনো প্রতিক্রিয়া পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।', 'bot');
                            return;
                        }
                        data.forEach(response => {
                            if (response.text && !response.text.toLowerCase().includes('hi')) {
                                displayMessage(sanitizeMessage(response.text), 'bot');
                            }
                            if (response.custom && response.custom.review_data) {
                                displayReview(response.custom.review_data);
                            }
                            if (response.buttons) {
                                const buttonDiv = document.createElement('div');
                                buttonDiv.classList.add('welcome-buttons');
                                response.buttons.forEach(btn => {
                                    const button = document.createElement('button');
                                    button.innerText = sanitizeMessage(btn.title);
                                    button.classList.add('ripple-btn');
                                    button.addEventListener('click', () => sendMessage(btn.payload));
                                    buttonDiv.appendChild(button);
                                });
                                if (messagesDiv) {
                                    messagesDiv.appendChild(buttonDiv);
                                }
                            }
                        });
                    },
                    error: (error) => {
                        typingDiv.remove();
                        displayMessage('বটের সাথে সংযোগে সমস্যা হয়েছে। দয়া করে সার্ভার চেক করুন।', 'bot');
                        console.error('Rasa API Error:', error.status, error.statusText, error.responseText);
                    }
                });
            } else {
                typingDiv.remove();
                displayMessage('jQuery লোড হয়নি। দয়া করে jQuery লাইব্রেরি যোগ করুন।', 'bot');
            }
        }, 500);
    }

    async function generatePDF(reviewData, reviewCard) {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        doc.setFont("helvetica");
        doc.setFontSize(16);
        doc.setFillColor(30, 58, 138);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text("Formbondhu Submission", 20, 20);
        doc.setFontSize(12);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
        doc.setDrawColor(30, 58, 138);
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);

        let y = 50;
        for (const [key, value] of Object.entries(reviewData)) {
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
            doc.setFont("helvetica", "bold");
            doc.text(`${label}:`, 20, y);
            doc.setFont("helvetica", "normal");

            if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('data:image'))) {
                try {
                    const imgData = value;
                    doc.addImage(imgData, 'JPEG', 20, y + 5, 80, 60, undefined, 'FAST');
                    y += 70;
                } catch (error) {
                    doc.text("Image could not be loaded", 20, y + 5);
                    y += 10;
                    console.error('PDF Image Error:', error);
                }
            } else {
                const lines = doc.splitTextToSize(value, 170);
                doc.text(lines, 20, y + 5);
                y += lines.length * 5 + 5;
            }
            y += 5;
        }

        doc.setFillColor(229, 231, 235);
        doc.rect(0, 277, 210, 20, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text("Generated by Formbondhu - www.formbondhu.com", 20, 287);
        doc.text("Page 1 of 1", 180, 287);

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        reviewCard.setAttribute('data-pdf-url', pdfUrl);
    }

    function saveChatHistory(message, sender) {
        let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        if (!chats[currentChatId]) {
            chats[currentChatId] = { title: `Chat ${Object.keys(chats).length + 1}`, messages: [], timestamp: new Date().toISOString() };
        }
        chats[currentChatId].messages.push({ text: message, sender: sender, time: new Date().toISOString() });
        localStorage.setItem('chatHistory', JSON.stringify(chats));
    }

    function loadChatHistory() {
        if (historyList) {
            historyList.innerHTML = '';
        }
        const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        Object.keys(chats).forEach(chatId => {
            const chat = chats[chatId];
            if (chat && chat.title) {
                const item = document.createElement('div');
                item.classList.add('history-item');
                item.setAttribute('data-chat-id', chatId);
                item.innerHTML = `
                    <div class="history-item-content">
                        <p>${sanitizeMessage(chat.title)}</p>
                        <div class="timestamp">${new Date(chat.timestamp).toLocaleString()}</div>
                    </div>
                    <div class="options">
                        <i class="fas fa-ellipsis-v" id="optionIcon-${chatId}"></i>
                    </div>
                    <div class="dropdown" id="dropdown-${chatId}">
                        <div class="dropdown-item rename-item-${chatId}">Rename</div>
                        <div class="dropdown-item delete-item-${chatId}">Delete</div>
                    </div>
                `;
                historyList.appendChild(item);

                item.addEventListener('click', () => loadChat(chatId));
                const optionIcon = item.querySelector(`#optionIcon-${chatId}`);
                const dropdown = item.querySelector(`#dropdown-${chatId}`);
                const renameItem = item.querySelector(`.rename-item-${chatId}`);
                const deleteItem = item.querySelector(`.delete-item-${chatId}`);

                optionIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });

                renameItem.addEventListener('click', () => {
                    if (renameModal) {
                        renameModal.style.display = 'flex';
                    }
                    if (renameInput) {
                        renameInput.value = chat.title;
                    }
                    currentChatId = chatId;
                });

                deleteItem.addEventListener('click', () => {
                    if (deleteModal) {
                        deleteModal.style.display = 'flex';
                    }
                    currentChatId = chatId;
                });
            } else {
                console.warn(`Chat with ID ${chatId} is missing or invalid. Skipping...`);
            }
        });

        if (historyList && historyList.children.length > 0) {
            sidebar.classList.add('open');
            chatContainer.classList.add('sidebar-open');
        }
    }

    function loadChat(chatId) {
        currentChatId = chatId;
        sessionStorage.setItem('chatId', currentChatId);
        const chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
        const chat = chats[chatId];
        if (chat) {
            messagesDiv.innerHTML = '';
            chat.messages.forEach(msg => {
                displayMessage(msg.text, msg.sender);
            });
            if (welcomeMessage) {
                welcomeMessage.style.display = 'none';
            }
            sidebar.classList.remove('open');
            chatContainer.classList.remove('sidebar-open');
            loadChatHistory();
        }
    }

    if (renameCancelBtn) {
        renameCancelBtn.addEventListener('click', () => {
            if (renameModal) {
                renameModal.style.display = 'none';
            }
        });
    }

    if (renameSaveBtn) {
        renameSaveBtn.addEventListener('click', () => {
            const newTitle = renameInput?.value.trim() || '';
            if (newTitle) {
                let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
                if (chats[currentChatId]) {
                    chats[currentChatId].title = sanitizeMessage(newTitle);
                    localStorage.setItem('chatHistory', JSON.stringify(chats));
                    loadChatHistory();
                }
            }
            if (renameModal) {
                renameModal.style.display = 'none';
            }
        });
    }

    if (deleteCancelBtn) {
        deleteCancelBtn.addEventListener('click', () => {
            if (deleteModal) {
                deleteModal.style.display = 'none';
            }
        });
    }

    if (deleteConfirmBtn) {
        deleteConfirmBtn.addEventListener('click', () => {
            let chats = JSON.parse(localStorage.getItem('chatHistory') || '{}');
            if (chats[currentChatId]) {
                delete chats[currentChatId];
                localStorage.setItem('chatHistory', JSON.stringify(chats));
                loadChatHistory();
                if (Object.keys(chats).length === 0) {
                    startNewChat();
                } else {
                    messagesDiv.innerHTML = '';
                    if (welcomeMessage) {
                        welcomeMessage.style.display = 'block';
                    }
                }
            }
            if (deleteModal) {
                deleteModal.style.display = 'none';
            }
        });
    }

    function renderGenresList() {
        if (genresList) {
            genresList.innerHTML = '';
            genres.forEach(genre => {
                const genreItem = document.createElement('div');
                genreItem.className = 'genre-item ripple-btn';
                genreItem.innerHTML = `<i class="${genre.icon}"></i><span>${sanitizeMessage(genre.name)}</span>`;
                genreItem.addEventListener('click', () => {
                    if (genre.message) {
                        genresModal.classList.add('slide-out');
                        setTimeout(() => {
                            genresModal.style.display = 'none';
                            genresModal.classList.remove('slide-out');
                        }, 300);
                        welcomeMessage.classList.add('fade-out');
                        setTimeout(() => {
                            welcomeMessage.style.display = 'none';
                            welcomeMessage.classList.remove('fade-out');
                        }, 300);
                        displayMessage(sanitizeMessage(genre.message), 'user');
                        saveChatHistory(sanitizeMessage(genre.message), 'user');
                        callRasaAPI(sanitizeMessage(genre.message));
                    } else {
                        console.error(`Message undefined for genre: ${genre.name}`);
                        displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়। দয়া করে অন্য সেবা নির্বাচন করুন।', 'bot');
                    }
                });
                genresList.appendChild(genreItem);
            });
        }
    }

    function openGenresModal() {
        renderGenresList();
        genresModal.classList.add('slide-in');
        genresModal.style.display = 'flex';
        setTimeout(() => genresModal.classList.remove('slide-in'), 300);
    }

    function closeGenresModalFunc() {
        genresModal.classList.add('slide-out');
        setTimeout(() => {
            genresModal.style.display = 'none';
            genresModal.classList.remove('slide-out');
        }, 300);
    }

    if (moreOptionsBtn) {
        moreOptionsBtn.addEventListener('click', openGenresModal);
    }
    if (closeGenresModal) {
        closeGenresModal.addEventListener('click', closeGenresModalFunc);
    }

    document.querySelectorAll('.welcome-buttons button[data-genre]').forEach(button => {
        button.classList.add('ripple-btn');
        button.addEventListener('click', () => {
            const genreName = button.getAttribute('data-genre');
            const genre = genres.find(g => g.name === genreName);
            if (genre && genre.message) {
                welcomeMessage.classList.add('fade-out');
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                    welcomeMessage.classList.remove('fade-out');
                }, 300);
                displayMessage(sanitizeMessage(genre.message), 'user');
                saveChatHistory(sanitizeMessage(genre.message), 'user');
                callRasaAPI(sanitizeMessage(genre.message));
            } else {
                console.error(`Genre not found or message undefined for: ${genreName}`);
                displayMessage('এই সেবাটি বর্তমানে উপলব্ধ নয়। দয়া করে অন্য সেবা নির্বাচন করুন।', 'bot');
            }
        });
    });

    // Initialize
    loadChatHistory();
});
