window.App = window.App || {};

// 📌 UYGULAMA BAŞLATMA
// Sayfa tamamen yüklendiğinde çalışır
document.addEventListener("DOMContentLoaded", () => {

    // 📌 DOM ELEMENTLERİNİ TOPLA
    // Sayfadaki önemli elementleri bir kere alıp saklıyoruz

    App.elements.navItems = Array.from(
        document.querySelectorAll(".nav-item")
    ); // Menü itemları

    App.elements.sections = Array.from(
        document.querySelectorAll(".content-section")
    ); // Tüm sectionlar

    App.elements.mobileNav = document.getElementById("mobile-nav"); // mobil dropdown
    App.elements.progressFill = document.getElementById("progress-fill"); // progress bar
    App.elements.sectionCounter = document.getElementById("section-counter"); // "Bölüm 1/5"
    App.elements.mainContent = document.getElementById("main-content"); // scroll alanı

    // 📌 MODÜLLERİ BAŞLAT
    // Her özellik burada tek tek aktif ediliyor

    App.initNavigation();           // menü + section geçişleri
    App.initTheme();                // dark / light mode
    App.initPresentationMode();     // sunum modu (klavye kontrolü)
    App.initTimeline();             // timeline sistemi
    App.initInstructionSimulator(); // adım adım simülasyon
    App.initThermalSimulator();     // güç / sıcaklık simülasyonu
    App.initUseCases();             // kullanım senaryoları
    App.initHybridCores();          // çekirdek animasyonu
    App.initGlossary();             // arama / filtre
    App.initQuiz();                 // quiz sistemi

    // 📌 İLK SAYFA
    // Sayfa açıldığında ilk section'ı göster
    App.showSection("sec-intro");
});