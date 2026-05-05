window.App = window.App || {};

// 📌 TEMA SİSTEMİ (DARK / LIGHT)
App.initTheme = function () {

    // Tema değiştirme butonlarını bul
    const themeButtons = document.querySelectorAll("[data-theme-toggle]");

    // Temayı değiştiren fonksiyon
    function setTheme(isDark) {

        // body'ye class ekle/çıkar (CSS buraya göre çalışır)
        document.body.classList.toggle("dark-mode", isDark);

        // Buton yazısını değiştir
        themeButtons.forEach((button) => {
            button.textContent = isDark ? "☀️ Açık Tema" : "🌙 Koyu Tema";
        });

        // Seçilen temayı tarayıcıya kaydet (sayfa yenilenince aynı kalsın)
        try {
            localStorage.setItem(
                "architecture-report-theme",
                isDark ? "dark" : "light"
            );
        } catch (error) {
            // localStorage kapalıysa hata vermesin diye boş bırakıldı
        }

        // Tema değişince grafiklerin rengini de güncelle
        App.updateAllChartThemes();
    }

    // Butona tıklanınca tema değiştir
    themeButtons.forEach((button) => {
        button.addEventListener("click", () => {

            // Mevcut tema neyse tersine çevir
            setTheme(!document.body.classList.contains("dark-mode"));
        });
    });

    // Sayfa açıldığında önceki temayı yükle
    try {
        setTheme(localStorage.getItem("architecture-report-theme") === "dark");
    } catch (error) {
        setTheme(false); // hata olursa default açık tema
    }
};

// 📌 SUNUM MODU
App.initPresentationMode = function () {

    // Sunum modu butonlarını bul
    const presentationButtons = document.querySelectorAll("[data-presentation-toggle]");

    // Sunum modunu aç/kapat
    function setPresentationMode(enabled) {

        // body'ye class ekle (CSS değişir)
        document.body.classList.toggle("presentation-mode", enabled);

        // Buton yazısını değiştir
        presentationButtons.forEach((button) => {
            button.textContent = enabled ? "↩ Normal Mod" : "⛶ Sunum Modu";
        });
    }

    // Butona tıklanınca sunum modunu aç/kapat
    presentationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setPresentationMode(!document.body.classList.contains("presentation-mode"));
        });
    });

    // Klavye ile kontrol (sunum modundayken çalışır)
    document.addEventListener("keydown", (event) => {

        // Eğer sunum modunda değilsek hiçbir şey yapma
        if (!document.body.classList.contains("presentation-mode")) {
            return;
        }

        // Sağ ok / PageDown / boşluk → ileri git
        if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
            event.preventDefault(); // sayfanın scroll etmesini engelle
            App.goToRelativeSection(1); // bir sonraki section
        }

        // Sol ok / PageUp → geri git
        if (event.key === "ArrowLeft" || event.key === "PageUp") {
            event.preventDefault();
            App.goToRelativeSection(-1); // bir önceki section
        }

        // ESC → sunum modundan çık
        if (event.key === "Escape") {
            setPresentationMode(false);
        }
    });
};