# 🎓 Sistem Informasi Sekolah - Frontend (Admin Panel)

![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge&logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite)
![Pinia](https://img.shields.io/badge/Pinia-F6D365?style=for-the-badge&logo=vue.js)

Admin Panel untuk Sistem Informasi Sekolah yang dibangun menggunakan ekosistem pengembangan web modern. Proyek ini merupakan *Single Page Application* (SPA) yang dirancang untuk memberikan pengalaman pengguna (UX) yang cepat, reaktif, dan aman.

Pencapaian utama dari arsitektur proyek ini adalah implementasi **REST API Level 3 (HATEOAS)**. Antarmuka tidak melakukan *hardcode* terhadap URL endpoint, melainkan disetir sepenuhnya oleh tautan (*hypermedia links*) yang dikirimkan secara dinamis oleh backend Laravel.

## ✨ Fitur Utama

* **🔐 Autentikasi Aman:** Sistem *login* berbasis JWT (JSON Web Token) dengan manajemen sesi terpusat menggunakan Pinia.
* **📊 Dashboard Interaktif:** Ringkasan statistik *real-time*, jadwal hari ini, dan visualisasi demografi siswa.
* **👥 Manajemen Akun (Role-Based):** Kelola hak akses pengguna (Admin/Guru) dengan antarmuka formulir yang beradaptasi secara dinamis.
* **👨‍🏫 Manajemen Guru & Siswa:** Fitur CRUD lengkap dengan tata letak *split-view* untuk profil detail.
* **🏫 Manajemen Akademik:** Pengelolaan data Kelas, Mata Pelajaran, dan penyusunan Jadwal terintegrasi.
* **🚀 Smart UI/UX:** Dilengkapi dengan sistem paginasi, pencarian dinamis, penanganan *error* form spesifik (422), dan proteksi rute navigasi (*Navigation Guards*).

## 🛠️ Teknologi yang Digunakan

* **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **State Management:** [Pinia](https://pinia.vuejs.org/)
* **Routing:** [Vue Router](https://router.vuejs.org/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **Icons:** [Heroicons](https://heroicons.com/)

## ⚙️ Prasyarat Sistem

Pastikan sistem Anda telah memasang perangkat lunak berikut sebelum memulai:
* Node.js (Versi 18+ direkomendasikan)
* NPM atau Yarn
* [Backend API Sistem Sekolah (Laravel)](https://github.com/RizalHaryaputra/school-api) sudah berjalan.