window.App = window.App || {};

App.chartColors = {
    x86Border: "rgba(67, 56, 202, 1)",
    x86Soft: "rgba(67, 56, 202, 0.2)",
    armBorder: "rgba(16, 185, 129, 1)",
    armSoft: "rgba(16, 185, 129, 0.2)"
};

App.useCaseData = {
    gaming: {
        title: "Oyun bilgisayarı",
        badge: "x86 ağırlıklı",
        text: "Yüksek ekran kartı uyumluluğu, geniş oyun kütüphanesi ve masaüstü performans beklentisi nedeniyle x86 tarafı hâlâ çok güçlüdür. ARM tarafı gelişse de oyun ekosistemi x86 üzerinde daha olgundur.",
        scores: { x86: 92, arm: 58 }
    },
    laptop: {
        title: "Pil odaklı dizüstü",
        badge: "ARM avantajlı",
        text: "Sessiz çalışma, düşük ısı ve uzun pil ömrü öncelikliyse ARM tabanlı sistemler çok güçlüdür. Ancak kullanılan özel yazılımların ARM uyumluluğu kontrol edilmelidir.",
        scores: { x86: 72, arm: 90 }
    },
    mobile: {
        title: "Akıllı telefon / tablet",
        badge: "ARM baskın",
        text: "Mobil cihazlarda düşük güç tüketimi, küçük çip alanı ve SoC entegrasyonu kritik olduğu için ARM mimarisi doğal olarak öne çıkar.",
        scores: { x86: 25, arm: 98 }
    },
    server: {
        title: "Sunucu / bulut",
        badge: "Duruma bağlı",
        text: "Yüksek uyumluluk ve geleneksel kurumsal iş yüklerinde x86 çok güçlüdür. Büyük ölçekte enerji maliyeti önemliyse ARM tabanlı bulut işlemcileri avantaj sağlayabilir.",
        scores: { x86: 86, arm: 82 }
    },
    iot: {
        title: "IoT / gömülü sistem",
        badge: "ARM avantajlı",
        text: "Sensörler, küçük cihazlar ve düşük maliyetli gömülü sistemlerde enerji verimliliği ve lisanslanabilir tasarım nedeniyle ARM öne çıkar.",
        scores: { x86: 32, arm: 95 }
    },
    ai: {
        title: "Yapay zeka cihazı",
        badge: "Hızlandırıcı belirleyici",
        text: "Yapay zeka tarafında sadece CPU mimarisi değil; NPU, GPU ve bellek mimarisi belirleyicidir. Modern ARM SoC'ler yerleşik NPU ile verimli çalışabilir; x86 sistemler ise güçlü harici GPU'larla öne çıkabilir.",
        scores: { x86: 82, arm: 84 }
    }
};