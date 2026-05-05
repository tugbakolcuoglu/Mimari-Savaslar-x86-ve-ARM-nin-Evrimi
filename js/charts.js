// App objesi yoksa oluştur, varsa kullan
window.App = window.App || {};

// 📌 TEMA AYARI (DARK / LIGHT)
App.chartTheme = function () {

    // Sayfa dark modda mı kontrol et
    const dark = document.body.classList.contains("dark-mode");

    // Ona göre renkleri belirle
    return {
        text: dark ? "#e7e5e4" : "#44403c", // yazı rengi
        grid: dark ? "rgba(231, 229, 228, 0.14)" : "rgba(0, 0, 0, 0.1)", // çizgi rengi
        softGrid: dark ? "rgba(231, 229, 228, 0.10)" : "rgba(0, 0, 0, 0.05)" // daha açık çizgiler
    };
};

// 📌 CHART TEMASI UYGULAMA
App.applyChartTheme = function (chart) {

    // chart yoksa çık (hata olmasın)
    if (!chart) {
        return;
    }

    const theme = App.chartTheme(); // tema renklerini al

    // Radar chart ayarları
    if (chart.options.scales && chart.options.scales.r) {
        chart.options.scales.r.angleLines.color = theme.grid;
        chart.options.scales.r.grid.color = theme.grid;
        chart.options.scales.r.pointLabels.color = theme.text;
    }

    // X ekseni ayarları
    if (chart.options.scales && chart.options.scales.x) {
        chart.options.scales.x.ticks = chart.options.scales.x.ticks || {};
        chart.options.scales.x.ticks.color = theme.text;

        if (chart.options.scales.x.title) {
            chart.options.scales.x.title.color = theme.text;
        }
    }

    // Y ekseni ayarları
    if (chart.options.scales && chart.options.scales.y) {
        chart.options.scales.y.ticks = chart.options.scales.y.ticks || {};
        chart.options.scales.y.ticks.color = theme.text;
        chart.options.scales.y.grid.color = theme.softGrid;

        if (chart.options.scales.y.title) {
            chart.options.scales.y.title.color = theme.text;
        }
    }

    // Legend (grafik altındaki açıklamalar)
    if (chart.options.plugins && chart.options.plugins.legend) {
        chart.options.plugins.legend.labels.color = theme.text;
    }

    chart.update(); // değişiklikleri uygula
};

// 📌 TÜM CHARTLARI GÜNCELLE
App.updateAllChartThemes = function () {

    // radar ve power chart varsa tema uygula
    App.applyChartTheme(App.state.radarChartInstance);
    App.applyChartTheme(App.state.powerChartInstance);
};

// 📌 CHART OLUŞTURMA
App.renderCharts = function (sectionId) {

    // Chart.js yoksa çık
    if (typeof Chart === "undefined") {
        return;
    }

    const theme = App.chartTheme();

    // 📊 RADAR CHART
    if (sectionId === "sec-philosophy" && !App.state.radarChartInstance) {

        const radarCanvas = document.getElementById("radarChart");

        if (!radarCanvas) {
            return;
        }

        // Chart oluştur ve state içine kaydet
        App.state.radarChartInstance = new Chart(radarCanvas.getContext("2d"), {
            type: "radar",

            data: {
                labels: [
                    "Saf Performans",
                    "Enerji Verimliliği",
                    "Çip Alanı Verimi",
                    "Geriye Uyumluluk",
                    "SoC Esnekliği"
                ],
                datasets: [
                    {
                        label: "x86 / CISC",
                        data: [92, 48, 54, 98, 62],
                        backgroundColor: App.chartColors.x86Soft,
                        borderColor: App.chartColors.x86Border,
                        pointBackgroundColor: App.chartColors.x86Border
                    },
                    {
                        label: "ARM / RISC",
                        data: [78, 96, 90, 52, 95],
                        backgroundColor: App.chartColors.armSoft,
                        borderColor: App.chartColors.armBorder,
                        pointBackgroundColor: App.chartColors.armBorder
                    }
                ]
            },

            options: {
                maintainAspectRatio: false,

                scales: {
                    r: {
                        angleLines: { color: theme.grid },
                        grid: { color: theme.grid },
                        pointLabels: { color: theme.text },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                }
            }
        });
    }

    // 📈 POWER LINE CHART
    if (sectionId === "sec-power" && !App.state.powerChartInstance) {

        const powerCanvas = document.getElementById("powerLineChart");

        if (!powerCanvas) {
            return;
        }

        App.state.powerChartInstance = new Chart(powerCanvas.getContext("2d"), {
            type: "line",

            data: {
                labels: ["1W", "5W", "15W", "45W", "90W", "150W+"],
                datasets: [
                    {
                        label: "ARM performans eğrisi",
                        data: [20, 52, 76, 86, 90, 92],
                        borderColor: App.chartColors.armBorder,
                        tension: 0.4
                    },
                    {
                        label: "x86 performans eğrisi",
                        data: [6, 22, 48, 72, 96, 112],
                        borderColor: App.chartColors.x86Border,
                        tension: 0.4
                    }
                ]
            },

            options: {
                maintainAspectRatio: false,

                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Göreceli performans",
                            color: theme.text
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Güç tüketimi",
                            color: theme.text
                        }
                    }
                }
            }
        });
    }
};