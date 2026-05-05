window.App = window.App || {};

// 📌 INSTRUCTION SIMULATOR
// Bu kısım adım adım ilerleyen simülasyonu yönetir
App.initInstructionSimulator = function () {

    // Simülasyondaki adım kutularını seç
    const instructionSteps = document.querySelectorAll(".instruction-step");

    // Altta/üstte görünen durum yazısı
    const instructionStatus = document.getElementById("instruction-status");

    // İleri, geri ve sıfırla butonları
    const instructionNext = document.getElementById("instruction-next");
    const instructionPrev = document.getElementById("instruction-prev");
    const instructionReset = document.getElementById("instruction-reset");

    // Toplam adım sayısı
    const instructionTotal = 4;

    // Ekrandaki adımları günceller
    function updateInstructionSimulator() {

        instructionSteps.forEach((step) => {

            // HTML'deki data-step değerini sayıya çevir
            const stepNumber = Number(step.dataset.step);

            // Geçilen adımları aktif yap
            step.classList.toggle(
                "active",
                stepNumber <= App.state.instructionStep
            );

            // Şu anki adımı ayrıca işaretle
            step.classList.toggle(
                "current",
                stepNumber === App.state.instructionStep
            );
        });

        // Durum yazısını güncelle
        if (instructionStatus) {
            instructionStatus.textContent =
                `Adım ${App.state.instructionStep}/${instructionTotal}: Aynı işlem iki mimaride farklı seviyelerde parçalanıyor.`;
        }
    }

    // İleri butonu varsa tıklama olayı ekle
    if (instructionNext) {
        instructionNext.addEventListener("click", () => {

            // Adımı 1 artır ama toplam adımı geçmesin
            App.state.instructionStep = App.clamp(
                App.state.instructionStep + 1,
                1,
                instructionTotal
            );

            updateInstructionSimulator();
        });
    }

    // Geri butonu varsa tıklama olayı ekle
    if (instructionPrev) {
        instructionPrev.addEventListener("click", () => {

            // Adımı 1 azalt ama 1'in altına düşmesin
            App.state.instructionStep = App.clamp(
                App.state.instructionStep - 1,
                1,
                instructionTotal
            );

            updateInstructionSimulator();
        });
    }

    // Sıfırla butonu varsa tıklama olayı ekle
    if (instructionReset) {
        instructionReset.addEventListener("click", () => {

            // En başa dön
            App.state.instructionStep = 1;

            updateInstructionSimulator();
        });
    }

    // Sayfa ilk açıldığında simülasyonu hazırla
    updateInstructionSimulator();
};