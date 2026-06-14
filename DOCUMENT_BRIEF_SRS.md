# Document Brief & System Requirement Specification (SRS)
## Proyek Website Profil & CMS Portal Bestari Nusa

---

## Bagian 1: Project Document Brief (Kebutuhan Bisnis & Konten)

### 1. Informasi Umum Proyek
* **Nama Proyek / Lembaga**: Bestari Nusa (Berdaya Lestari Nusantara)
* **Penanggung Jawab (Stakeholder) \***: [ Nama Penanggung Jawab Klien ]
* **Target Rilis Website \***: [ Target Tanggal Rilis, Contoh: Juli 2026 ]

### 2. Tujuan & Target Audiens
* **Tujuan Utama Website \***: Sebagai media profil profesional lembaga untuk membangun kredibilitas (trust), mempublikasikan kajian riset/berita secara editorial, memamerkan program kerja sosial-lingkungan, dan sebagai pintu masuk pengajuan kolaborasi (inbox kemitraan).
* **Target Pengunjung Utama \***:
  1. Instansi Donor / Lembaga CSR Perusahaan (Potensi Sponsor)
  2. Akademisi, Peneliti, dan Mahasiswa (Pembaca publikasi riset)
  3. Relawan (Volunteers) & Masyarakat Umum

### 3. Kebutuhan Konten Website (Sisi Pengunjung/User)
*Mohon jabarkan informasi spesifik yang ingin ditampilkan pada bagian-bagian berikut:*

* **Hero Section (Bagian Paling Atas Website)**:
  * **Headline/Slogan Utama**: *"Mengubah Riset Menjadi Aksi, Aksi Menjadi Dampak"*
  * **Sub-headline / Deskripsi Singkat**: *"Kolaborasi multipihak untuk mewujudkan ekosistem nusantara yang berdaya, lestari, dan berkeadilan melalui aksi nyata berbasis data."*
  * **Aset Visual**: Menggunakan visual interaktif 3D Matcha Orb (Partikel hijau interaktif) dengan fallback desain elegan yang responsif.

* **Profil / Tentang Kami**:
  * **Deskripsi Singkat \***: 
    Bestari Nusa (Berdaya Lestari Nusantara) adalah organisasi non-profit yang bergerak di bidang pemberdayaan masyarakat, kelestarian lingkungan, dan kajian riset pembangunan. Didirikan atas dasar kepedulian terhadap kesenjangan antara kebijakan pembangunan dengan realitas sosial di lapangan, kami memadukan kekuatan riset berbasis data ilmiah dengan eksekusi aksi pemberdayaan yang partisipatif di tingkat tapak.
  * **Visi \***: 
    *"Menjadi pelopor kolaborasi pengetahuan dan aksi nyata demi terciptanya masyarakat nusantara yang mandiri, berdaya, serta ekosistem lingkungan yang lestari bagi generasi masa depan."*
  * **Misi \***:
    1. Menyelenggarakan kajian dan penelitian mendalam mengenai isu sosial, lingkungan, dan ekonomi lokal berbasis data lapangan yang valid.
    2. Merancang dan mengeksekusi program pemberdayaan masyarakat yang partisipatif dan berkelanjutan.
    3. Memfasilitasi kolaborasi strategis antara pemerintah, sektor swasta (CSR), akademisi, dan komunitas lokal.
    4. Mengedukasi publik mengenai isu keberlanjutan melalui konten publikasi ilmiah populer dan cerita aksi lapangan.

* **Quotes & Sambutan Singkat Direktur Utama Bestari Nusa**:
  * **Sambutan Direktur \***: 
    *"Pembangunan yang lestari tidak pernah lahir dari asumsi di atas kertas, melainkan dari kedalaman data riset dan empati yang tumbuh langsung di tengah-tengah masyarakat."*
    — **[ Nama Direktur Utama Bestari Nusa ]**, Direktur Utama Yayasan Bestari Nusa.

* **Infografis & Data Statistik (Impact Metrics)**:
  * **Data Utama yang Ingin Ditampilkan \***:
    * Total Penerima Manfaat: [ Isi Angka, Contoh: 1,200+ Jiwa ]
    * Program Terlaksana: [ Isi Angka, Contoh: 15+ Inisiatif ]
    * Publikasi Riset: [ Isi Angka, Contoh: 8 Dokumen Kajian ]
    * Wilayah Binaan: [ Isi Angka, Contoh: 5 Desa/Kecamatan ]

* **Kategori Program Kerja (Inisiatif)**:
  * *Community Development* (Pemberdayaan Ekonomi & Sosial Masyarakat)
  * *Environmental Action* (Konservasi Lingkungan & Pengelolaan Sampah/Limbah)
  * *Research & Capacity Building* (Kajian Riset & Pelatihan Pemuda)

* **Kontak & Lokasi**:
  * **Alamat Lengkap Kantor \***: [ Isi Alamat Sekretariat / Kantor Utama ]
  * **Nomor WhatsApp/Telepon \***: [ Isi Nomor Kontak Resmi, Contoh: +62 812-xxxx-xxxx ]
  * **Email Resmi \***: [ Isi Alamat Email, Contoh: admin@bestarinusa.org ]
  * **Tautan Media Sosial \***:
    * Instagram: [@bestarinusa]
    * LinkedIn: [Bestari Nusa / Berdaya Lestari Nusantara]
    * Twitter/X: [@bestarinusa]

