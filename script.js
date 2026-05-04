document.addEventListener("DOMContentLoaded", () => {
    const navItems = Array.from(document.querySelectorAll(".nav-item"));
    const sections = Array.from(document.querySelectorAll(".content-section"));
    const mobileNav = document.getElementById("mobile-nav");
    const progressFill = document.getElementById("progress-fill");
    const sectionCounter = document.getElementById("section-counter");
    const mainContent = document.getElementById("main-content");

    let currentSectionIndex = 0;
    let radarChartInstance = null;
    let powerChartInstance = null;
    let instructionStep = 1;

    const chartColors = {
        x86Border: "rgba(67, 56, 202, 1)",
        x86Soft: "rgba(67, 56, 202, 0.2)",
        armBorder: "rgba(16, 185, 129, 1)",
        armSoft: "rgba(16, 185, 129, 0.2)"
    };

    const useCaseData = {
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

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function getSectionTitle(sectionId) {
        const item = navItems.find((navItem) => navItem.dataset.target === sectionId);
        return item ? item.textContent.trim() : "Bölüm";
    }

    function showSection(targetId) {
        const targetSection = document.getElementById(targetId);

        if (!targetSection) {
            return;
        }

        sections.forEach((section) => {
            section.classList.remove("active-section");
        });

        targetSection.classList.add("active-section");

        navItems.forEach((item) => {
            item.classList.toggle("active", item.dataset.target === targetId);
        });

        if (mobileNav && mobileNav.value !== targetId) {
            mobileNav.value = targetId;
        }

        currentSectionIndex = sections.findIndex((section) => section.id === targetId);
        updateProgress(targetId);
        renderCharts(targetId);

        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function updateProgress(sectionId) {
        const total = sections.length;
        const safeIndex = currentSectionIndex >= 0 ? currentSectionIndex : 0;
        const percent = ((safeIndex + 1) / total) * 100;

        if (progressFill) {
            progressFill.style.width = percent + "%";
        }

        if (sectionCounter) {
            sectionCounter.textContent = `Bölüm ${safeIndex + 1}/${total}: ${getSectionTitle(sectionId)}`;
        }
    }

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            showSection(item.dataset.target);
        });
    });

    if (mobileNav) {
        mobileNav.addEventListener("change", (event) => {
            showSection(event.target.value);
        });
    }

    function chartTheme() {
        const dark = document.body.classList.contains("dark-mode");

        return {
            text: dark ? "#e7e5e4" : "#44403c",
            grid: dark ? "rgba(231, 229, 228, 0.14)" : "rgba(0, 0, 0, 0.1)",
            softGrid: dark ? "rgba(231, 229, 228, 0.10)" : "rgba(0, 0, 0, 0.05)"
        };
    }

    function applyChartTheme(chart) {
        if (!chart) {
            return;
        }

        const theme = chartTheme();

        if (chart.options.scales && chart.options.scales.r) {
            chart.options.scales.r.angleLines.color = theme.grid;
            chart.options.scales.r.grid.color = theme.grid;
            chart.options.scales.r.pointLabels.color = theme.text;
        }

        if (chart.options.scales && chart.options.scales.x) {
            chart.options.scales.x.ticks = chart.options.scales.x.ticks || {};
            chart.options.scales.x.ticks.color = theme.text;

            if (chart.options.scales.x.title) {
                chart.options.scales.x.title.color = theme.text;
            }
        }

        if (chart.options.scales && chart.options.scales.y) {
            chart.options.scales.y.ticks = chart.options.scales.y.ticks || {};
            chart.options.scales.y.ticks.color = theme.text;
            chart.options.scales.y.grid.color = theme.softGrid;

            if (chart.options.scales.y.title) {
                chart.options.scales.y.title.color = theme.text;
            }
        }

        if (chart.options.plugins && chart.options.plugins.legend) {
            chart.options.plugins.legend.labels.color = theme.text;
        }

        chart.update();
    }

    function updateAllChartThemes() {
        applyChartTheme(radarChartInstance);
        applyChartTheme(powerChartInstance);
    }

    function renderCharts(sectionId) {
        if (typeof Chart === "undefined") {
            return;
        }

        const theme = chartTheme();

        if (sectionId === "sec-philosophy" && !radarChartInstance) {
            const radarCanvas = document.getElementById("radarChart");

            if (!radarCanvas) {
                return;
            }

            radarChartInstance = new Chart(radarCanvas.getContext("2d"), {
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
                            backgroundColor: chartColors.x86Soft,
                            borderColor: chartColors.x86Border,
                            pointBackgroundColor: chartColors.x86Border,
                            pointHoverBackgroundColor: "#ffffff",
                            pointHoverBorderColor: chartColors.x86Border
                        },
                        {
                            label: "ARM / RISC",
                            data: [78, 96, 90, 52, 95],
                            backgroundColor: chartColors.armSoft,
                            borderColor: chartColors.armBorder,
                            pointBackgroundColor: chartColors.armBorder,
                            pointHoverBackgroundColor: "#ffffff",
                            pointHoverBorderColor: chartColors.armBorder
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: theme.grid },
                            grid: { color: theme.grid },
                            pointLabels: {
                                color: theme.text,
                                font: { family: "Inter", size: 12 }
                            },
                            ticks: { display: false, min: 0, max: 100 }
                        }
                    },
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                color: theme.text,
                                font: { family: "Inter" }
                            }
                        }
                    }
                }
            });
        }

        if (sectionId === "sec-power" && !powerChartInstance) {
            const powerCanvas = document.getElementById("powerLineChart");

            if (!powerCanvas) {
                return;
            }

            powerChartInstance = new Chart(powerCanvas.getContext("2d"), {
                type: "line",
                data: {
                    labels: ["1W", "5W", "15W", "45W", "90W", "150W+"],
                    datasets: [
                        {
                            label: "ARM performans eğrisi",
                            data: [20, 52, 76, 86, 90, 92],
                            borderColor: chartColors.armBorder,
                            backgroundColor: chartColors.armBorder,
                            tension: 0.4,
                            fill: false,
                            borderWidth: 3
                        },
                        {
                            label: "x86 performans eğrisi",
                            data: [6, 22, 48, 72, 96, 112],
                            borderColor: chartColors.x86Border,
                            backgroundColor: chartColors.x86Border,
                            tension: 0.4,
                            fill: false,
                            borderWidth: 3
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
                                color: theme.text,
                                font: { family: "Inter" }
                            },
                            ticks: { color: theme.text },
                            grid: { color: theme.softGrid }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Güç tüketimi",
                                color: theme.text,
                                font: { family: "Inter" }
                            },
                            ticks: { color: theme.text },
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                color: theme.text,
                                font: { family: "Inter" }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return context.dataset.label + ": " + context.parsed.y + " birim";
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    const themeButtons = document.querySelectorAll("[data-theme-toggle]");

    function setTheme(isDark) {
        document.body.classList.toggle("dark-mode", isDark);

        themeButtons.forEach((button) => {
            button.textContent = isDark ? "☀️ Açık Tema" : "🌙 Koyu Tema";
        });

        try {
            localStorage.setItem("architecture-report-theme", isDark ? "dark" : "light");
        } catch (error) {
            // localStorage kapalıysa sessizce devam et.
        }

        updateAllChartThemes();
    }

    themeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setTheme(!document.body.classList.contains("dark-mode"));
        });
    });

    try {
        setTheme(localStorage.getItem("architecture-report-theme") === "dark");
    } catch (error) {
        setTheme(false);
    }

    const presentationButtons = document.querySelectorAll("[data-presentation-toggle]");

    function setPresentationMode(enabled) {
        document.body.classList.toggle("presentation-mode", enabled);

        presentationButtons.forEach((button) => {
            button.textContent = enabled ? "↩ Normal Mod" : "⛶ Sunum Modu";
        });
    }

    presentationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setPresentationMode(!document.body.classList.contains("presentation-mode"));
        });
    });

    function goToRelativeSection(delta) {
        const nextIndex = clamp(currentSectionIndex + delta, 0, sections.length - 1);
        showSection(sections[nextIndex].id);
    }

    document.addEventListener("keydown", (event) => {
        if (!document.body.classList.contains("presentation-mode")) {
            return;
        }

        if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
            event.preventDefault();
            goToRelativeSection(1);
        }

        if (event.key === "ArrowLeft" || event.key === "PageUp") {
            event.preventDefault();
            goToRelativeSection(-1);
        }

        if (event.key === "Escape") {
            setPresentationMode(false);
        }
    });

    const timelineItems = document.querySelectorAll(".timeline-item");
    const timelineTitle = document.getElementById("timeline-title");
    const timelineText = document.getElementById("timeline-text");

    timelineItems.forEach((item) => {
        item.addEventListener("click", () => {
            timelineItems.forEach((timelineItem) => timelineItem.classList.remove("active"));
            item.classList.add("active");

            if (timelineTitle) {
                timelineTitle.textContent = item.dataset.title;
            }

            if (timelineText) {
                timelineText.textContent = item.dataset.detail;
            }
        });
    });

    const instructionSteps = document.querySelectorAll(".instruction-step");
    const instructionStatus = document.getElementById("instruction-status");
    const instructionNext = document.getElementById("instruction-next");
    const instructionPrev = document.getElementById("instruction-prev");
    const instructionReset = document.getElementById("instruction-reset");
    const instructionTotal = 4;

    function updateInstructionSimulator() {
        instructionSteps.forEach((step) => {
            const stepNumber = Number(step.dataset.step);
            step.classList.toggle("active", stepNumber <= instructionStep);
            step.classList.toggle("current", stepNumber === instructionStep);
        });

        if (instructionStatus) {
            instructionStatus.textContent = `Adım ${instructionStep}/${instructionTotal}: Aynı işlem iki mimaride farklı seviyelerde parçalanıyor.`;
        }
    }

    if (instructionNext) {
        instructionNext.addEventListener("click", () => {
            instructionStep = clamp(instructionStep + 1, 1, instructionTotal);
            updateInstructionSimulator();
        });
    }

    if (instructionPrev) {
        instructionPrev.addEventListener("click", () => {
            instructionStep = clamp(instructionStep - 1, 1, instructionTotal);
            updateInstructionSimulator();
        });
    }

    if (instructionReset) {
        instructionReset.addEventListener("click", () => {
            instructionStep = 1;
            updateInstructionSimulator();
        });
    }

    updateInstructionSimulator();

    const powerSlider = document.getElementById("power-slider");
    const powerValue = document.getElementById("power-value");
    const temperatureFill = document.getElementById("temperature-fill");
    const performanceFill = document.getElementById("performance-fill");
    const thermalNote = document.getElementById("thermal-note");

    function updateThermalSimulator() {
        if (!powerSlider) {
            return;
        }

        const watt = Number(powerSlider.value);
        const temperature = clamp(28 + watt * 0.42 + (watt > 95 ? (watt - 95) * 0.18 : 0), 28, 96);
        const performance = watt <= 95
            ? clamp(22 + watt * 0.78, 22, 96)
            : clamp(96 - (watt - 95) * 0.22, 72, 96);

        if (powerValue) {
            powerValue.textContent = watt + "W";
        }

        if (temperatureFill) {
            temperatureFill.style.width = temperature + "%";
        }

        if (performanceFill) {
            performanceFill.style.width = performance + "%";
        }

        if (thermalNote) {
            if (watt < 20) {
                thermalNote.textContent = "Düşük güç: Sessiz, serin ve pil dostu çalışma. Mobil cihaz mantığına yakın.";
            } else if (watt < 95) {
                thermalNote.textContent = "Dengeli bölge: Performans artıyor, soğutma ihtiyacı yönetilebilir seviyede.";
            } else {
                thermalNote.textContent = "Aşırı güç: Isı artışı nedeniyle soğutma kritikleşir; uzun yükte thermal throttling riski oluşur.";
            }
        }
    }

    if (powerSlider) {
        powerSlider.addEventListener("input", updateThermalSimulator);
        updateThermalSimulator();
    }

    const caseButtons = document.querySelectorAll(".case-button");
    const caseTitle = document.getElementById("case-title");
    const caseBadge = document.getElementById("case-badge");
    const caseText = document.getElementById("case-text");
    const x86Score = document.getElementById("x86-score");
    const armScore = document.getElementById("arm-score");

    function updateUseCase(caseKey) {
        const data = useCaseData[caseKey];

        if (!data) {
            return;
        }

        caseButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.case === caseKey);
        });

        if (caseTitle) {
            caseTitle.textContent = data.title;
        }

        if (caseBadge) {
            caseBadge.textContent = data.badge;
        }

        if (caseText) {
            caseText.textContent = data.text;
        }

        if (x86Score) {
            x86Score.style.width = data.scores.x86 + "%";
            x86Score.textContent = data.scores.x86 + "%";
        }

        if (armScore) {
            armScore.style.width = data.scores.arm + "%";
            armScore.textContent = data.scores.arm + "%";
        }
    }

    caseButtons.forEach((button) => {
        button.addEventListener("click", () => {
            updateUseCase(button.dataset.case);
        });
    });

    updateUseCase("gaming");

    const pCores = document.querySelectorAll("#p-cores .core-box");
    const eCores = document.querySelectorAll("#e-cores .core-box");
    const statusText = document.getElementById("hybrid-status");
    const btnIdle = document.getElementById("btn-idle");
    const btnWeb = document.getElementById("btn-web");
    const btnGame = document.getElementById("btn-game");

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

    if (btnIdle) {
        btnIdle.addEventListener("click", () => {
            resetCores();

            if (eCores[0]) {
                eCores[0].classList.remove("idle-core");
                eCores[0].classList.add("active-e");
            }

            if (statusText) {
                statusText.textContent = "Sistem Durumu: Arka plan görevleri tek bir Verimlilik çekirdeğinde. Pil korunuyor.";
            }
        });
    }

    if (btnWeb) {
        btnWeb.addEventListener("click", () => {
            resetCores();

            eCores.forEach((core) => {
                core.classList.remove("idle-core");
                core.classList.add("active-e");
            });

            if (statusText) {
                statusText.textContent = "Sistem Durumu: Web ve müzik gibi hafif işler E-çekirdeklerine dağıtıldı. P-çekirdekleri uykuda.";
            }
        });
    }

    if (btnGame) {
        btnGame.addEventListener("click", () => {
            resetCores();

            pCores.forEach((core) => {
                core.classList.remove("idle-core");
                core.classList.add("active-p", "pulse");
            });

            eCores.forEach((core) => {
                core.classList.remove("idle-core");
                core.classList.add("soft-active");
            });

            if (statusText) {
                statusText.textContent = "Sistem Durumu: Ana iş parçacıkları P-çekirdeklerinde, arka plan görevleri E-çekirdeklerinde.";
            }
        });
    }

    resetCores();

    const glossarySearch = document.getElementById("glossary-search");
    const glossaryCards = document.querySelectorAll(".glossary-card");
    const glossaryCount = document.getElementById("glossary-count");

    function filterGlossary() {
        const query = glossarySearch ? glossarySearch.value.trim().toLowerCase() : "";
        let visibleCount = 0;

        glossaryCards.forEach((card) => {
            const haystack = (card.textContent + " " + (card.dataset.keywords || "")).toLowerCase();
            const visible = haystack.includes(query);

            card.style.display = visible ? "block" : "none";

            if (visible) {
                visibleCount += 1;
            }
        });

        if (glossaryCount) {
            glossaryCount.textContent = visibleCount + " kavram gösteriliyor";
        }
    }

    if (glossarySearch) {
        glossarySearch.addEventListener("input", filterGlossary);
        filterGlossary();
    }

    const quizForm = document.getElementById("arch-quiz");
    const quizResult = document.getElementById("quiz-result");

    if (quizForm) {
        quizForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(quizForm);
            const values = Array.from(formData.values());

            if (values.length < 5) {
                if (quizResult) {
                    quizResult.className = "quiz-result warning";
                    quizResult.textContent = "Sonucu görmek için tüm soruları işaretle.";
                }

                return;
            }

            const scores = values.reduce((accumulator, value) => {
                accumulator[value] = (accumulator[value] || 0) + 1;
                return accumulator;
            }, { x86: 0, arm: 0, balanced: 0 });

            let resultTitle;
            let resultText;

            if (scores.x86 > scores.arm && scores.x86 >= scores.balanced) {
                resultTitle = "x86 tarafı sana daha yakın.";
                resultText = "Yüksek performans, geniş yazılım uyumluluğu ve geleneksel masaüstü/sunucu ekosistemi senin önceliklerin gibi görünüyor.";
            } else if (scores.arm > scores.x86 && scores.arm >= scores.balanced) {
                resultTitle = "ARM tarafı sana daha yakın.";
                resultText = "Uzun pil ömrü, düşük ısı, sessiz çalışma ve SoC verimliliği senin kullanım senaryonda daha önemli görünüyor.";
            } else {
                resultTitle = "Hibrit ve dengeli yaklaşım daha uygun.";
                resultText = "Tek bir mimari yerine cihazın yazılım uyumluluğu, güç limiti, NPU/GPU özellikleri ve kullanım alanı birlikte değerlendirilmelidir.";
            }

            if (quizResult) {
                quizResult.className = "quiz-result success";
                quizResult.innerHTML = `<strong>${resultTitle}</strong><span>${resultText}</span>`;
            }
        });
    }

    const firstTimelineItem = document.querySelector(".timeline-item");

    if (firstTimelineItem) {
        firstTimelineItem.click();
    }

    showSection("sec-intro");
});