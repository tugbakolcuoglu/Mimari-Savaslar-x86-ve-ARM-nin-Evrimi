window.App = window.App || {};

// 📌 THERMAL (ISI / PERFORMANS) SİMÜLATÖRÜ
// Slider ile güç arttıkça sıcaklık ve performans değişimini gösterir
App.initThermalSimulator = function () {

    // HTML elementleri
    const powerSlider = document.getElementById("power-slider"); // slider (Watt)
    const powerValue = document.getElementById("power-value"); // W değeri yazısı
    const temperatureFill = document.getElementById("temperature-fill"); // sıcaklık barı
    const performanceFill = document.getElementById("performance-fill"); // performans barı
    const thermalNote = document.getElementById("thermal-note"); // açıklama yazısı

    // Slider değiştikçe çalışan fonksiyon
    function updateThermalSimulator() {

        // Slider yoksa çık
        if (!powerSlider) {
            return;
        }

        // Slider değerini al (Watt)
        const watt = Number(powerSlider.value);

        // 📌 SICAKLIK HESABI
        // Güç arttıkça sıcaklık artar
        // 95W üstünde ekstra hızlı artar
        const temperature = App.clamp(
            28 + watt * 0.42 + (watt > 95 ? (watt - 95) * 0.18 : 0),
            28,
            96
        );

        // 📌 PERFORMANS HESABI
        // 95W'a kadar artar
        // sonra ısınmadan dolayı düşmeye başlar
        const performance = watt <= 95
            ? App.clamp(22 + watt * 0.78, 22, 96)
            : App.clamp(96 - (watt - 95) * 0.22, 72, 96);

        // Watt değerini ekrana yaz
        if (powerValue) {
            powerValue.textContent = watt + "W";
        }

        // Sıcaklık barını güncelle
        if (temperatureFill) {
            temperatureFill.style.width = temperature + "%";
        }

        // Performans barını güncelle
        if (performanceFill) {
            performanceFill.style.width = performance + "%";
        }

        // 📌 AÇIKLAMA METNİ
        if (thermalNote) {

            if (watt < 20) {
                // düşük güç
                thermalNote.textContent =
                    "Düşük güç: Sessiz, serin ve pil dostu çalışma.";
            }

            else if (watt < 95) {
                // dengeli kullanım
                thermalNote.textContent =
                    "Dengeli bölge: Performans artıyor, soğutma normal.";
            }

            else {
                // aşırı güç
                thermalNote.textContent =
                    "Aşırı güç: Isı artar, performans düşebilir (throttling).";
            }
        }
    }

    // Slider varsa dinle
    if (powerSlider) {

        // Slider oynadıkça çalış
        powerSlider.addEventListener("input", updateThermalSimulator);

        // Sayfa açılınca da çalıştır
        updateThermalSimulator();
    }
};