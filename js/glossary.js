window.App = window.App || {};

// 📌 GLOSSARY (ARAMA / FİLTRE)
App.initGlossary = function () {

    // Arama inputu
    const glossarySearch = document.getElementById("glossary-search");

    // Tüm kavram kartları
    const glossaryCards = document.querySelectorAll(".glossary-card");

    // Kaç sonuç bulunduğunu gösteren yazı
    const glossaryCount = document.getElementById("glossary-count");

    // Filtreleme fonksiyonu
    function filterGlossary() {

        // Kullanıcının yazdığı metni al (küçük harfe çevir)
        const query = glossarySearch
            ? glossarySearch.value.trim().toLowerCase()
            : "";

        let visibleCount = 0; // kaç tane kart görünüyor

        glossaryCards.forEach((card) => {

            // Kartın içindeki tüm yazıları + ekstra keywordleri al
            const haystack = (
                card.textContent + " " + (card.dataset.keywords || "")
            ).toLowerCase();

            // Aranan kelime bu kartta var mı?
            const visible = haystack.includes(query);

            // Varsa göster, yoksa gizle
            card.style.display = visible ? "block" : "none";

            // Görünüyorsa sayacı artır
            if (visible) {
                visibleCount += 1;
            }
        });

        // "X kavram gösteriliyor" yazısını güncelle
        if (glossaryCount) {
            glossaryCount.textContent = visibleCount + " kavram gösteriliyor";
        }
    }

    // Input varsa yazdıkça filtreleme yap
    if (glossarySearch) {
        glossarySearch.addEventListener("input", filterGlossary);

        // Sayfa açılınca da ilk filtreyi çalıştır
        filterGlossary();
    }
};