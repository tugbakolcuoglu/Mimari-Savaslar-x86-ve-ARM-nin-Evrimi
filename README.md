# 🧠 Modern CPU Architectures: x86 vs ARM Interactive Report

Bu proje, x86 ve ARM işlemci mimarilerini **karşılaştırmalı ve interaktif bir şekilde anlatan** bir web uygulamasıdır.

Amaç, karmaşık sistem mimarisi kavramlarını **görsel, anlaşılır ve kullanıcı etkileşimli** hale getirmektir.

---

## 🎯 Projenin Amacı

- x86 (CISC) ve ARM (RISC) mimarilerini açıklamak
- Performans vs enerji verimliliği farkını göstermek
- Kullanıcıya **deneyimleyerek öğrenme** imkanı sunmak
- Teknik konuları sadeleştirerek anlatmak

---

## 🚀 Özellikler

### 📊 1. İnteraktif Grafikler
- Radar chart (mimari karşılaştırma)
- Line chart (güç vs performans)
- Dark / Light tema uyumlu

---

### 🧭 2. Section Navigation Sistemi
- Sidebar ve mobil navigation
- Progress bar
- Smooth scroll
- Section bazlı içerik yönetimi

---

### 🧠 3. Instruction Simulator
- Komutların nasıl işlendiğini adım adım gösterir
- x86 vs ARM farkını görselleştirir

---

### 🔥 4. Thermal Simulator
- Watt değerine göre:
  - sıcaklık
  - performans
- Gerçekçi throttle davranışı simülasyonu

---

### ⚙️ 5. Hybrid Core Simülasyonu
- P-core (performans) ve E-core (verimlilik)
- Farklı senaryolar:
  - Idle
  - Web
  - Gaming

---

### 🧩 6. Use Case Sistemi
- Senaryoya göre öneri:
  - Gaming
  - Laptop
  - Mobile
  - Server
- Dinamik skor barları

---

### 📚 7. Kavram Sözlüğü (Glossary)
- Arama destekli
- Genişletilebilir yapı
- Teknik terimlerin sade açıklaması

---

### 📝 8. Quiz Sistemi
- Kullanıcıya uygun mimariyi önerir
- Cevaplara göre analiz yapar

---

### 🎥 9. Presentation Mode
- Klavye ile gezinti
- Sunum modu
- Eğitim / demo için ideal

---

### 🌙 10. Tema Sistemi
- Dark / Light mode
- LocalStorage ile kaydetme
- Chart uyumlu renk sistemi

---

## 🧱 Teknik Yapı

### 🔹 Vanilla JavaScript (Framework yok)
- Modüler yapı (`App` namespace)
- Global state yönetimi
- Event-driven sistem

### 🔹 Modüler Dosya Yapısı
