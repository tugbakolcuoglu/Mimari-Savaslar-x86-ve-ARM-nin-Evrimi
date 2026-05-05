window.App = window.App || {};

// 📌 TIMELINE SİSTEMİ
// Tıklanan öğeye göre başlık ve açıklama değiştirir
App.initTimeline = function () {

    // Timeline'daki tüm itemlar
    const timelineItems = document.querySelectorAll(".timeline-item");

    // Sağ tarafta gösterilen başlık ve açıklama
    const timelineTitle = document.getElementById("timeline-title");
    const timelineText = document.getElementById("timeline-text");

    // Her item'a tıklama olayı ekle
    timelineItems.forEach((item) => {
        item.addEventListener("click", () => {

            // Önce tüm itemlardan active class'ını kaldır
            timelineItems.forEach((timelineItem) =>
                timelineItem.classList.remove("active")
            );

            // Tıklanan itemı aktif yap
            item.classList.add("active");

            // Başlığı güncelle (data-title'dan alır)
            if (timelineTitle) {
                timelineTitle.textContent = item.dataset.title;
            }

            // Açıklamayı güncelle (data-detail'dan alır)
            if (timelineText) {
                timelineText.textContent = item.dataset.detail;
            }
        });
    });

    // Sayfa açıldığında ilk item otomatik seçilsin
    const firstTimelineItem = document.querySelector(".timeline-item");

    if (firstTimelineItem) {
        firstTimelineItem.click(); // ilk itemı tetikler
    }
};