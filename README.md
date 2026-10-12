# WIDURI Studio Cetak - Landing Page

Landing page modern dan responsif untuk **WIDURI Studio Cetak & Digital Production**, dilengkapi dengan kalkulator harga cetak interaktif, kalkulasi pesanan otomatis terintegrasi WhatsApp, dukungan tema Light Mode & Dark Mode, serta showcase portofolio cetak.

## ✨ Fitur Utama

- **Kalkulator Harga Cetak Realtime & Dinamis**:
  - Pilihan material: Art Paper, Art Carton, Vinyl Waterproof, HVS, Flexi Korea, dll.
  - Opsi laminasi: Doff, Glossy, atau Tanpa Laminasi.
  - Finishing: Potong Persegi, Die-Cut/Bentuk Khusus, Jilid Kawat, Spiral, Pond & Creasing.
  - Perhitungan diskon otomatis berdasarkan volume cetak (*tiering discount*).
  - Integrasi pesan langsung ke WhatsApp dengan rincian pesanan siap kirim.
- **Dark Mode & Light Mode**:
  - Tombol toggle tema yang mulus dengan persistensi preferensi di `localStorage`.
- **Infinite Moving Ticker (Running Marquee)**:
  - Banner animasi keunggulan layanan bergerak tanpa henti dari kiri ke kanan.
- **Filter Showcase Portofolio**:
  - Filter kategori dinamis (Semua, Kemasan & Stiker, Media Promosi, Undangan & Souvenir).
- **Floating WhatsApp Button**:
  - Akses cepat untuk konsultasi dan order via WhatsApp di pojok kanan bawah.
- **Desain Modern & Responsif**:
  - Dibangun dengan Tailwind CSS, Font JetBrains Mono, dan Plus Jakarta Sans.

## 🚀 Demo / GitHub Pages

Akses website secara langsung melalui GitHub Pages:
[https://muhammad-valdhano.github.io/widuri-printing/](https://muhammad-valdhano.github.io/widuri-printing/)

## 📂 Struktur Proyek

```text
widuri-printing/
├── assets/
│   ├── css/
│   │   └── style.css          # Kustomisasi animasi, typography & tema
│   ├── images/                # Asset gambar showcase & hero
│   └── js/
│       └── app.js             # Logika kalkulator harga, tema & interaktivitas
├── index.html                 # Halaman utama landing page
├── .gitignore
└── README.md
```

## 🛠️ Menjalankan Secara Lokal

Cukup buka `index.html` langsung di browser Anda atau gunakan local server:

```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan npx serve
npx serve .
```

Buka `http://localhost:8000` pada browser pilihan Anda.
