window.App = window.App || {};

// 📌 USE CASE (KULLANIM SENARYOLARI)
// Butona göre içerik ve skorları değiştirir
App.initUseCases = function () {

    // Butonlar (gaming, laptop vs.)
    const caseButtons = document.querySelectorAll(".case-button");

    // İçerik alanları
    const caseTitle = document.getElementById("case-title");
    const caseBadge = document.getElementById("case-badge");
    const caseText = document.getElementById("case-text");

    // Skor barları
    const x86Score = document.getElementById("x86-score");
    const armScore = document.getElementById("arm-score");

    // Seçilen senaryoya göre içerik güncelle
    function updateUseCase(caseKey) {

        // data.js içindeki veriyi al
        const data = App.useCaseData[caseKey];

        // Eğer veri yoksa çık
        if (!data) {
            return;
        }

        // Aktif butonu değiştir
        caseButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.case === caseKey
            );
        });

        // Başlık güncelle
        if (caseTitle) {
            caseTitle.textContent = data.title;
        }

        // Badge (küçük etiket) güncelle
        if (caseBadge) {
            caseBadge.textContent = data.badge;
        }

        // Açıklama yazısı
        if (caseText) {
            caseText.textContent = data.text;
        }

        // x86 barını güncelle (% genişlik + yazı)
        if (x86Score) {
            x86Score.style.width = data.scores.x86 + "%";
            x86Score.textContent = data.scores.x86 + "%";
        }

        // ARM barını güncelle
        if (armScore) {
            armScore.style.width = data.scores.arm + "%";
            armScore.textContent = data.scores.arm + "%";
        }
    }

    // Butonlara tıklama olayı ekle
    caseButtons.forEach((button) => {
        button.addEventListener("click", () => {

            // Hangi butona basıldıysa onun case'ini gönder
            updateUseCase(button.dataset.case);
        });
    });

    // Sayfa açıldığında default olarak "gaming" göster
    updateUseCase("gaming");
};