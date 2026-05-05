window.App = window.App || {};

// 📌 QUIZ SİSTEMİ
App.initQuiz = function () {

    // Quiz formu ve sonuç alanı
    const quizForm = document.getElementById("arch-quiz");
    const quizResult = document.getElementById("quiz-result");

    // Form varsa çalıştır
    if (quizForm) {

        // Form gönderildiğinde (submit)
        quizForm.addEventListener("submit", (event) => {

            event.preventDefault(); // sayfanın yenilenmesini engelle

            // Formdaki cevapları al
            const formData = new FormData(quizForm);

            // Tüm cevapları array'e çevir
            const values = Array.from(formData.values());

            // Eğer tüm sorular cevaplanmadıysa
            if (values.length < 5) {

                if (quizResult) {
                    quizResult.className = "quiz-result warning"; // sarı uyarı
                    quizResult.textContent =
                        "Sonucu görmek için tüm soruları işaretle.";
                }

                return; // işlemi durdur
            }

            // Cevapları say (kaç tane x86, arm vs.)
            const scores = values.reduce((accumulator, value) => {

                // Örn: accumulator["x86"]++
                accumulator[value] = (accumulator[value] || 0) + 1;

                return accumulator;

            }, { x86: 0, arm: 0, balanced: 0 });

            // Sonuç başlık ve açıklaması
            let resultTitle;
            let resultText;

            // x86 daha baskınsa
            if (scores.x86 > scores.arm && scores.x86 >= scores.balanced) {

                resultTitle = "x86 tarafı sana daha yakın.";
                resultText =
                    "Yüksek performans ve geniş uyumluluk senin için önemli.";

            }
            // ARM daha baskınsa
            else if (scores.arm > scores.x86 && scores.arm >= scores.balanced) {

                resultTitle = "ARM tarafı sana daha yakın.";
                resultText =
                    "Düşük güç tüketimi ve uzun pil ömrü senin için önemli.";

            }
            // Ortadaysa (balanced)
            else {

                resultTitle = "Hibrit ve dengeli yaklaşım daha uygun.";
                resultText =
                    "Tek bir mimari yerine kullanım senaryosu daha önemli.";

            }

            // Sonucu ekrana yaz
            if (quizResult) {

                quizResult.className = "quiz-result success"; // yeşil sonuç

                // HTML olarak yaz (başlık + açıklama)
                quizResult.innerHTML =
                    `<strong>${resultTitle}</strong><span>${resultText}</span>`;
            }
        });
    }
};