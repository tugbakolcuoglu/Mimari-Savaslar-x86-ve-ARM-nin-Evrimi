// App objesi yoksa oluştur, varsa kullan
window.App = window.App || {};

// 📌 PROGRESS BAR GÜNCELLEME
App.updateProgress = function (sectionId) {

    const total = App.elements.sections.length; // toplam section sayısı

    // index negatif olmasın diye güvenli hale getiriyoruz
    const safeIndex = App.state.currentSectionIndex >= 0
        ? App.state.currentSectionIndex
        : 0;

    // yüzde hesaplama (progress bar için)
    const percent = ((safeIndex + 1) / total) * 100;

    // progress bar genişliğini ayarla
    if (App.elements.progressFill) {
        App.elements.progressFill.style.width = percent + "%";
    }

    // üstteki "Bölüm 1/5" yazısını güncelle
    if (App.elements.sectionCounter) {
        App.elements.sectionCounter.textContent =
            `Bölüm ${safeIndex + 1}/${total}: ${App.getSectionTitle(sectionId)}`;
    }
};

// 📌 SECTION DEĞİŞTİRME (ANA FONKSİYON)
App.showSection = function (targetId) {

    // Açılacak section'ı bul
    const targetSection = document.getElementById(targetId);

    // Yoksa çık (hata olmasın diye)
    if (!targetSection) {
        return;
    }

    // Tüm section'lardan active class'ını kaldır
    App.elements.sections.forEach((section) => {
        section.classList.remove("active-section");
    });

    // Seçilen section'ı aktif yap
    targetSection.classList.add("active-section");

    // Menüde aktif itemı değiştir
    App.elements.navItems.forEach((item) => {
        item.classList.toggle("active", item.dataset.target === targetId);
    });

    // Mobil dropdown varsa onu da güncelle
    if (App.elements.mobileNav && App.elements.mobileNav.value !== targetId) {
        App.elements.mobileNav.value = targetId;
    }

    // Şu anki section indexini güncelle
    App.state.currentSectionIndex =
        App.elements.sections.findIndex((section) => section.id === targetId);

    // Progress bar güncelle
    App.updateProgress(targetId);

    // O section'a ait chart varsa çiz
    App.renderCharts(targetId);

    // İçerik alanını yukarı kaydır (smooth scroll)
    if (App.elements.mainContent) {
        App.elements.mainContent.scrollTo({ top: 0, behavior: "smooth" });
    }
};

// 📌 İLERİ / GERİ GEÇİŞ
App.goToRelativeSection = function (delta) {

    // yeni index hesapla (ör: +1 ileri, -1 geri)
    const nextIndex = App.clamp(
        App.state.currentSectionIndex + delta,
        0,
        App.elements.sections.length - 1
    );

    // yeni section'a git
    App.showSection(App.elements.sections[nextIndex].id);
};

// 📌 NAV EVENTLERİ
App.initNavigation = function () {

    // Menü itemlarına click event ekle
    App.elements.navItems.forEach((item) => {
        item.addEventListener("click", () => {
            App.showSection(item.dataset.target); // tıklanan section'a git
        });
    });

    // Mobil dropdown değişince section değiştir
    if (App.elements.mobileNav) {
        App.elements.mobileNav.addEventListener("change", (event) => {
            App.showSection(event.target.value);
        });
    }
};