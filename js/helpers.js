window.App = window.App || {};

// Uygulama çalışırken değişen değerler burada tutulur
// (yani uygulamanın hafızası gibi)
App.state = {

    currentSectionIndex: 0, // şu an hangi sectiondayız (0 = ilk bölüm)

    radarChartInstance: null, // radar grafik oluşturuldu mu (sonradan doldurulacak)

    powerChartInstance: null, // line grafik için aynı mantık

    instructionStep: 1 // simülasyonda kaçıncı adımdayız
};

// HTML'deki elementleri burada saklayacağız
App.elements = {};

// Sayıyı belirli aralıkta tutar 
App.clamp = function (value, min, max) {

    // Örnek:
    // 120 → 100 olur
    // -10 → 0 olur
    // 50 → 50 kalır

    return Math.min(Math.max(value, min), max);
};

// Section id verildiğinde başlığını bulur
App.getSectionTitle = function (sectionId) {

    // Menüde o section'a ait item'ı bul
    const item = App.elements.navItems.find(
        (navItem) => navItem.dataset.target === sectionId
    );

    // Bulduysa başlığı döndür, yoksa "Bölüm" yaz
    return item ? item.textContent.trim() : "Bölüm";
};