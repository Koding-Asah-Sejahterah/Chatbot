# 🧠 Asah: Learning Buddy

> **Capstone Project A25-CS179** > *Led by Dicoding in association with Accenture*

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 About The Project

[cite_start]**Asah (Learning Buddy)** adalah *AI-powered learning companion* yang dirancang untuk merevolusi pengalaman belajar di platform Dicoding[cite: 30, 34]. Proyek ini bertujuan mengatasi masalah rendahnya tingkat *onboarding* dan motivasi pengguna dengan menyediakan asisten belajar yang personal, adaptif, dan interaktif.

[cite_start]Sistem ini tidak hanya memberikan rekomendasi kursus, tetapi mendampingi pengguna secara holistik melalui *chatbot* cerdas yang memahami *sub-skill* spesifik setiap individu[cite: 30, 32].

---

## ⚠️ Background & Problem Statement

Proyek ini dibangun untuk menjawab empat tantangan utama yang dihadapi pengguna saat ini:

| Masalah Utama | Deskripsi |
| :--- | :--- |
| **1. Penilaian Skill Tidak Akurat** | [cite_start]Sistem rekomendasi konvensional (1-layer) gagal mengidentifikasi keahlian *sub-skill* spesifik pengguna, menghasilkan penilaian yang terlalu umum[cite: 17, 28]. |
| **2. Jalur Pembelajaran Generik** | [cite_start]Kurangnya personalisasi menyebabkan *roadmap* belajar yang "satu ukuran untuk semua", yang seringkali tidak relevan dengan kebutuhan karir pengguna[cite: 16, 27]. |
| **3. Kurangnya Motivasi** | [cite_start]Tanpa *feedback* progres yang detail dan jalur yang jelas, pengguna mudah kehilangan semangat di tengah jalan[cite: 15, 29]. |
| **4. Tidak Ada Teman Belajar** | Belajar mandiri (self-paced) sering terasa sepi. [cite_start]Pengguna membutuhkan pendamping untuk bertanya dan memvalidasi progres mereka[cite: 29, 30]. |

---

## 🚀 Key Features (MVP)

### [cite_start]1. Personalized On-boarding [cite: 36]
Sistem melakukan **Skill Extraction & Assessment multi-layer**. [cite_start]Pengguna tidak hanya dinilai secara umum, tetapi diuji pada *sub-skill* spesifik untuk menghasilkan *roadmap* yang benar-benar menutup kesenjangan keahlian (*skill gap*)[cite: 39, 41].

### [cite_start]2. Personal Assistant for Learning (Chatbot) [cite: 42]
Chatbot interaktif yang mampu:
* [cite_start]Menjawab **Progress Query** (misal: "Skill apa yang berkembang minggu ini?")[cite: 44].
* [cite_start]Memberikan **Rekomendasi Kontekstual** berdasarkan materi yang sedang dipelajari[cite: 45].

### [cite_start]3. Adaptive Roadmap & Progress Tracking [cite: 46]
Roadmap dinamis yang melakukan sinkronisasi otomatis. [cite_start]Saat pengguna menyelesaikan kelas, peta belajar akan beradaptasi dan memberikan umpan balik pencapaian secara *real-time*[cite: 48, 49].

---

## 🛠️ Tech Stack

[cite_start]Proyek ini dikembangkan menggunakan teknologi berikut[cite: 76, 78]:

**Machine Learning & Data Science:**
* ![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python&logoColor=white) **Python**: Bahasa utama pemodelan.
* ![Scikit-Learn](https://img.shields.io/badge/Library-Scikit--Learn-orange?logo=scikit-learn&logoColor=white) **Scikit-Learn**: Implementasi algoritma ML.
* ![FastAPI](https://img.shields.io/badge/Framework-FastAPI-009688?logo=fastapi&logoColor=white) **FastAPI**: Serving model ML.

**Backend & Integration:**
* ![Go](https://img.shields.io/badge/Go-Golang-00ADD8?logo=go&logoColor=white) **Go-Lang**: Backend utama untuk integrasi sistem.
* ![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192?logo=postgresql&logoColor=white) **PostgreSQL**: Penyimpanan data pengguna dan roadmap.
* ![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker&logoColor=white) **Docker**: Containerization untuk deployment.

**Tools & Design:**
* **Postman**: API Testing.
* **Figma**: UI/UX Design.
* **Git**: Version Control.

---

## 👥 The Team (A25-CS179)

[cite_start]Tim hebat di balik pengembangan Asah [cite: 3, 5, 8-13]:

| ID | Nama | Role | Fokus |
| :--- | :--- | :--- | :--- |
| M183D5Y1275 | **Muhammad Firdaus Chuzaeni** | Project Lead / ML | [cite_start]Machine Learning [cite: 8, 63] |
| M183D5X1925 | **Ulfiyah R Syarbin** | ML Engineer | [cite_start]Machine Learning [cite: 11] |
| F183D5Y0415 | **Daffa' Ahmad Saifullah Mubaroki** | FE/BE Engineer | [cite_start]Front-End & Back-End AI [cite: 9] |
| F183D5Y0272 | **Arifin Ihsan Nugroho** | FE/BE Engineer | [cite_start]Front-End & Back-End AI [cite: 12] |
| F183D5Y0352 | **Bayu Firdaus** | FE/BE Engineer | [cite_start]Front-End & Back-End AI [cite: 13] |

---

## ⚙️ Installation & Setup

Ikuti langkah berikut untuk menjalankan proyek di lokal:

### Prerequisites
* Python 3.8+
* Go 1.19+
* Docker & Docker Compose

### Langkah Instalasi

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username/asah-learning-buddy.git](https://github.com/username/asah-learning-buddy.git)
    cd asah-learning-buddy
    ```

2.  **Setup Environment Variables**
    Buat file `.env` berdasarkan contoh `.env.example`.
    ```bash
    cp .env.example .env
    ```

3.  **Jalankan dengan Docker (Recommended)**
    ```bash
    docker-compose up --build
    ```

4.  **Akses Aplikasi**
    * Frontend: `http://localhost:3000`
    * API Backend: `http://localhost:8080`
    * API ML Model: `http://localhost:8000/docs`

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Created with ❤️ by Tim Capstone A25-CS179*