### 4. Preferensi Desain & Branding
* **Warna Dominan/Identitas \***: Matcha Green (Hijau Matcha segar), Cream/Sand (Krem pasir hangat), dan Dark Forest Green (Hijau Hutan Gelap untuk teks dan kontras editorial).
* **Gaya Visual**: Premium Clean, Modern Editorial (seperti majalah sains/sosial modern), Organic Minimalist, dan didukung Efek Glassmorphism (kartu transparan yang melayang di atas latar belakang halus).

---

## Bagian 2: System Requirement Specification (Kebutuhan Sistem & Fitur)

### 1. Kebutuhan Fungsional (Functional Requirements)

#### A. Modul Pengunjung / User (Publik)
*Fokus: Halaman-halaman publik yang dapat diakses oleh siapa saja di internet:*
* `[x]` **Halaman Beranda (Homepage)**: Menampilkan visual 3D Orb, highlight misi utama, 3 kartu program teratas, 3 artikel berita terpopuler, dan marquee berjalan logo partner pendukung.
* `[x]` **Halaman Tentang Kami (About)**: Menampilkan sejarah pembentukan, nilai inti (Kebenaran Data, Empati Lapangan, Aksi Berkelanjutan), visi misi lengkap, dan sambutan Direktur.
* `[x]` **Halaman Program Kerja**:
  * Menampilkan galeri seluruh program kerja yang aktif.
  * Fitur penyaringan (filter) instan berdasarkan kategori program.
  * Halaman detail program (`/programs/[slug]`) yang menampilkan tujuan terperinci, indikator dampak (*metrics*), wilayah pelaksanaan, dan tombol CTA pendaftaran/kontak kolaborasi.
* `[x]` **Halaman Kajian & Cerita (Blog/Berita)**:
  * Menampilkan artikel riset dan kabar aksi lapangan.
  * Fitur bilah pencarian kata kunci artikel secara real-time.
  * Halaman baca artikel (`/news/[slug]`) dengan pembacaan berbasis Markdown yang nyaman dibaca di segala ukuran layar.
* `[x]` **Halaman Tim Pengurus**: Menampilkan jajaran kepengurusan yang dikelompokkan secara rapi berdasarkan divisi masing-masing (eksekutif, riset, operasional).
* `[x]` **Formulir Kontak**: Formulir kolaborasi bagi publik untuk mengirimkan nama, email, perwakilan instansi, kategori kepentingan, serta pesan teks yang langsung tervalidasi dan tersimpan ke basis data.

#### B. Modul Administrator (Admin Panel CMS)
*Fokus: Halaman panel administrasi yang diproteksi autentikasi keamanan:*
* `[x]` **Otentikasi Login & Session**: Login aman dengan validasi email & sandi. Pengguna luar yang tidak masuk (unauthorized) otomatis tertolak ketika mengakses direktori `/admin/*`.
* `[x]` **Dashboard Panel**: Ringkasan data (total program, total riset, total pengurus, total pesan masuk) dan daftar ringkas pesan kontak terbaru.
* `[x]` **CMS Program Kerja**: Fitur Tambah (Create), Edit (Update), Hapus (Delete) program kerja. Mendukung pengunggahan cover program dari komputer lokal ke server awan (Supabase) dengan sekali klik.
* `[x]` **CMS Kajian & Cerita**: Fitur manajemen artikel lengkap dengan editor Markdown dan pengunggah gambar utama berita.
* `[x]` **CMS Tim Pengurus**: Fitur manajemen biodata pengurus, jabatan, divisi, dan tautan sosial media (LinkedIn, Instagram, Twitter/X).
* `[x]` **CMS Partner & Mitra**: Fitur pengurutan logo partner, kategori kemitraan, dan pengunggah file gambar logo mitra.
* `[x]` **Kotak Masuk (Inquiries Management)**: Layar pembaca seluruh pesan masuk dari formulir kontak. Admin dapat memperbarui status pesan (*New, Read, Replied, Closed*) serta menambahkan catatan internal admin untuk berkolaborasi dengan sesama tim.

### 2. Kebutuhan Non-Fungsional (Non-Functional Requirements)
* **Aksesibilitas (Responsive Web)**: Struktur layout dinamis yang menyesuaikan layar monitor desktop, tablet, hingga smartphone terkecil.
* **Performa**: Waktu pemuatan halaman sangat cepat (< 2.5 detik) berkat optimasi static pre-rendering Next.js App Router.
* **Kemudahan Operasional (File Upload)**: Client/admin tidak perlu menyalin URL gambar secara manual dari pihak ketiga. Sistem menyediakan tombol "Pilih File" untuk mengonversi gambar langsung ke Cloud Storage (Supabase) atau format Base64 secara instan.
* **Keamanan**: Akses Admin CMS terproteksi oleh Supabase Auth / Middleware Route Protection.

### 3. Infrastruktur & Hosting
* **Nama Domain**: `bestarinusa.org` / `bestarinusa.id`
* **Layanan Cloud**: Supabase (Database postgres, Authentication, & Storage) dan Vercel/Netlify (Hosting static/dynamic files).
