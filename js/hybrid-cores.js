window.App = window.App || {};

// 📌 HYBRID CORE SİMÜLASYONU
// P-core (performans) ve E-core (verimlilik) davranışını görsel olarak gösterir
App.initHybridCores = function () {

    // P-core ve E-core kutularını al
    const pCores = document.querySelectorAll("#p-cores .core-box");
    const eCores = document.querySelectorAll("#e-cores .core-box");

    // Durum yazısı
    const statusText = document.getElementById("hybrid-status");

    // Butonlar
    const btnIdle = document.getElementById("btn-idle");
    const btnWeb = document.getElementById("btn-web");
    const btnGame = document.getElementById("btn-game");

    // Tüm çekirdekleri sıfırlar (boş / idle hale getirir)
    function resetCores() {

        pCores.forEach((core) => {
            core.classList.remove("active-p", "active-e", "soft-active", "pulse");
            core.classList.add("idle-core");
        });

        eCores.forEach((core) => {
            core.classList.remove("active-p", "active-e", "soft-active", "pulse");
            core.classList.add("idle-core");
        });
    }

    // 📌 IDLE MOD (boşta)
    if (btnIdle) {
        btnIdle.addEventListener("click", () => {

            resetCores(); // önce hepsini kapat

            // sadece 1 tane E-core çalışsın
            if (eCores[0]) {
                eCores[0].classList.remove("idle-core");
                eCores[0].classList.add("active-e");
            }

            // durum yazısını güncelle
            if (statusText) {
                statusText.textContent =
                    "Sistem Durumu: Arka plan görevleri tek bir Verimlilik çekirdeğinde. Pil korunuyor.";
            }
        });
    }

    // 📌 WEB MOD (hafif kullanım)
    if (btnWeb) {
        btnWeb.addEventListener("click", () => {

            resetCores();

            // tüm E-core'ları aktif yap
            eCores.forEach((core) => {
                core.classList.remove("idle-core");
                core.classList.add("active-e");
            });

            if (statusText) {
                statusText.textContent =
                    "Sistem Durumu: Web ve müzik gibi hafif işler E-çekirdeklerine dağıtıldı. P-çekirdekleri uykuda.";
            }
        });
    }

    // 📌 GAME MOD (yüksek performans)
    if (btnGame) {
        btnGame.addEventListener("click", () => {

            resetCores();

            // P-core'ları aktif ve animasyonlu yap
            pCores.forEach((core) => {
                core.classList.remove("idle-core");
                core.classList.add("active-p", "pulse");
            });

            // E-core'lar arka planda çalışsın
            eCores.forEach((core) => {
                core.classList.remove("idle-core");
                core.classList.add("soft-active");
            });

            if (statusText) {
                statusText.textContent =
                    "Sistem Durumu: Ana iş parçacıkları P-çekirdeklerinde, arka plan görevleri E-çekirdeklerinde.";
            }
        });
    }

    // Sayfa açıldığında hepsini idle başlat
    resetCores();
};