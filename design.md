# BESTARI NUSA DESIGN SYSTEM SPECIFICATION
## SPESIFIKASI DENTITAS VISUAL, PALETTE WARNA, DAN GAUNG DESAIN

Dokumen ini mendokumentasikan panduan identitas visual, tipografi, palet warna, dan aturan komponen antarmuka (UI/UX) untuk website **Bestari Nusa**. Desain ini dirancang dengan gaya **Premium Modern Editorial** dan **Organic Minimalist**, yang mencerminkan kredensial riset profesional sekaligus kepedulian lapangan yang humanis.

---

## 1. PALET WARNA (BRANDING IDENTITY)
Palet warna di bawah ini disesuaikan sepenuhnya berdasarkan warna logo resmi **Bestari Nusa Foundation** (Turquoise Teal).

```
   [ Teal Primary ]       [ Teal Dark ]        [ Teal Soft ]        [ Slate Dark ]
      #088E92               #045B5D              #E6F4F5              #152728
    (Main Brand)       (Deep Contrast)        (Backgrounds)         (Text Main)
```

### A. Tema Terang (Light Mode)
*   **Background (Latar Utama)**: `#FCFDFD` (Putih kebiruan yang bersih dan steril).
*   **Foreground (Teks Utama)**: `#152728` (Abu-abu gelap kebiruan dengan kontras tinggi untuk keterbacaan artikel ilmiah).
*   **Primary (Warna Utama)**: `#088E92` (Teal logo resmi Bestari Nusa).
*   **Primary Dark (Kontras Warna)**: `#045B5D` (Teal gelap untuk hover dan teks aktif).
*   **Primary Soft (Aksen Lembut)**: `#E6F4F5` (Warna latar kartu, tombol sekunder, dan sorotan).
*   **Cream/Sand (Aksen Netral)**: `#F0F7F7` (Warna netral lembut untuk pembagi elemen).
*   **Border (Garis Tepi)**: `rgba(8, 142, 146, 0.16)` (Garis tipis transparan berbasis warna Teal).

### B. Tema Gelap (Dark Mode)
*   **Background (Latar Utama)**: `#091213` (Teal-hitam malam yang elegan dan mewah).
*   **Foreground (Teks Utama)**: `#E7ECEC` (Abu-abu terang kebiruan untuk kenyamanan mata saat membaca malam hari).
*   **Primary**: `#00AFB4` (Teal terang yang bercahaya di latar gelap).
*   **Primary Dark**: `#088E92` (Teal logo asli sebagai warna sekunder di mode gelap).
*   **Primary Soft**: `#112325` (Latar belakang gelap kehijauan/kebiruan untuk elemen kartu transparan).
*   **Card / Glass Surface**: `rgba(15, 30, 32, 0.74)` (Efek kaca transparan di atas visual Matcha Orb).

---

## 2. SISTEM TIPOGRAFI
Tipografi website memadukan gaya tulisan sans-serif modern berkelas tinggi untuk menonjolkan aspek data riset akademis dan gerakan ramah lingkungan.

*   **Font Utama (Body & System)**: `Plus Jakarta Sans` (Sans-serif dinamis dengan lekukan modern dan bersih).
*   **Font Judul (Heading)**: `Outfit` atau `Plus Jakarta Sans ExtraBold` (Tebal, tegas, memberikan kesan profesional dan berani).
*   **Font Kode / Data Metrik (Monospace)**: `JetBrains Mono` atau `Fira Code` (Digunakan untuk tanggal rilis, metrik statistik, dan slug).

---

## 3. BAHASA VISUAL & ANIMASI (VISUAL LANGUAGE)
Untuk memberikan kesan premium dan interaktif bagi pengunjung kelas atas (perusahaan CSR & lembaga donor):

1.  **3D Matcha Orb Particle (Hero Section)**:
    *   Menggunakan visualisasi partikel interaktif berwarna Teal di latar belakang beranda yang merespon gerakan kursor mouse pengunjung.
    *   Melambangkan koneksi data ilmiah dan keselarasan alam (ekosistem lestari).
2.  **Efek Kaca Melayang (Glassmorphism)**:
    *   Seluruh modul kartu program, berita, dan dialog popup menggunakan latar belakang transparan dengan efek `backdrop-filter: blur(20px)` dan bayangan lembut (`box-shadow`).
3.  **Micro-Animations**:
    *   **Float**: Animasi melayang naik-turun halus pada kartu informasi program.
    *   **Pulse Glow**: Efek pendaran cahaya redup pada badge status database dan tombol aksi penting.
    *   **Smooth Hover Transition**: Durasi transisi hover diseragamkan sebesar `transition: all 0.3s ease` untuk kelancaran visual.

---

## 4. PEDOMAN KOMPONEN (UI COMPONENTS)

*   **Tombol Utama (Primary Button)**: Berwarna Teal solid (`bg-primary`), teks kontras tinggi, sudut membulat lebar (`rounded-xl`), dengan transisi pembesaran skala mikro saat disentuh kursor (`hover:scale-[1.02]`).
*   **Bilah Pencarian (Search Input)**: Desain minimalis tanpa border tegas, berlatar belakang transparan, memiliki ikon pencarian di sebelah kiri, dan memanjang penuh saat fokus.
*   **Status Badges (Papan Status)**:
    *   `Published` / `Ongoing`: Latar hijau teal transparan dengan teks teal pekat.
    *   `Draft` / `Upcoming`: Latar kuning keemasan transparan dengan teks jingga pekat.
    *   `Archived`: Latar abu-abu transparan dengan teks abu-abu gelap.
