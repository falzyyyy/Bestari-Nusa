# Paket Dokumentasi Website Company Profile Bestari Nusa

Tanggal: 2026-06-14  
Versi: 1.0  
Project: Website Company Profile + Admin CMS untuk **Bestari Nusa / Berdaya Lestari Nusantara**

Dokumentasi ini disiapkan sebagai panduan lengkap untuk membangun website company profile Bestari Nusa dengan arah visual **minimalist, professional, interaktif, matcha-cream-white**, memiliki **dark mode / light mode**, **3D assets**, **animasi loading**, serta **admin CMS** untuk mengelola berita, program, struktur anggota, mitra, dan konten website.

## Daftar File

1. `01_PRD_BESTARI_NUSA_COMPANY_PROFILE.md`  
   Dokumen Product Requirements Document utama, mencakup tujuan produk, target pengguna, fitur, scope, user story, acceptance criteria, dan roadmap.

2. `02_UX_UI_DESIGN_GUIDELINES.md`  
   Panduan visual, warna, tipografi, layout, animasi, navbar non-mainstream, loading screen, 3D assets, dan referensi style minimalis interaktif.

3. `03_INFORMATION_ARCHITECTURE_CONTENT.md`  
   Sitemap, struktur halaman, arsitektur informasi, contoh copywriting, section homepage, halaman program, news, team, dan contact.

4. `04_CMS_ADMIN_REQUIREMENTS.md`  
   Requirement lengkap untuk admin CMS: role, permission, workflow editorial, manajemen berita, program, anggota, mitra, media, SEO, form, dan audit log.

5. `05_TECHNICAL_ARCHITECTURE.md`  
   Rekomendasi stack teknis, arsitektur frontend-backend, folder structure, integrasi Supabase, deployment, SEO, security, performance, dan accessibility.

6. `06_SUPABASE_DATABASE_SCHEMA.md`  
   Rancangan database Supabase lengkap dengan tabel, field, relasi, enum, RLS concept, dan contoh SQL schema.

7. `07_IMPLEMENTATION_PLAN.md`  
   Tahapan pengerjaan dari setup project, UI, CMS, database, integrasi, testing, deployment, sampai handover.

8. `08_AI_IDE_MASTER_PROMPT.md`  
   Prompt siap pakai untuk dicopas ke Cursor, Windsurf, Lovable, Bolt, v0, atau platform IDE AI lainnya.

9. `09_COMPONENT_SPECIFICATION.md`  
   Spesifikasi komponen UI utama: navbar, hero, impact cards, program cards, news cards, team cards, 3D scene, dark mode toggle, dan admin dashboard.

## Catatan Arah Brand

Bestari Nusa diposisikan sebagai komunitas/foundation yang bergerak pada:
- Pengembangan SDM muda.
- Advokasi sosial dan pengembangan pemuda pasca-kampus.
- Riset sosial dan aksi masyarakat.
- Community development.
- Keberlanjutan lingkungan dan sosial.
- Kolaborasi program berdampak, CSR, dan pemberdayaan masyarakat.

## Catatan Referensi

Inspirasi dari website Zenless Zone Zero hanya digunakan pada level pola visual seperti motion, loading, layered layout, depth, dan interaktivitas. Jangan menggunakan logo, artwork, model 3D, karakter, musik, atau aset milik HoYoverse/Zenless Zone Zero.

## Rekomendasi Stack Singkat

- Frontend: Next.js 15, TypeScript, Tailwind CSS, Framer Motion.
- Backend/CMS: Supabase Auth, PostgreSQL, Supabase Storage, Row Level Security.
- UI Component: shadcn/ui atau custom component.
- Animasi Scroll: Lenis + Framer Motion.
- 3D: React Three Fiber / Drei atau Spline Embed.
- Deployment: Vercel + Supabase.



---


# PRD — Website Company Profile Bestari Nusa

Tanggal: 2026-06-14  
Versi: 1.0  
Owner: Bestari Nusa / Berdaya Lestari Nusantara  
Prepared for: Development Team / AI IDE Implementation

---

## 1. Ringkasan Produk

Website ini adalah platform company profile digital untuk **Bestari Nusa**, sebuah komunitas/foundation yang berfokus pada pengembangan SDM muda, riset sosial, pemberdayaan masyarakat, community development, advokasi sosial, serta keberlanjutan lingkungan dan sosial.

Website harus menampilkan identitas Bestari Nusa secara **professional, modern, interaktif, minimalist**, dan tetap hangat. Website tidak hanya berfungsi sebagai halaman informasi statis, tetapi juga sebagai pusat konten yang dapat diperbarui melalui **Admin CMS**, misalnya untuk berita, program, struktur anggota, mitra, dokumentasi kegiatan, publikasi riset, dan informasi kolaborasi.

Arah visual utama menggunakan kombinasi:
- Hijau matcha.
- Cream.
- Putih.
- Dark forest untuk dark mode.
- Aksen soft glow, glassmorphism halus, dan 3D assets bertema riset, komunitas, keberlanjutan, dan nusantara.

---

## 2. Latar Belakang

Bestari Nusa memiliki positioning sebagai wadah generasi muda untuk menciptakan peluang berdampak sosial. Fokus utama yang harus tergambar di website:

1. **Pengembangan Pemuda & Advokasi Sosial**  
   Menyediakan ruang pembelajaran, pelatihan, pengembangan kapasitas, dan advokasi berbasis isu sosial.

2. **Riset & Aksi Masyarakat**  
   Menghubungkan riset sosial dengan aksi nyata melalui social mapping, community development, dan program berbasis data.

3. **Keberlanjutan Lingkungan & Sosial**  
   Menginisiasi program bermakna bagi masyarakat, tidak hanya berorientasi pada keuntungan finansial, tetapi juga dampak jangka panjang.

4. **Kolaborasi & Pemberdayaan**  
   Menjadi jembatan antara pemuda, komunitas, institusi, mitra CSR, dan masyarakat.

---

## 3. Tujuan Produk

### 3.1 Tujuan Utama

- Membangun website company profile yang mampu menjelaskan identitas, fokus, program, dampak, dan kredibilitas Bestari Nusa.
- Menyediakan CMS agar tim internal dapat memperbarui konten tanpa perlu menyentuh kode.
- Menampilkan konten program dan berita secara rapi, searchable, dan mudah diakses.
- Meningkatkan kepercayaan mitra, calon kolaborator, sponsor, komunitas, peserta program, dan publik.
- Menjadi media dokumentasi resmi untuk kegiatan, publikasi, dan struktur organisasi.

### 3.2 Tujuan Desain

- Minimalist tetapi tetap interaktif.
- Professional tetapi tidak kaku.
- Memiliki sentuhan 3D assets dan motion yang smooth.
- Memiliki light mode dan dark mode.
- Navbar tidak terlalu mainstream.
- Memiliki loading animation yang berkarakter.
- Mengambil inspirasi energi visual website ZZZ/HoYoverse pada aspek motion dan visual depth, tetapi dibuat lebih soft, clean, dan sesuai identitas sosial Bestari Nusa.

---

## 4. Non-Goals

Website ini tidak diarahkan untuk:

- Menjadi aplikasi donasi penuh dengan payment gateway pada fase MVP.
- Menjadi LMS penuh seperti platform course.
- Menjadi social media internal.
- Meniru aset visual, karakter, logo, atau style proprietary dari game/brand lain.
- Membuat CMS yang terlalu kompleks seperti enterprise ERP pada fase awal.

---

## 5. Target Pengguna

### 5.1 Pengunjung Publik

Orang yang ingin mengenal Bestari Nusa, melihat program, membaca berita, dan memahami dampak sosialnya.

Kebutuhan:
- Informasi cepat dan jelas.
- Navigasi mudah.
- Desain terpercaya.
- Akses mobile friendly.
- Kontak atau CTA kolaborasi.

### 5.2 Calon Mitra / CSR / Institusi

Perusahaan, kampus, pemerintah, NGO, atau komunitas yang ingin menjalin kerja sama.

Kebutuhan:
- Profil kredibel.
- Rekam jejak program.
- Dampak yang terukur.
- Informasi kontak jelas.
- Dokumen atau proposal kolaborasi.

### 5.3 Peserta Program / Relawan

Generasi muda yang tertarik mengikuti program seperti akademi, pelatihan, riset sosial, atau kegiatan community development.

Kebutuhan:
- Informasi program.
- Jadwal kegiatan.
- Form pendaftaran atau CTA.
- Dokumentasi kegiatan sebelumnya.

### 5.4 Admin / Tim Internal

Tim Bestari Nusa yang mengelola konten website.

Kebutuhan:
- Login aman.
- CRUD konten.
- Preview sebelum publish.
- Upload gambar.
- Manajemen team.
- Manajemen berita.
- Manajemen program.
- Manajemen mitra.
- Pengaturan SEO dasar.

---

## 6. Value Proposition

**Bestari Nusa hadir sebagai ruang kolaborasi generasi muda untuk mengubah riset menjadi aksi, aksi menjadi dampak, dan dampak menjadi keberlanjutan bagi Nusantara.**

Website harus mengkomunikasikan tiga nilai inti:

1. **Think** — Riset, pemetaan sosial, kajian, data.
2. **Action** — Program lapangan, community development, advokasi.
3. **Sustain** — Keberlanjutan lingkungan, sosial, dan penguatan kapasitas masyarakat.

---

## 7. Scope Fitur

## 7.1 Public Website

### A. Homepage

Section utama:

1. **Preloader / Loading Animation**
   - Animasi singkat 1–2 detik.
   - Konsep: matcha particle, seed growing, map contour, atau “social signal scanning”.
   - Menampilkan teks pendek: `Think. Act. Sustain.` atau `Bestari Nusa`.

2. **Hero Section**
   - Headline kuat.
   - Subheadline menjelaskan Bestari Nusa.
   - CTA utama: `Jelajahi Program`.
   - CTA kedua: `Ajukan Kolaborasi`.
   - 3D asset: abstract seed/globe/leaf/community network.
   - Background clean dengan gradient cream-white-matcha.
   - Micro animation pada elemen teks dan visual.

3. **About Preview**
   - Penjelasan singkat Bestari Nusa.
   - Highlight: Berdaya Lestari Nusantara.
   - Link ke halaman About.

4. **Focus Areas**
   - Pengembangan Pemuda & Advokasi Sosial.
   - Riset & Aksi Masyarakat.
   - Keberlanjutan Lingkungan & Sosial.
   - Kolaborasi & Pemberdayaan.

5. **Featured Programs**
   - Akademi BestariNusa.
   - Social Mapping.
   - Community Development.
   - CSR / Sustainability Collaboration.
   - Data diambil dari CMS.

6. **Impact Snapshot**
   - Jumlah program.
   - Jumlah peserta/relawan.
   - Jumlah mitra.
   - Jumlah wilayah dampingan.
   - Bisa dikelola di CMS.

7. **Latest News / Stories**
   - 3–6 berita terbaru.
   - Filter kategori.
   - Link ke halaman News.

8. **Team Preview**
   - Struktur inti/anggota terpilih.
   - Link ke halaman Team.

9. **Partner / Collaboration Section**
   - Logo mitra.
   - CTA kolaborasi.

10. **Footer**
   - Link cepat.
   - Kontak.
   - Email.
   - Instagram.
   - Copyright.
   - CTA kecil.

---

### B. About Page

Isi:
- Sejarah singkat.
- Visi.
- Misi.
- Nilai organisasi.
- Filosofi nama Bestari Nusa / Berdaya Lestari Nusantara.
- Timeline perjalanan.
- Legal/foundation info jika ada.
- CTA kerja sama.

---

### C. Programs Page

Fitur:
- Listing program dari CMS.
- Filter berdasarkan kategori:
  - Youth Development.
  - Social Research.
  - Community Development.
  - Sustainability.
  - CSR Collaboration.
- Detail program:
  - Judul.
  - Deskripsi.
  - Tujuan.
  - Target peserta/beneficiaries.
  - Lokasi.
  - Periode.
  - Status: upcoming, ongoing, completed.
  - Galeri.
  - Impact metrics.
  - CTA daftar/kolaborasi.

---

### D. News / Stories Page

Fitur:
- Daftar berita.
- Kategori.
- Search.
- Tag.
- Featured article.
- Pagination atau infinite scroll.
- Detail berita dengan:
  - Cover image.
  - Author.
  - Published date.
  - Reading time.
  - Share button.
  - Related posts.
  - SEO meta.

---

### E. Team / Structure Page

Fitur:
- Struktur organisasi.
- Filter berdasarkan divisi/peran.
- Card anggota:
  - Nama.
  - Posisi.
  - Divisi.
  - Foto.
  - Bio singkat.
  - LinkedIn/Instagram opsional.
- Mode tampilan:
  - Grid.
  - Organization tree.
  - Interactive structure map.

---

### F. Research / Publication Page

Opsional tetapi direkomendasikan.

Isi:
- Kajian sosial.
- Artikel riset.
- Social mapping summary.
- Download dokumen PDF.
- Policy brief.
- Report impact.

---

### G. Gallery Page

Fitur:
- Dokumentasi kegiatan.
- Filter kategori.
- Grid masonry.
- Lightbox.
- Video embed opsional.

---

### H. Contact / Collaboration Page

Fitur:
- Form kontak.
- Pilihan kebutuhan:
  - Kolaborasi program.
  - CSR.
  - Media partnership.
  - Relawan.
  - Pertanyaan umum.
- Informasi kontak.
- Map opsional.
- Social media link.
- Auto-save inquiry ke CMS.

---

## 7.2 Admin CMS

Fitur CMS wajib:

1. Authentication.
2. Role-based access control.
3. Dashboard overview.
4. CRUD News.
5. CRUD Programs.
6. CRUD Team Members.
7. CRUD Divisions.
8. CRUD Partners.
9. CRUD Testimonials.
10. CRUD Impact Metrics.
11. Media Library.
12. Page Settings.
13. SEO Management.
14. Inquiry Management.
15. Draft/Publish workflow.
16. Scheduled publishing.
17. Audit log.
18. Site settings:
    - Logo.
    - Social media.
    - Contact info.
    - Theme default.
    - Footer text.

---

## 8. User Stories

### Visitor

- Sebagai pengunjung, saya ingin memahami Bestari Nusa dalam waktu kurang dari 30 detik agar saya tahu fokus dan dampaknya.
- Sebagai calon peserta, saya ingin melihat program yang sedang berjalan agar bisa mendaftar.
- Sebagai calon mitra, saya ingin melihat rekam jejak dan dampak program agar yakin untuk berkolaborasi.
- Sebagai pembaca, saya ingin mencari berita berdasarkan kategori agar mudah menemukan konten relevan.
- Sebagai pengguna mobile, saya ingin website tetap smooth dan ringan agar nyaman dibuka dari smartphone.

### Admin

- Sebagai admin, saya ingin membuat berita baru dengan cover image agar konten terbaru bisa dipublikasikan.
- Sebagai editor, saya ingin menyimpan konten sebagai draft agar bisa direview sebelum publish.
- Sebagai admin, saya ingin memperbarui struktur anggota agar website selalu relevan.
- Sebagai admin, saya ingin melihat daftar pesan masuk agar bisa menindaklanjuti calon mitra.
- Sebagai super admin, saya ingin mengatur role user agar akses CMS tetap aman.

---

## 9. Functional Requirements

### 9.1 Public Site

| Kode | Requirement | Priority |
|---|---|---|
| FE-001 | Website memiliki homepage dengan hero, about, focus area, program, impact, news, team, partner, dan footer | Must |
| FE-002 | Website mendukung dark mode dan light mode | Must |
| FE-003 | Navbar memiliki desain floating/non-mainstream dan responsive | Must |
| FE-004 | Website memiliki loading animation | Must |
| FE-005 | Website menggunakan animasi transisi section | Must |
| FE-006 | Website dapat menampilkan 3D asset di hero atau section impact | Should |
| FE-007 | News dapat difilter berdasarkan kategori/tag | Must |
| FE-008 | Program dapat difilter berdasarkan kategori/status | Must |
| FE-009 | Contact form menyimpan data ke database | Must |
| FE-010 | Semua halaman responsive mobile/tablet/desktop | Must |
| FE-011 | SEO meta tersedia untuk halaman utama dan detail | Must |
| FE-012 | Website memiliki fallback jika 3D asset gagal dimuat | Should |

### 9.2 CMS

| Kode | Requirement | Priority |
|---|---|---|
| CMS-001 | Admin dapat login/logout | Must |
| CMS-002 | Admin dapat membuat, mengedit, menghapus, dan publish berita | Must |
| CMS-003 | Admin dapat membuat, mengedit, menghapus program | Must |
| CMS-004 | Admin dapat mengelola team member dan struktur divisi | Must |
| CMS-005 | Admin dapat upload gambar ke media library | Must |
| CMS-006 | Admin dapat mengatur SEO title, description, dan OG image | Must |
| CMS-007 | Admin dapat melihat pesan dari contact form | Must |
| CMS-008 | CMS mendukung draft, review, publish, archived | Should |
| CMS-009 | CMS memiliki audit log | Should |
| CMS-010 | CMS memiliki scheduled publishing | Could |

---

## 10. Non-Functional Requirements

### Performance

- LCP homepage < 2.5 detik pada koneksi 4G standar.
- 3D asset harus lazy-loaded.
- Image menggunakan next/image.
- News listing menggunakan pagination.
- Bundle size dijaga dengan dynamic import untuk komponen berat.

### Accessibility

- Kontras warna minimal WCAG AA.
- Keyboard navigation untuk navbar dan CMS.
- Alt text untuk gambar.
- ARIA label untuk button interaktif.
- Reduced motion mode untuk pengguna yang sensitif terhadap animasi.

### Security

- Supabase Row Level Security wajib aktif.
- Admin route dilindungi middleware.
- File upload dibatasi tipe dan ukuran.
- Form dilindungi rate limiting.
- Input disanitasi.
- Role-based permission diterapkan.

### SEO

- Metadata per halaman.
- Slug SEO-friendly.
- Sitemap.xml.
- Robots.txt.
- Open Graph image.
- Structured data untuk Organization dan Article.

---

## 11. Sitemap

```txt
/
├── /about
├── /programs
│   └── /programs/[slug]
├── /news
│   └── /news/[slug]
├── /team
├── /research
├── /gallery
├── /contact
└── /admin
    ├── /admin/dashboard
    ├── /admin/news
    ├── /admin/programs
    ├── /admin/team
    ├── /admin/partners
    ├── /admin/impact
    ├── /admin/media
    ├── /admin/inquiries
    ├── /admin/site-settings
    └── /admin/users
```

---

## 12. Content Models Ringkas

### News

- id
- title
- slug
- excerpt
- content
- cover_image_url
- category_id
- author_id
- status
- published_at
- seo_title
- seo_description

### Program

- id
- title
- slug
- summary
- description
- category
- status
- location
- start_date
- end_date
- impact_summary
- cover_image_url
- registration_url
- collaboration_cta

### Team Member

- id
- name
- position
- division_id
- photo_url
- bio
- order_index
- social_links
- is_featured
- is_active

### Impact Metric

- id
- label
- value
- suffix
- description
- icon
- order_index
- is_active

---

## 13. MVP Scope

### MVP wajib selesai

- Homepage.
- About page.
- Programs page + detail.
- News page + detail.
- Team page.
- Contact page.
- Admin login.
- CRUD News.
- CRUD Programs.
- CRUD Team Members.
- CRUD Impact Metrics.
- Upload media.
- Dark/light mode.
- SEO dasar.
- Deployment.

### MVP opsional

- Research/publication page.
- Scheduled publishing.
- Organization tree interactive.
- Advanced analytics.
- Newsletter subscription.

---

## 14. Acceptance Criteria

Website dianggap selesai MVP jika:

- Semua halaman public dapat diakses tanpa error.
- Admin dapat login dan mengelola berita, program, team, dan impact metric.
- Data yang dibuat di CMS langsung muncul di public website.
- Website responsive pada mobile, tablet, dan desktop.
- Dark mode dan light mode berjalan konsisten.
- Loading animation muncul dan tidak mengganggu UX.
- 3D asset tampil dengan fallback.
- Contact form tersimpan di database.
- SEO metadata tampil untuk homepage dan artikel.
- Tidak ada route admin yang dapat diakses tanpa login.
- RLS Supabase aktif.
- Build production berhasil di Vercel.

---

## 15. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| 3D asset membuat website berat | Performance turun | Lazy load, kompres asset, fallback static |
| CMS terlalu kompleks di awal | Development lama | Prioritaskan MVP CRUD inti |
| Konten belum lengkap | Website terasa kosong | Gunakan placeholder profesional dan CMS-ready |
| Role admin rentan salah akses | Security risk | Terapkan RBAC dan RLS |
| Animasi berlebihan | UX terganggu | Gunakan motion halus dan reduced motion support |
| Desain terlalu mirip referensi ZZZ | Risiko brand/IP | Gunakan hanya prinsip motion, bukan aset/style proprietary |

---

## 16. Roadmap Singkat

### Phase 1 — Foundation
Setup project, design system, database schema, auth, layout utama.

### Phase 2 — Public Website
Homepage, about, programs, news, team, contact.

### Phase 3 — CMS
Dashboard, CRUD module, media upload, role management.

### Phase 4 — Polish
Animation, 3D asset, SEO, performance, accessibility, QA.

### Phase 5 — Launch & Handover
Deploy, dokumentasi admin, training, maintenance plan.

---

## 17. Definition of Done

- Code sudah rapi dan typed dengan TypeScript.
- UI sesuai design guideline.
- CMS dapat digunakan non-teknis.
- Database migration terdokumentasi.
- Semua environment variable terdokumentasi.
- Tidak ada console error di production.
- Dokumentasi penggunaan admin tersedia.
- Handover file dan akses selesai.



---


# UX/UI Design Guidelines — Bestari Nusa Company Profile

Versi: 1.0  
Tema: Minimalist Interactive Matcha Social Impact

---

## 1. Design Direction

Website Bestari Nusa harus terasa:

- Minimalist.
- Professional.
- Calm but impactful.
- Youthful but credible.
- Interactive but not overwhelming.
- Warm, human, and sustainability-driven.
- Memiliki depth visual melalui 3D assets, layered card, dan animasi halus.

Keyword desain:

```txt
Matcha · Cream · Clean · Social Impact · Research · Community · Sustainability · Youthful · Professional · Interactive
```

---

## 2. Visual Concept

Nama konsep visual:

# Matcha Civic Futurism

Makna:
- **Matcha**: natural, calm, sustainable.
- **Civic**: community, youth, social advocacy.
- **Futurism**: digital, research-driven, modern.
- **Minimalism**: professional, on-point, tidak ramai.

Website boleh memiliki inspirasi dari pola interaksi website game modern seperti:
- Loading animation.
- Layered visual depth.
- Floating navigation.
- Section transition.
- Micro interaction.
- 3D centerpiece.

Namun visual harus dibuat lebih lembut, sosial, clean, dan tidak menggunakan aset copyrighted dari brand lain.

---

## 3. Color Palette

## 3.1 Light Mode

| Token | Hex | Fungsi |
|---|---|---|
| Matcha Primary | `#7A9A5E` | Button utama, highlight, icon |
| Deep Matcha | `#405C3B` | Heading, navbar active, footer |
| Soft Sage | `#DDE8D2` | Background card lembut |
| Cream | `#F7F0DD` | Background utama alternatif |
| Warm White | `#FFFDF7` | Background utama |
| Olive Gray | `#6D7566` | Body text secondary |
| Charcoal Green | `#1F2A24` | Text utama |
| Matcha Glow | `#B8D98B` | Hover glow / accent |

### CSS Variable

```css
:root {
  --background: #fffdf7;
  --foreground: #1f2a24;

  --primary: #7a9a5e;
  --primary-dark: #405c3b;
  --primary-soft: #dde8d2;

  --cream: #f7f0dd;
  --white: #ffffff;

  --muted: #6d7566;
  --border: rgba(64, 92, 59, 0.16);

  --card: rgba(255, 255, 255, 0.72);
  --glass: rgba(255, 253, 247, 0.72);
  --glow: rgba(184, 217, 139, 0.48);
}
```

---

## 3.2 Dark Mode

| Token | Hex | Fungsi |
|---|---|---|
| Dark Forest | `#0F1A14` | Background utama |
| Forest Surface | `#17231B` | Card background |
| Deep Moss | `#213327` | Section background |
| Matcha Glow | `#A7C77D` | Accent, hover |
| Soft Cream Text | `#FFF6DE` | Heading |
| Muted Cream | `#CFC7B0` | Body text |
| Dark Border | `rgba(255, 246, 222, 0.14)` | Border |

### CSS Variable

```css
.dark {
  --background: #0f1a14;
  --foreground: #fff6de;

  --primary: #a7c77d;
  --primary-dark: #7a9a5e;
  --primary-soft: #213327;

  --cream: #17231b;
  --white: #101711;

  --muted: #cfc7b0;
  --border: rgba(255, 246, 222, 0.14);

  --card: rgba(23, 35, 27, 0.74);
  --glass: rgba(23, 35, 27, 0.68);
  --glow: rgba(167, 199, 125, 0.32);
}
```

---

## 4. Typography

Rekomendasi font:

### Primary
- `Plus Jakarta Sans`
- Alternatif: `Inter`, `Poppins`

### Heading Style
- Font weight: 700–800.
- Letter spacing: -0.03em.
- Line height: 0.95–1.12.
- Heading besar boleh memakai treatment condensed look, tetapi tetap readable.

### Body Style
- Font weight: 400–500.
- Line height: 1.65–1.8.
- Maksimal lebar paragraf: 640–720px.

### Example

```css
body {
  font-family: "Plus Jakarta Sans", system-ui, sans-serif;
}

h1, h2, h3 {
  letter-spacing: -0.03em;
}
```

---

## 5. Layout Principles

### 5.1 Minimalist but Layered

Gunakan banyak whitespace, tetapi tambahkan depth melalui:
- Soft radial gradient.
- Floating cards.
- Thin border.
- Glass surface.
- Layered decorative grid.
- Animated small particles.
- 3D object yang tidak terlalu dominan.

### 5.2 Grid System

- Desktop: 12-column grid.
- Tablet: 8-column grid.
- Mobile: 4-column grid.
- Max width: 1200–1280px.
- Section padding:
  - Desktop: 96–128px vertical.
  - Tablet: 72–96px.
  - Mobile: 56–72px.

---

## 6. Navbar Non-Mainstream

Hindari navbar mainstream yang hanya horizontal biasa.

Rekomendasi:

# Floating Capsule Navigation

Karakter:
- Navbar berada di tengah atas atau sedikit offset.
- Berbentuk capsule/glassmorphism.
- Menu tidak terlalu banyak.
- Ada satu CTA kecil di kanan.
- Saat scroll, navbar mengecil dan berubah opacity.
- Menu active memakai small glowing dot atau underline animasi.
- Mobile menu muncul sebagai vertical command palette.

Struktur desktop:

```txt
[ Bestari Nusa mark ]    Home  About  Programs  Stories  Team  Contact    [Collaborate]
```

Tetapi ditampilkan dalam capsule floating dengan:
- Border tipis.
- Backdrop blur.
- Soft shadow.
- Indicator active berbentuk pill sliding.

Mobile:
- Button menu berbentuk small rounded square.
- Saat diklik, panel menu turun seperti “floating mission panel”.
- Animasi scale + opacity.
- Menu item muncul staggered.

### Navbar Interaction

- Hover menu: text bergeser 2px ke atas + dot muncul.
- Active menu: background soft sage.
- Scroll down: navbar compact.
- Scroll up: navbar full visible.
- CTA hover: matcha glow.

---

## 7. Loading Animation

Loading tidak boleh terlalu lama. Maksimal 1.5–2 detik.

Konsep yang disarankan:

## 7.1 Seed Scan Loader

Visual:
- Logo/teks Bestari Nusa.
- Garis melingkar seperti scanning.
- Partikel kecil seperti biji/daun.
- Teks berganti cepat:
  - Think
  - Action
  - Sustain
  - Bestari Nusa

## 7.2 Implementation

- Gunakan Framer Motion.
- Simpan loader hanya pada first visit per session menggunakan `sessionStorage`.
- Jika user prefers-reduced-motion, loader dibuat fade sederhana.

Pseudo flow:

```txt
Page open
→ show loader
→ animate seed particles
→ progress line 0-100
→ content reveal with clip-path/fade
```

---

## 8. 3D Assets Direction

3D asset harus mendukung identitas Bestari Nusa, bukan sekadar dekorasi.

Rekomendasi 3D:

1. **Abstract Seed Globe**
   - Globe kecil dengan grid, daun, dan titik komunitas.
   - Cocok untuk hero.

2. **Community Network Nodes**
   - Node-node 3D yang terhubung.
   - Cocok untuk section impact.

3. **Floating Research Cards**
   - Mini card 3D dengan icon chart/map/doc.
   - Cocok untuk focus area.

4. **Nusantara Contour Map**
   - Kontur/topografi abstrak.
   - Cocok untuk background about.

5. **Matcha Orb**
   - Bola hijau transparan dengan gradient.
   - Cocok untuk visual identity.

### Tools

- Spline, export embed iframe.
- React Three Fiber + Drei.
- Blender asset sendiri.
- GLTF/GLB dari aset free license, pastikan lisensi aman.

### Performance Rules

- Lazy load 3D.
- Tampilkan static fallback image.
- Jangan load 3D di mobile low-end jika berat.
- Gunakan `dynamic(() => import(...), { ssr: false })`.

---

## 9. Motion Guidelines

Motion harus:
- Smooth.
- Ringan.
- Berfungsi memberi arah.
- Tidak berlebihan.

### Animasi Utama

| Element | Animation |
|---|---|
| Hero text | stagger fade-up |
| 3D object | slow float/rotate |
| Cards | reveal on scroll |
| Navbar | shrink on scroll |
| Section transition | clip reveal / fade |
| CTA | magnetic hover |
| News card | image scale + label slide |
| Team card | tilt subtle |
| Dark mode toggle | sun-moon morph |

### Library

- Framer Motion.
- Lenis untuk smooth scroll.
- GSAP optional, hanya jika perlu.
- CSS transition untuk micro interaction.

### Timing

```txt
Fast: 150–220ms
Normal: 300–450ms
Section reveal: 600–900ms
Loader: max 2000ms
```

---

## 10. Section Design

## 10.1 Hero

Layout:
- Kiri: headline, subheadline, CTA.
- Kanan: 3D asset.
- Background: cream-white gradient.
- Tambahan: floating mini cards:
  - Social Research
  - Community Development
  - Sustainability

Headline contoh:

```txt
Mengubah Riset Menjadi Aksi,
Aksi Menjadi Dampak.
```

Subheadline:

```txt
Bestari Nusa adalah ruang kolaborasi generasi muda untuk membangun perubahan sosial melalui riset, pemberdayaan masyarakat, dan keberlanjutan.
```

CTA:
- Jelajahi Program
- Ajukan Kolaborasi

---

## 10.2 Focus Areas

Tampilan:
- 3 cards besar.
- Masing-masing card memiliki icon line/3D micro asset.
- Hover: card naik 6px, border matcha glow.
- Isi ringkas.

Cards:
1. Youth Development & Social Advocacy.
2. Social Research & Community Action.
3. Sustainability & Community Empowerment.

---

## 10.3 Programs

Tampilan:
- Horizontal scroll / featured cards.
- Card berukuran besar.
- Ada tag status: Upcoming, Ongoing, Completed.
- Ada mini impact metric.

---

## 10.4 News / Stories

Tampilan:
- Featured article besar.
- 3 small cards di samping/bawah.
- Filter kategori minimalis.
- Card hover image zoom.

---

## 10.5 Team

Tampilan:
- Grid clean.
- Foto rounded rectangle.
- Role label.
- Divisi tag.
- Hover reveal bio pendek.

Opsional:
- Organization tree interactive.

---

## 10.6 Contact

Tampilan:
- Split panel.
- Kiri: CTA kolaborasi.
- Kanan: form.
- Background subtle map contour.

---

## 11. Component Style

### Button Primary

```css
.btn-primary {
  border-radius: 999px;
  background: var(--primary);
  color: white;
  box-shadow: 0 12px 32px var(--glow);
}
```

### Card

```css
.card-glass {
  background: var(--card);
  border: 1px solid var(--border);
  backdrop-filter: blur(18px);
  border-radius: 28px;
}
```

### Section Badge

```txt
[ Think & Action ]
[ Sustainability ]
[ Community Development ]
```

---

## 12. Dark Mode Behavior

- Default mengikuti system preference.
- Toggle manual tersedia.
- Setting disimpan ke localStorage.
- Semua asset harus tetap kontras.
- 3D object boleh berubah lighting atau background.

Toggle concept:
- Button kecil berbentuk capsule.
- Icon sun/moon morph.
- Saat hover: glow matcha.

---

## 13. Accessibility Notes

- Jangan hanya mengandalkan warna untuk status.
- Semua tombol harus bisa diakses keyboard.
- Card interaktif harus memiliki focus state.
- Animasi harus menghormati `prefers-reduced-motion`.
- Contrast:
  - Text utama di light mode: charcoal green.
  - Text utama di dark mode: soft cream.

---

## 14. Visual Do and Don’t

### Do

- Gunakan white space.
- Gunakan warna matcha sebagai aksen.
- Gunakan 3D asset secukupnya.
- Buat layout editorial yang rapi.
- Gunakan microcopy singkat.

### Don’t

- Jangan terlalu banyak warna.
- Jangan meniru aset ZZZ/HoYoverse.
- Jangan membuat animasi terlalu cepat.
- Jangan membuat 3D terlalu berat.
- Jangan menggunakan shadow hitam keras.
- Jangan membuat navbar terlalu penuh.

---

## 15. Design Tokens

```ts
export const designTokens = {
  colors: {
    light: {
      background: "#FFFDF7",
      foreground: "#1F2A24",
      primary: "#7A9A5E",
      primaryDark: "#405C3B",
      primarySoft: "#DDE8D2",
      cream: "#F7F0DD",
      muted: "#6D7566",
      glow: "rgba(184, 217, 139, 0.48)"
    },
    dark: {
      background: "#0F1A14",
      foreground: "#FFF6DE",
      surface: "#17231B",
      primary: "#A7C77D",
      muted: "#CFC7B0",
      glow: "rgba(167, 199, 125, 0.32)"
    }
  },
  radius: {
    sm: "12px",
    md: "20px",
    lg: "28px",
    pill: "999px"
  },
  motion: {
    fast: "180ms",
    normal: "360ms",
    slow: "720ms"
  }
}
```



---


# Information Architecture & Content Strategy — Bestari Nusa

Versi: 1.0

---

## 1. Tujuan Arsitektur Informasi

Arsitektur informasi website harus membantu pengunjung memahami:

1. Siapa Bestari Nusa.
2. Apa fokus gerakannya.
3. Program apa yang dijalankan.
4. Dampak apa yang sudah/ingin dicapai.
5. Bagaimana cara ikut, berkolaborasi, atau menghubungi tim.

Prinsip:
- Cepat dipahami.
- Tidak terlalu banyak istilah berat.
- Kredibel untuk mitra.
- Menarik untuk generasi muda.
- Mudah dikelola lewat CMS.

---

## 2. Sitemap Lengkap

```txt
/
├── About
│   ├── Profil Bestari Nusa
│   ├── Visi & Misi
│   ├── Nilai
│   └── Timeline
├── Programs
│   ├── Akademi BestariNusa
│   ├── Social Mapping
│   ├── Community Development
│   ├── Sustainability Program
│   └── CSR Collaboration
├── News / Stories
│   ├── Berita
│   ├── Cerita Dampak
│   ├── Artikel
│   └── Press Release
├── Team
│   ├── Struktur Organisasi
│   ├── Pengurus Inti
│   └── Divisi
├── Research
│   ├── Kajian Sosial
│   ├── Policy Brief
│   ├── Community Report
│   └── Download Publication
├── Gallery
│   ├── Foto Kegiatan
│   └── Video
├── Contact
│   ├── Form Kolaborasi
│   ├── Kontak Resmi
│   └── Social Media
└── Admin CMS
```

---

## 3. Struktur Homepage

## 3.1 Loading Screen

Text options:
- `Think. Act. Sustain.`
- `Berdaya. Lestari. Nusantara.`
- `Mapping impact...`
- `Growing collective action...`

Flow:
1. Logo/text Bestari Nusa muncul.
2. Particle seed bergerak.
3. Progress line.
4. Fade reveal ke hero.

---

## 3.2 Hero Section

### Headline Option 1

```txt
Mengubah Riset Menjadi Aksi,
Aksi Menjadi Dampak.
```

### Headline Option 2

```txt
Ruang Tumbuh Generasi Muda
untuk Perubahan Sosial Berkelanjutan.
```

### Headline Option 3

```txt
Berdaya untuk Masyarakat,
Lestari untuk Nusantara.
```

### Recommended Headline

```txt
Mengubah Riset Menjadi Aksi,
Aksi Menjadi Dampak.
```

### Subheadline

```txt
Bestari Nusa adalah komunitas pengembangan SDM muda yang berfokus pada riset sosial, pemberdayaan masyarakat, advokasi sosial, dan keberlanjutan untuk menciptakan peluang berdampak bagi Nusantara.
```

### CTA

Primary:
```txt
Jelajahi Program
```

Secondary:
```txt
Ajukan Kolaborasi
```

Small trust text:
```txt
Think and Action for Social Research, Community Development, and Sustainability.
```

---

## 3.3 About Preview

Title:
```txt
Tentang Bestari Nusa
```

Copy:
```txt
Bestari Nusa, Berdaya Lestari Nusantara, hadir sebagai ruang kolaborasi bagi generasi muda untuk membaca persoalan sosial secara kritis, merancang aksi berbasis riset, dan menguatkan masyarakat melalui program yang berkelanjutan.
```

Highlight points:
- Riset sosial sebagai dasar aksi.
- Pemberdayaan masyarakat sebagai arah gerak.
- Keberlanjutan sebagai komitmen.

CTA:
```txt
Pelajari Lebih Lanjut
```

---

## 3.4 Focus Areas

Section title:
```txt
Fokus Gerakan Kami
```

Subtitle:
```txt
Kami menghubungkan pengetahuan, aksi lapangan, dan kolaborasi lintas sektor untuk menciptakan dampak sosial yang terukur.
```

### Card 1

Title:
```txt
Pengembangan Pemuda & Advokasi Sosial
```

Copy:
```txt
Membekali generasi muda pasca-kampus dengan keterampilan sosial, kepemimpinan, pemetaan masalah, dan advokasi yang relevan dengan kebutuhan masyarakat.
```

### Card 2

Title:
```txt
Riset & Aksi Masyarakat
```

Copy:
```txt
Mengubah riset sosial menjadi rekomendasi dan program aksi melalui social mapping, community assessment, dan pengembangan komunitas.
```

### Card 3

Title:
```txt
Keberlanjutan Lingkungan & Sosial
```

Copy:
```txt
Mendorong program yang tidak hanya berorientasi hasil jangka pendek, tetapi memberi manfaat berkelanjutan bagi masyarakat dan lingkungan.
```

---

## 3.5 Featured Programs

Section title:
```txt
Program Unggulan
```

Subtitle:
```txt
Inisiatif yang dirancang untuk memperkuat kapasitas pemuda, komunitas, dan mitra dalam menciptakan perubahan sosial.
```

Program examples:

### Akademi BestariNusa

```txt
Program pengembangan kapasitas pemuda pasca-kampus melalui pelatihan social mapping, riset sosial, dan desain intervensi masyarakat.
```

### Social Mapping Lab

```txt
Ruang belajar dan praktik pemetaan sosial untuk memahami masalah, potensi, aktor, dan kebutuhan komunitas secara lebih terstruktur.
```

### Community Development

```txt
Pendampingan komunitas berbasis riset untuk memperkuat kapasitas lokal, ekonomi sosial, dan keberlanjutan program.
```

### CSR & Sustainability Collaboration

```txt
Kolaborasi dengan institusi dan perusahaan untuk merancang program CSR yang berdampak, terukur, dan relevan dengan kebutuhan masyarakat.
```

---

## 3.6 Impact Snapshot

Section title:
```txt
Dampak yang Terus Bertumbuh
```

Microcopy:
```txt
Setiap angka merepresentasikan proses belajar, kolaborasi, dan aksi yang tumbuh bersama masyarakat.
```

Metric examples:
- `10+` Program sosial.
- `250+` Pemuda terlibat.
- `15+` Komunitas/mitra.
- `5+` Wilayah dampingan.
- `20+` Dokumentasi & publikasi.

Catatan: angka dapat diubah melalui CMS.

---

## 3.7 Latest Stories

Section title:
```txt
Cerita Terbaru
```

Subtitle:
```txt
Dokumentasi kegiatan, cerita dampak, dan catatan pembelajaran dari perjalanan Bestari Nusa.
```

Card categories:
- Program.
- Cerita Dampak.
- Riset.
- Kolaborasi.
- Sustainability.
- Press Release.

---

## 3.8 Collaboration CTA

Title:
```txt
Mari Merancang Dampak Bersama
```

Copy:
```txt
Kami terbuka untuk kolaborasi program, riset sosial, pendampingan masyarakat, media partnership, dan inisiatif keberlanjutan bersama institusi, komunitas, maupun perusahaan.
```

CTA:
```txt
Hubungi Kami
```

Secondary:
```txt
Lihat Program
```

---

## 4. About Page Content

## 4.1 Hero

Title:
```txt
Tentang Bestari Nusa
```

Subtitle:
```txt
Berdaya Lestari Nusantara: ruang kolaborasi pemuda untuk menciptakan perubahan sosial berbasis riset, aksi, dan keberlanjutan.
```

## 4.2 Brand Philosophy

```txt
Bestari berarti bijaksana dalam membaca persoalan. Nusa merepresentasikan ruang hidup bersama: masyarakat, lingkungan, dan masa depan Nusantara. Melalui semangat Berdaya Lestari Nusantara, Bestari Nusa hadir untuk menguatkan manusia, komunitas, dan ekosistem sosial agar mampu tumbuh secara berkelanjutan.
```

## 4.3 Vision

```txt
Menjadi ruang kolaborasi generasi muda yang mendorong perubahan sosial berkelanjutan melalui riset, pemberdayaan masyarakat, dan aksi berbasis dampak.
```

## 4.4 Mission

1. Mengembangkan kapasitas pemuda dalam riset sosial, advokasi, dan community development.
2. Mendorong lahirnya program sosial berbasis data dan kebutuhan masyarakat.
3. Membangun kolaborasi lintas sektor untuk menciptakan dampak yang berkelanjutan.
4. Mendokumentasikan pembelajaran sosial sebagai bahan refleksi, advokasi, dan pengembangan program.
5. Menguatkan komunitas lokal melalui pendekatan partisipatif.

## 4.5 Values

| Value | Meaning |
|---|---|
| Empathy | Memahami masyarakat dari realitas yang mereka alami |
| Evidence-based | Menggunakan riset sebagai dasar aksi |
| Collaboration | Membangun dampak melalui kerja bersama |
| Sustainability | Mengutamakan manfaat jangka panjang |
| Integrity | Menjaga kepercayaan, transparansi, dan akuntabilitas |

---

## 5. Programs Page Content

## Program Detail Template

```md
# [Nama Program]

## Ringkasan
[Deskripsi singkat program]

## Latar Belakang
[Masalah sosial yang ingin dijawab]

## Tujuan
- Tujuan 1
- Tujuan 2
- Tujuan 3

## Sasaran
[Peserta/komunitas/beneficiaries]

## Pendekatan
[Metode: social mapping, FGD, training, mentoring, survey, community action]

## Dampak
[Impact metric dan cerita dampak]

## Dokumentasi
[Gallery]

## Status
Upcoming / Ongoing / Completed

## CTA
Daftar / Kolaborasi / Lihat Dokumentasi
```

---

## 6. News Content Types

| Type | Purpose |
|---|---|
| Berita Kegiatan | Update kegiatan resmi |
| Cerita Dampak | Narasi human-interest dari beneficiaries |
| Artikel Riset | Insight berbasis kajian sosial |
| Press Release | Informasi formal untuk publik/mitra |
| Opini/Refleksi | Catatan pembelajaran dari tim/relawan |
| Publikasi | Ringkasan laporan atau dokumen riset |

---

## 7. Team Page Content

Section title:
```txt
Orang-Orang di Balik Bestari Nusa
```

Subtitle:
```txt
Tim lintas latar belakang yang bergerak bersama untuk menghubungkan riset, aksi sosial, dan keberlanjutan.
```

Team card fields:
- Nama.
- Jabatan.
- Divisi.
- Foto.
- Bio singkat.
- Social link opsional.

Division examples:
- Board / Founder.
- Research & Development.
- Community Development.
- Program & Partnership.
- Communication & Media.
- Finance & Administration.
- Volunteer.

---

## 8. Contact Page Content

Title:
```txt
Mulai Kolaborasi Berdampak
```

Copy:
```txt
Punya gagasan program, kebutuhan riset sosial, inisiatif CSR, atau ingin bergabung sebagai relawan? Ceritakan kebutuhan Anda kepada kami.
```

Form fields:
- Nama lengkap.
- Email.
- Nomor WhatsApp.
- Institusi/Komunitas.
- Jenis kebutuhan.
- Pesan.
- Consent checkbox.

Jenis kebutuhan:
- Kolaborasi program.
- CSR / Sustainability.
- Media partnership.
- Relawan.
- Riset sosial.
- Pertanyaan umum.

---

## 9. SEO Content

### Homepage SEO

Title:
```txt
Bestari Nusa — Berdaya Lestari Nusantara
```

Description:
```txt
Bestari Nusa adalah komunitas pengembangan SDM muda yang bergerak dalam riset sosial, pemberdayaan masyarakat, advokasi sosial, dan keberlanjutan.
```

Keywords:
```txt
Bestari Nusa, Berdaya Lestari Nusantara, komunitas sosial, riset sosial, community development, pengembangan pemuda, sustainability, CSR, pemberdayaan masyarakat
```

### About SEO

Title:
```txt
Tentang Bestari Nusa — Riset, Aksi, dan Keberlanjutan
```

Description:
```txt
Kenali Bestari Nusa, ruang kolaborasi generasi muda untuk menciptakan perubahan sosial melalui riset, pemberdayaan masyarakat, dan keberlanjutan.
```

### Programs SEO

Title:
```txt
Program Bestari Nusa — Youth Development, Social Research, Community Development
```

Description:
```txt
Jelajahi program Bestari Nusa dalam pengembangan pemuda, riset sosial, pemberdayaan masyarakat, dan kolaborasi keberlanjutan.
```

---

## 10. Tone of Voice

Tone:
- Humanis.
- Optimis.
- Kritis tetapi tidak provokatif.
- Professional.
- Hangat.
- On point.

Hindari:
- Terlalu akademis.
- Terlalu “jualan”.
- Kalimat terlalu panjang.
- Klaim dampak tanpa data.
- Bahasa yang terlalu formal dan kaku.

Contoh gaya:

Kurang tepat:
```txt
Kami adalah organisasi terbaik yang menyelesaikan semua permasalahan sosial masyarakat.
```

Lebih tepat:
```txt
Kami percaya perubahan sosial dimulai dari kemampuan membaca masalah secara jernih, bekerja bersama masyarakat, dan merancang aksi yang berkelanjutan.
```



---


# CMS Admin Requirements — Bestari Nusa

Versi: 1.0

---

## 1. Tujuan CMS

CMS dibuat agar tim Bestari Nusa dapat mengelola konten website secara mandiri tanpa perlu mengubah kode.

CMS harus mendukung:
- Manajemen berita.
- Manajemen program.
- Manajemen struktur anggota.
- Manajemen mitra.
- Manajemen galeri/media.
- Manajemen impact metric.
- Manajemen halaman statis.
- Manajemen pesan masuk.
- Manajemen SEO.
- Role dan permission.

---

## 2. Admin Roles

## 2.1 Super Admin

Akses penuh:
- Kelola semua modul.
- Kelola user admin.
- Kelola role.
- Kelola site settings.
- Hapus konten.
- Melihat audit log.

## 2.2 Admin / Manager

Akses:
- CRUD news.
- CRUD programs.
- CRUD team.
- CRUD partners.
- CRUD impact.
- Kelola inquiries.
- Upload media.

Tidak bisa:
- Menghapus super admin.
- Mengubah role super admin.
- Mengakses audit log sensitif.

## 2.3 Editor

Akses:
- Create/edit news.
- Create/edit program.
- Upload media.
- Submit for review.

Tidak bisa:
- Publish langsung jika workflow review aktif.
- Menghapus konten permanen.
- Mengubah site settings.

## 2.4 Contributor

Akses:
- Membuat draft.
- Mengedit draft miliknya sendiri.
- Upload media terbatas.

Tidak bisa:
- Publish.
- Edit konten orang lain.
- Akses settings.

## 2.5 Viewer

Akses:
- Melihat dashboard.
- Melihat inquiry.
- Melihat konten.

Tidak bisa:
- CRUD.

---

## 3. CMS Navigation

```txt
Admin CMS
├── Dashboard
├── News / Stories
├── Programs
├── Team & Structure
├── Divisions
├── Partners
├── Testimonials
├── Impact Metrics
├── Research / Publications
├── Gallery / Media Library
├── Contact Inquiries
├── Pages
├── SEO
├── Site Settings
├── Users & Roles
└── Audit Log
```

---

## 4. Dashboard Requirements

Dashboard menampilkan:

- Total berita published.
- Total program active.
- Total team member.
- Total partner.
- Total inquiry baru.
- Statistik impact utama.
- Draft yang perlu direview.
- Aktivitas terbaru.
- Quick action:
  - Tambah berita.
  - Tambah program.
  - Tambah anggota.
  - Upload media.

Widget:

```txt
[Published News] [Active Programs] [New Inquiries] [Partners]
[Recent Activities]
[Draft Waiting Review]
[Quick Actions]
```

---

## 5. Content Workflow

Status konten:

1. `draft`
2. `in_review`
3. `scheduled`
4. `published`
5. `archived`

Flow:

```txt
Contributor/Editor creates draft
→ submit for review
→ Admin reviews
→ publish now / schedule / request revision
→ published
→ archive if outdated
```

MVP boleh dibuat sederhana:
- Draft.
- Published.
- Archived.

---

## 6. News / Stories Module

## 6.1 Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| title | string | yes | Judul artikel |
| slug | string | yes | Auto generate, editable |
| excerpt | text | yes | Ringkasan 120–180 karakter |
| content | rich text / markdown | yes | Isi artikel |
| cover_image | media | yes | Untuk card dan OG image |
| category | relation | yes | Berita, Cerita Dampak, Riset, Press Release |
| tags | relation many-to-many | no | Multi tag |
| author | relation user/profile | yes | Default current user |
| status | enum | yes | draft/published/archived |
| featured | boolean | no | Tampil di homepage |
| published_at | datetime | no | Required jika published |
| seo_title | string | no | Max 60 char |
| seo_description | string | no | Max 155 char |
| og_image | media | no | Jika kosong pakai cover |
| reading_time | number | auto | Hitung otomatis |

## 6.2 Features

- Create/edit/delete.
- Rich text editor atau markdown editor.
- Image upload.
- Preview.
- Save draft.
- Publish.
- Archive.
- Featured toggle.
- Category filter.
- Search by title.
- Sort by newest/oldest.
- SEO preview.
- Slug validation.

## 6.3 Validation

- Title tidak boleh kosong.
- Slug unik.
- Cover image wajib untuk published.
- Excerpt maksimal 180 karakter.
- SEO description maksimal 155 karakter.
- Published_at otomatis jika publish now.

---

## 7. Programs Module

## 7.1 Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| title | string | yes | Nama program |
| slug | string | yes | Unique |
| summary | text | yes | Ringkasan |
| description | rich text / markdown | yes | Detail program |
| category | enum/relation | yes | Youth, Research, Community, Sustainability, CSR |
| status | enum | yes | upcoming/ongoing/completed/archived |
| location | string | no | Lokasi program |
| start_date | date | no | Tanggal mulai |
| end_date | date | no | Tanggal selesai |
| cover_image | media | yes | Cover program |
| gallery | media[] | no | Dokumentasi |
| objectives | json/text | no | List tujuan |
| target_beneficiaries | string | no | Sasaran |
| approach | text | no | Metode |
| impact_summary | text | no | Ringkasan dampak |
| impact_metrics | json | no | Angka dampak |
| registration_url | string | no | Link pendaftaran |
| collaboration_cta | string | no | Text CTA |
| is_featured | boolean | no | Tampil di homepage |
| order_index | number | no | Urutan |

## 7.2 Program Status

- `upcoming`: akan berjalan.
- `ongoing`: sedang berjalan.
- `completed`: selesai.
- `archived`: tidak ditampilkan aktif.

## 7.3 Features

- CRUD program.
- Filter kategori.
- Filter status.
- Featured program.
- Add gallery.
- Add impact metrics.
- Preview public detail.
- Link external registration.
- Program timeline.

---

## 8. Team & Structure Module

## 8.1 Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| name | string | yes | Nama anggota |
| slug | string | no | Optional |
| position | string | yes | Jabatan |
| division_id | relation | yes | Divisi |
| photo | media | no | Foto |
| bio | text | no | Bio pendek |
| email | string | no | Internal/optional |
| social_links | json | no | LinkedIn, Instagram, etc |
| order_index | number | no | Urutan |
| is_featured | boolean | no | Tampil di homepage |
| is_active | boolean | yes | Aktif/tidak |

## 8.2 Divisions

Fields:
- name.
- slug.
- description.
- order_index.
- parent_division_id.
- is_active.

## 8.3 Features

- CRUD team.
- CRUD division.
- Drag-and-drop order.
- Activate/deactivate member.
- Set featured member.
- Organization tree view.
- Filter by division.

---

## 9. Partners Module

Fields:
- name.
- slug.
- logo.
- website_url.
- description.
- partnership_type.
- year.
- is_featured.
- order_index.
- is_active.

Partnership type:
- CSR.
- Academic.
- Community.
- Media.
- Government.
- NGO.
- Corporate.
- Other.

Features:
- CRUD partner.
- Logo upload.
- Featured partner.
- Sort order.

---

## 10. Testimonials Module

Fields:
- name.
- role.
- institution.
- quote.
- photo.
- related_program_id.
- is_featured.
- status.
- order_index.

Features:
- CRUD testimonial.
- Moderate testimonial.
- Featured toggle.

---

## 11. Impact Metrics Module

Fields:
- label.
- value.
- suffix.
- description.
- icon.
- category.
- order_index.
- is_active.

Examples:
- Program terlaksana.
- Pemuda terlibat.
- Komunitas terdampak.
- Mitra kolaborasi.
- Wilayah dampingan.

Features:
- CRUD metric.
- Reorder.
- Show/hide.
- Category filter.

---

## 12. Research / Publications Module

Fields:
- title.
- slug.
- abstract.
- content.
- file_url.
- cover_image.
- category.
- authors.
- year.
- status.
- published_at.
- seo_title.
- seo_description.

Features:
- Upload PDF.
- Download counter optional.
- Preview.
- Related program.

---

## 13. Media Library

Features:
- Upload image.
- Upload PDF.
- Folder/category.
- Search media.
- Copy URL.
- Delete unused media.
- Alt text.
- Caption.
- File size indicator.
- Compression note.

Supported file:
- jpg.
- jpeg.
- png.
- webp.
- svg.
- pdf.
- mp4 optional.

Validation:
- Max image 3 MB.
- Max PDF 10 MB.
- Max video 30 MB jika diaktifkan.
- Disarankan upload webp.

---

## 14. Contact Inquiries

Fields:
- name.
- email.
- phone.
- institution.
- inquiry_type.
- message.
- status.
- assigned_to.
- notes.
- created_at.

Status:
- new.
- read.
- in_progress.
- replied.
- closed.
- spam.

Features:
- View inquiries.
- Filter by status/type.
- Mark as read.
- Add internal notes.
- Export CSV optional.
- Delete spam.

---

## 15. Site Settings

Editable settings:
- Site name.
- Logo light.
- Logo dark.
- Favicon.
- Contact email.
- WhatsApp.
- Instagram.
- Address.
- Footer description.
- Default SEO title.
- Default SEO description.
- Default OG image.
- Maintenance mode optional.
- Theme default: system/light/dark.

---

## 16. SEO Management

Per content:
- SEO title.
- SEO description.
- Canonical URL.
- OG image.
- Keywords optional.
- Noindex toggle.

Global:
- Organization schema.
- Sitemap.
- Robots.
- Default OG.

CMS should show SEO preview:

```txt
[SEO Title]
[domain.com/news/article-slug]
[SEO Description]
```

---

## 17. Audit Log

Track:
- User.
- Action.
- Entity type.
- Entity id.
- Before data.
- After data.
- IP address optional.
- Created at.

Actions:
- create.
- update.
- delete.
- publish.
- archive.
- login.
- logout.
- upload.

---

## 18. Permission Matrix

| Module | Super Admin | Admin | Editor | Contributor | Viewer |
|---|---|---|---|---|---|
| Dashboard | Full | Full | View | View | View |
| News | Full | Full | Create/Edit | Draft Own | View |
| Programs | Full | Full | Create/Edit | Draft Own | View |
| Team | Full | Full | No/Delete No | No | View |
| Partners | Full | Full | Edit No Delete | No | View |
| Media | Full | Upload/Delete | Upload | Upload Limited | View |
| Inquiries | Full | Full | View | No | View |
| Site Settings | Full | Limited | No | No | No |
| Users | Full | No | No | No | No |
| Audit Log | Full | View Limited | No | No | No |

---

## 19. Admin UI Requirements

Style admin:
- Clean dashboard.
- Sidebar collapsible.
- Light/dark mode.
- Table with search/filter.
- Form segmented by tabs.
- Autosave draft optional.
- Toast notification.
- Confirmation modal for delete.
- Empty state friendly.
- Loading skeleton.

Admin color:
- Sama dengan public, tetapi lebih functional.
- Gunakan matcha primary.
- Surface white/dark forest.
- Status badge:
  - draft: gray.
  - review: amber.
  - published: green.
  - archived: muted.

---

## 20. CMS Acceptance Criteria

CMS dianggap selesai jika:
- Admin dapat login.
- Admin dapat membuat berita baru dan tampil di public news.
- Admin dapat membuat program baru dan tampil di public programs.
- Admin dapat mengubah team member dan struktur tampil di page Team.
- Admin dapat upload cover image.
- Admin dapat mengubah impact metric di homepage.
- Contact form public masuk ke daftar inquiry.
- Non-admin tidak dapat mengakses route `/admin`.
- RLS aktif dan membatasi akses sesuai role.



---


# Technical Architecture — Bestari Nusa Company Profile

Versi: 1.0

---

## 1. Recommended Tech Stack

## 1.1 Frontend

- Next.js 15 App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui atau custom component.
- Framer Motion.
- Lenis smooth scroll.
- React Hook Form + Zod.
- next-themes untuk dark/light mode.
- next/image untuk optimasi gambar.
- next-seo atau Metadata API bawaan Next.js.

## 1.2 Backend / CMS

- Supabase Auth.
- Supabase PostgreSQL.
- Supabase Storage.
- Supabase Row Level Security.
- Supabase Edge Functions optional.
- Server Actions / Route Handlers Next.js untuk operasi tertentu.

## 1.3 3D & Animation

- React Three Fiber.
- Drei.
- Spline embed optional.
- Lottie optional untuk loader ringan.
- Dynamic import untuk 3D component.

## 1.4 Deployment

- Vercel untuk Next.js.
- Supabase untuk database, auth, storage.
- GitHub untuk version control.

---

## 2. Architecture Overview

```txt
Visitor Browser
    ↓
Next.js Public Website
    ↓ fetch server/client
Supabase PostgreSQL + Storage
    ↑
Next.js Admin CMS
    ↑
Supabase Auth + RLS
```

Public website membaca data published dari Supabase. Admin CMS melakukan CRUD berdasarkan role user yang login.

---

## 3. Data Flow

## 3.1 Public News

```txt
Visitor opens /news
→ Next.js fetches published posts
→ Supabase returns posts where status = 'published'
→ UI renders listing
→ Visitor opens /news/[slug]
→ Next.js fetches post detail by slug
```

## 3.2 Admin Create News

```txt
Admin login
→ Open /admin/news/new
→ Fill form
→ Upload cover to Supabase Storage
→ Save draft to posts table
→ Publish
→ Public website can show article
```

## 3.3 Contact Form

```txt
Visitor submits contact form
→ Zod validation
→ Insert into inquiries table
→ Admin dashboard shows new inquiry
→ Optional email notification via Edge Function
```

---

## 4. Folder Structure

```txt
bestari-nusa-web/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── programs/page.tsx
│   │   ├── programs/[slug]/page.tsx
│   │   ├── news/page.tsx
│   │   ├── news/[slug]/page.tsx
│   │   ├── team/page.tsx
│   │   ├── research/page.tsx
│   │   ├── gallery/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── news/page.tsx
│   │   ├── news/new/page.tsx
│   │   ├── news/[id]/edit/page.tsx
│   │   ├── programs/page.tsx
│   │   ├── team/page.tsx
│   │   ├── partners/page.tsx
│   │   ├── impact/page.tsx
│   │   ├── media/page.tsx
│   │   ├── inquiries/page.tsx
│   │   └── settings/page.tsx
│   ├── login/page.tsx
│   ├── api/
│   │   ├── upload/route.ts
│   │   └── revalidate/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── public/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── hero-section.tsx
│   │   ├── focus-area-card.tsx
│   │   ├── program-card.tsx
│   │   ├── news-card.tsx
│   │   ├── team-card.tsx
│   │   ├── impact-counter.tsx
│   │   ├── collaboration-cta.tsx
│   │   ├── loading-screen.tsx
│   │   └── theme-toggle.tsx
│   ├── admin/
│   │   ├── admin-sidebar.tsx
│   │   ├── admin-header.tsx
│   │   ├── data-table.tsx
│   │   ├── content-form.tsx
│   │   ├── media-picker.tsx
│   │   └── status-badge.tsx
│   ├── 3d/
│   │   ├── hero-orb.tsx
│   │   ├── community-nodes.tsx
│   │   └── fallback-visual.tsx
│   └── ui/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── validations/
│   ├── queries/
│   ├── utils.ts
│   ├── constants.ts
│   └── seo.ts
├── hooks/
├── types/
├── public/
│   ├── assets/
│   ├── images/
│   └── models/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── .env.example
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 5. Routing Strategy

Public pages use static or ISR where possible:

- `/`: ISR 60s or dynamic with cache.
- `/news`: dynamic with pagination.
- `/news/[slug]`: generateStaticParams optional.
- `/programs`: dynamic/filterable.
- `/programs/[slug]`: ISR.
- `/admin/*`: protected dynamic routes.

---

## 6. Authentication Strategy

Use Supabase Auth.

Routes:
- `/login`: login page.
- `/admin/*`: protected by middleware.

Middleware logic:
1. Check session.
2. If no session, redirect to `/login`.
3. Check profile role.
4. If no admin role, redirect to `/`.

---

## 7. Authorization Strategy

Use dual protection:
- Frontend route protection.
- Supabase RLS.

Role stored in `profiles.role`.

Enum role:
- super_admin.
- admin.
- editor.
- contributor.
- viewer.

RLS examples:
- Public can read `published` content only.
- Admin can read/write according to role.
- Contributor can only update own draft.

---

## 8. Supabase Storage

Buckets:

```txt
media-public
├── news/
├── programs/
├── team/
├── partners/
├── gallery/
├── seo/
└── publications/
```

Rules:
- Public read for published media.
- Authenticated upload.
- File type validation.
- Max file size validation.

---

## 9. API / Server Actions

Recommended actions:

```txt
createPost()
updatePost()
publishPost()
archivePost()
deletePost()
createProgram()
updateProgram()
uploadMedia()
createTeamMember()
updateTeamMember()
submitInquiry()
updateSiteSettings()
```

Use:
- Zod validation.
- try/catch.
- Toast feedback.
- Revalidate path after mutation.

---

## 10. Rich Text Strategy

Options:

### MVP Option
Use Markdown editor:
- Easier.
- Lightweight.
- Store content as markdown text.
- Render with `react-markdown`.

### Advanced Option
Use TipTap editor:
- Better editing UX.
- More complex.
- Store JSON content.

Recommendation for MVP:
- Use Markdown editor first.
- Add TipTap in phase 2 if needed.

---

## 11. SEO Implementation

Use Next.js Metadata API.

For article page:

```ts
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)

  return {
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt,
    openGraph: {
      title: post.seo_title ?? post.title,
      description: post.seo_description ?? post.excerpt,
      images: [post.og_image_url ?? post.cover_image_url]
    }
  }
}
```

Add:
- `app/sitemap.ts`.
- `app/robots.ts`.
- JSON-LD Organization.
- JSON-LD Article.

---

## 12. Performance Strategy

- Use `next/image`.
- Lazy load 3D.
- Use dynamic import for admin charts.
- Compress images to webp.
- Use pagination.
- Avoid large animation libraries if not needed.
- Reduce JS on public pages.
- Use skeleton loading.
- Preload only critical fonts.
- Use CSS variables for theme.

---

## 13. 3D Strategy

Hero 3D component:

```tsx
const HeroOrb = dynamic(() => import("@/components/3d/hero-orb"), {
  ssr: false,
  loading: () => <FallbackVisual />
})
```

Mobile strategy:
- Show 3D only on md+ screens.
- On small screen, show static SVG/PNG.
- Respect reduced motion.

---

## 14. Dark Mode Strategy

Use `next-themes`.

```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

CSS:
- Use CSS variables.
- Avoid hardcoded colors in components.

---

## 15. Form Validation

Use:
- React Hook Form.
- Zod.

Example contact schema:

```ts
const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  institution: z.string().optional(),
  inquiry_type: z.enum([
    "collaboration",
    "csr",
    "media",
    "volunteer",
    "research",
    "general"
  ]),
  message: z.string().min(10).max(2000),
  consent: z.boolean().refine(Boolean)
})
```

---

## 16. Environment Variables

`.env.example`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_ENABLE_3D=true
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` to client.

---

## 17. Deployment Plan

1. Push repository to GitHub.
2. Create Supabase project.
3. Run SQL migration.
4. Setup auth redirect URL.
5. Setup storage buckets.
6. Add env variables to Vercel.
7. Deploy to Vercel.
8. Test public pages.
9. Test admin login.
10. Test CRUD.
11. Connect custom domain.
12. Submit sitemap to Search Console.

---

## 18. Monitoring

Recommended:
- Vercel Analytics.
- Supabase logs.
- Google Search Console.
- Basic error logging.
- Optional: Sentry.

---

## 19. Security Checklist

- RLS enabled on all tables.
- Admin pages protected.
- Service role key only server-side.
- Input validation with Zod.
- Upload validation.
- CSRF handled by same-site/session strategy.
- Rate limit contact form.
- Sanitize markdown output.
- Hide admin routes from sitemap.
- Regular database backup.

---

## 20. Accessibility Checklist

- Semantic HTML.
- Heading order correct.
- Alt image.
- Focus visible.
- Keyboard navigation.
- ARIA labels for icon-only buttons.
- Sufficient contrast.
- Reduced motion support.
- Form error messages accessible.

---

## 21. Recommended Packages

```bash
npm install @supabase/ssr @supabase/supabase-js
npm install next-themes framer-motion lenis
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react clsx tailwind-merge
npm install react-markdown remark-gfm
npm install @react-three/fiber @react-three/drei three
```

Optional:

```bash
npm install @tiptap/react @tiptap/starter-kit
npm install sonner
npm install vaul
npm install cmdk
```



---


# Supabase Database Schema — Bestari Nusa CMS

Versi: 1.0

---

## 1. Overview

Database menggunakan Supabase PostgreSQL.

Tujuan schema:
- Mendukung public website.
- Mendukung Admin CMS.
- Mendukung role-based access.
- Mendukung content workflow.
- Mendukung media library.
- Mendukung SEO.
- Mendukung inquiry/contact form.

---

## 2. Enum Types

```sql
create type user_role as enum (
  'super_admin',
  'admin',
  'editor',
  'contributor',
  'viewer'
);

create type content_status as enum (
  'draft',
  'in_review',
  'scheduled',
  'published',
  'archived'
);

create type program_status as enum (
  'upcoming',
  'ongoing',
  'completed',
  'archived'
);

create type inquiry_status as enum (
  'new',
  'read',
  'in_progress',
  'replied',
  'closed',
  'spam'
);

create type inquiry_type as enum (
  'collaboration',
  'csr',
  'media',
  'volunteer',
  'research',
  'general'
);
```

---

## 3. Tables

## 3.1 profiles

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  role user_role not null default 'viewer',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

---

## 3.2 content_categories

```sql
create table public.content_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  type text not null check (type in ('news', 'program', 'research', 'gallery')),
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.3 tags

```sql
create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz default now()
);
```

---

## 3.4 media_assets

```sql
create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_url text not null,
  storage_path text not null,
  mime_type text not null,
  size_bytes bigint,
  alt_text text,
  caption text,
  folder text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);
```

---

## 3.5 posts

```sql
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image_id uuid references public.media_assets(id) on delete set null,
  category_id uuid references public.content_categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  status content_status not null default 'draft',
  is_featured boolean default false,
  published_at timestamptz,
  scheduled_at timestamptz,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id) on delete set null,
  reading_time int,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.6 post_tags

```sql
create table public.post_tags (
  post_id uuid references public.posts(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);
```

---

## 3.7 programs

```sql
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description text not null,
  category_id uuid references public.content_categories(id) on delete set null,
  status program_status not null default 'upcoming',
  location text,
  start_date date,
  end_date date,
  cover_image_id uuid references public.media_assets(id) on delete set null,
  objectives jsonb default '[]'::jsonb,
  target_beneficiaries text,
  approach text,
  impact_summary text,
  impact_metrics jsonb default '[]'::jsonb,
  registration_url text,
  collaboration_cta text,
  is_featured boolean default false,
  order_index int default 0,
  seo_title text,
  seo_description text,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.8 program_gallery

```sql
create table public.program_gallery (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references public.programs(id) on delete cascade,
  media_id uuid references public.media_assets(id) on delete cascade,
  order_index int default 0,
  created_at timestamptz default now()
);
```

---

## 3.9 divisions

```sql
create table public.divisions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  parent_division_id uuid references public.divisions(id) on delete set null,
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.10 team_members

```sql
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  position text not null,
  division_id uuid references public.divisions(id) on delete set null,
  photo_id uuid references public.media_assets(id) on delete set null,
  bio text,
  email text,
  social_links jsonb default '{}'::jsonb,
  order_index int default 0,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.11 partners

```sql
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  logo_id uuid references public.media_assets(id) on delete set null,
  website_url text,
  description text,
  partnership_type text,
  year int,
  is_featured boolean default false,
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.12 testimonials

```sql
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  institution text,
  quote text not null,
  photo_id uuid references public.media_assets(id) on delete set null,
  related_program_id uuid references public.programs(id) on delete set null,
  is_featured boolean default false,
  status content_status default 'draft',
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.13 impact_metrics

```sql
create table public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value numeric not null default 0,
  suffix text,
  description text,
  icon text,
  category text,
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.14 publications

```sql
create table public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  abstract text,
  content text,
  file_id uuid references public.media_assets(id) on delete set null,
  cover_image_id uuid references public.media_assets(id) on delete set null,
  category_id uuid references public.content_categories(id) on delete set null,
  authors jsonb default '[]'::jsonb,
  year int,
  status content_status default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.15 inquiries

```sql
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  institution text,
  inquiry_type inquiry_type not null default 'general',
  message text not null,
  status inquiry_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  internal_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.16 pages

```sql
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text,
  status content_status default 'draft',
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## 3.17 site_settings

```sql
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz default now()
);
```

---

## 3.18 audit_logs

```sql
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);
```

---

## 4. Updated At Trigger

```sql
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create trigger set_programs_updated_at
before update on public.programs
for each row execute function public.set_updated_at();

create trigger set_team_members_updated_at
before update on public.team_members
for each row execute function public.set_updated_at();

create trigger set_inquiries_updated_at
before update on public.inquiries
for each row execute function public.set_updated_at();
```

---

## 5. Helper Functions for RLS

```sql
create or replace function public.current_user_role()
returns user_role as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer;

create or replace function public.is_admin()
returns boolean as $$
  select public.current_user_role() in ('super_admin', 'admin');
$$ language sql security definer;

create or replace function public.can_edit_content()
returns boolean as $$
  select public.current_user_role() in ('super_admin', 'admin', 'editor');
$$ language sql security definer;
```

---

## 6. Enable RLS

```sql
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.programs enable row level security;
alter table public.team_members enable row level security;
alter table public.divisions enable row level security;
alter table public.partners enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.inquiries enable row level security;
alter table public.media_assets enable row level security;
```

---

## 7. RLS Policy Examples

## 7.1 Public Read Published Posts

```sql
create policy "Public can read published posts"
on public.posts
for select
using (status = 'published');
```

## 7.2 Admin Full Access Posts

```sql
create policy "Admins can manage posts"
on public.posts
for all
to authenticated
using (public.can_edit_content())
with check (public.can_edit_content());
```

## 7.3 Public Read Active Programs

```sql
create policy "Public can read active programs"
on public.programs
for select
using (status in ('upcoming', 'ongoing', 'completed'));
```

## 7.4 Admin Manage Programs

```sql
create policy "Admins can manage programs"
on public.programs
for all
to authenticated
using (public.can_edit_content())
with check (public.can_edit_content());
```

## 7.5 Public Insert Inquiry

```sql
create policy "Public can create inquiry"
on public.inquiries
for insert
with check (true);
```

## 7.6 Admin Read Inquiry

```sql
create policy "Admins can read inquiries"
on public.inquiries
for select
to authenticated
using (public.current_user_role() in ('super_admin', 'admin', 'viewer'));
```

---

## 8. Indexes

```sql
create index posts_status_idx on public.posts(status);
create index posts_slug_idx on public.posts(slug);
create index posts_published_at_idx on public.posts(published_at desc);
create index programs_slug_idx on public.programs(slug);
create index programs_status_idx on public.programs(status);
create index team_members_division_idx on public.team_members(division_id);
create index inquiries_status_idx on public.inquiries(status);
create index media_assets_folder_idx on public.media_assets(folder);
```

---

## 9. Seed Data

## 9.1 Categories

```sql
insert into public.content_categories (name, slug, type, description)
values
('Berita Kegiatan', 'berita-kegiatan', 'news', 'Update kegiatan resmi Bestari Nusa'),
('Cerita Dampak', 'cerita-dampak', 'news', 'Cerita perubahan dan pembelajaran dari program'),
('Riset Sosial', 'riset-sosial', 'news', 'Artikel dan insight berbasis riset sosial'),
('Youth Development', 'youth-development', 'program', 'Program pengembangan kapasitas pemuda'),
('Community Development', 'community-development', 'program', 'Program pemberdayaan komunitas'),
('Sustainability', 'sustainability', 'program', 'Program keberlanjutan lingkungan dan sosial'),
('CSR Collaboration', 'csr-collaboration', 'program', 'Program kolaborasi CSR dan institusi');
```

## 9.2 Impact Metrics Placeholder

```sql
insert into public.impact_metrics (label, value, suffix, description, icon, order_index)
values
('Program Terlaksana', 10, '+', 'Inisiatif sosial dan pengembangan komunitas', 'leaf', 1),
('Pemuda Terlibat', 250, '+', 'Generasi muda dalam pelatihan dan aksi sosial', 'users', 2),
('Mitra Kolaborasi', 15, '+', 'Institusi, komunitas, dan partner program', 'handshake', 3),
('Wilayah Dampingan', 5, '+', 'Area komunitas yang menjadi ruang aksi', 'map', 4);
```

---

## 10. Storage Bucket Setup

Buckets:
- `media-public`.

Recommended folders:
- `news`.
- `programs`.
- `team`.
- `partners`.
- `gallery`.
- `publications`.
- `settings`.

Storage rules:
- Public read.
- Authenticated upload.
- Admin/editor delete.
- Validate MIME type in app logic.

---

## 11. Notes

- Semua tabel yang bisa diedit admin sebaiknya punya `created_at` dan `updated_at`.
- Semua konten public harus memiliki status.
- Jangan lupa membuat user pertama sebagai `super_admin` langsung dari Supabase SQL editor setelah registrasi.
- RLS harus dites sebelum production.



---


# Implementation Plan — Bestari Nusa Website

Versi: 1.0  
Estimasi ideal: 4–6 minggu untuk MVP yang rapi.  
Stack rekomendasi: Next.js 15 + TypeScript + Tailwind CSS + Supabase + Framer Motion.

---

## 1. Development Principles

- Build MVP first, polish after.
- CMS harus functional sebelum animasi advance.
- Public website harus cepat dan SEO-friendly.
- 3D assets harus optional/lazy-loaded.
- Jangan meniru aset dari website/game lain.
- Semua warna menggunakan design tokens.
- Semua form divalidasi dengan Zod.
- Semua route admin dilindungi.

---

## 2. Phase 0 — Preparation

## 2.1 Checklist Awal

- Finalisasi logo Bestari Nusa.
- Finalisasi kontak resmi.
- Kumpulkan foto kegiatan.
- Kumpulkan foto anggota.
- Siapkan daftar program.
- Siapkan daftar berita awal.
- Siapkan daftar mitra.
- Siapkan copywriting utama.
- Tentukan domain.
- Buat akun Supabase dan Vercel.

## 2.2 Asset Needed

```txt
/logo-light.svg
/logo-dark.svg
/favicon.ico
/og-image.jpg
/hero-fallback.webp
/program-placeholder.webp
/team-placeholder.webp
/partner-placeholder.webp
```

---

## 3. Phase 1 — Project Setup

## Goals

Membangun fondasi project.

## Tasks

1. Create Next.js project.
2. Setup TypeScript.
3. Setup Tailwind CSS.
4. Setup ESLint/Prettier.
5. Setup shadcn/ui optional.
6. Setup folder structure.
7. Setup CSS variables untuk light/dark theme.
8. Setup next-themes.
9. Setup base layout.
10. Setup Supabase client/server.

## Commands

```bash
npx create-next-app@latest bestari-nusa-web --typescript --tailwind --eslint --app
cd bestari-nusa-web

npm install @supabase/ssr @supabase/supabase-js
npm install next-themes framer-motion lenis
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react clsx tailwind-merge
npm install react-markdown remark-gfm
npm install @react-three/fiber @react-three/drei three
```

## Deliverables

- Project running locally.
- Theme provider working.
- Supabase connected.
- Base layout ready.

---

## 4. Phase 2 — Design System

## Goals

Membangun komponen UI reusable.

## Tasks

1. Setup color tokens.
2. Setup typography.
3. Build Button component.
4. Build Badge component.
5. Build Card component.
6. Build SectionHeader component.
7. Build Container component.
8. Build ThemeToggle component.
9. Build LoadingScreen component.
10. Build animated wrapper component.

## Components

```txt
<Button />
<Badge />
<Card />
<SectionHeader />
<Container />
<ThemeToggle />
<LoadingScreen />
<Reveal />
<MagneticButton />
```

## Acceptance Criteria

- Light/dark mode konsisten.
- Button dan card siap digunakan.
- Motion dasar tersedia.
- Theme tersimpan di localStorage.

---

## 5. Phase 3 — Public Layout

## Goals

Membangun layout public website.

## Tasks

1. Build FloatingNavbar.
2. Build MobileNavPanel.
3. Build Footer.
4. Build homepage sections:
   - Hero.
   - About preview.
   - Focus areas.
   - Featured programs.
   - Impact snapshot.
   - Latest news.
   - Team preview.
   - Collaboration CTA.
5. Add loading animation.
6. Add scroll animation.

## Notes

Navbar:
- Floating capsule.
- Active menu indicator.
- Compact on scroll.
- Mobile command-panel style.

Hero:
- Dynamic 3D asset optional.
- Use fallback if 3D disabled.

## Acceptance Criteria

- Homepage responsive.
- Navbar smooth.
- Loader works once per session.
- Dark/light mode works.
- No layout shift major.

---

## 6. Phase 4 — Supabase Database

## Goals

Membangun database schema dan seed.

## Tasks

1. Create Supabase project.
2. Run enum SQL.
3. Create tables.
4. Enable RLS.
5. Create storage bucket.
6. Create first admin user.
7. Insert seed categories.
8. Insert seed impact metrics.
9. Test read public content.
10. Test admin CRUD access.

## Acceptance Criteria

- Tables created.
- RLS enabled.
- Storage ready.
- Public can read published content.
- Admin can manage content.

---

## 7. Phase 5 — Admin Authentication

## Goals

Membuat login dan protected admin route.

## Tasks

1. Build login page.
2. Setup Supabase auth.
3. Create middleware.
4. Create admin layout.
5. Create admin sidebar.
6. Create admin header.
7. Add logout.
8. Fetch current user profile.
9. Redirect unauthorized user.

## Acceptance Criteria

- User can login/logout.
- `/admin` cannot be accessed without login.
- Non-admin cannot access CMS.
- Admin layout displayed after login.

---

## 8. Phase 6 — CMS Module: News

## Goals

Admin dapat mengelola berita.

## Tasks

1. News listing table.
2. Create news form.
3. Edit news form.
4. Delete/archive action.
5. Status badge.
6. Category select.
7. Tag input optional.
8. Cover image upload.
9. Markdown editor.
10. SEO fields.
11. Publish/draft toggle.
12. Preview link.

## Acceptance Criteria

- Admin can create news.
- Published news appears on `/news`.
- Draft news does not appear publicly.
- Detail page `/news/[slug]` works.

---

## 9. Phase 7 — CMS Module: Programs

## Goals

Admin dapat mengelola program.

## Tasks

1. Program listing.
2. Create/edit form.
3. Category/status.
4. Date/location.
5. Cover image.
6. Gallery image.
7. Impact metrics JSON editor/simple repeater.
8. Registration URL.
9. Featured toggle.
10. Detail page integration.

## Acceptance Criteria

- Admin can create program.
- Program appears on `/programs`.
- Program detail works.
- Featured program appears on homepage.

---

## 10. Phase 8 — CMS Module: Team, Partners, Impact

## Goals

Admin dapat mengelola identitas organisasi dan dampak.

## Tasks

1. Team member CRUD.
2. Division CRUD.
3. Partner CRUD.
4. Impact metric CRUD.
5. Reorder fields.
6. Active/inactive toggle.
7. Featured toggle.

## Acceptance Criteria

- Team page dynamic.
- Structure can be updated.
- Partner logo appears.
- Impact counters updated from CMS.

---

## 11. Phase 9 — Contact Form & Inquiries

## Goals

Pengunjung bisa mengirim pesan dan admin bisa membaca.

## Tasks

1. Build contact page.
2. Build contact form.
3. Zod validation.
4. Insert inquiry to Supabase.
5. Admin inquiry table.
6. Inquiry status update.
7. Internal notes optional.

## Acceptance Criteria

- Form submit success.
- Inquiry appears in CMS.
- Admin can mark as read/replied/closed.

---

## 12. Phase 10 — Additional Public Pages

## Goals

Melengkapi halaman public.

## Tasks

1. About page.
2. Team page.
3. Research page.
4. Gallery page.
5. Detail program.
6. Detail news.
7. SEO metadata per page.
8. Sitemap and robots.

## Acceptance Criteria

- All nav links valid.
- Pages responsive.
- Metadata available.
- No broken links.

---

## 13. Phase 11 — 3D Assets & Advanced Motion

## Goals

Meningkatkan visual interactivity.

## Tasks

1. Build HeroOrb with React Three Fiber or Spline embed.
2. Add fallback visual.
3. Lazy load 3D.
4. Add floating motion.
5. Add card reveal.
6. Add section transition.
7. Add reduced motion support.
8. Test mobile performance.

## Acceptance Criteria

- 3D loads only when needed.
- Website still usable without 3D.
- Animation smooth.
- No major performance drop.

---

## 14. Phase 12 — QA & Optimization

## Checklist

### Functional
- Homepage works.
- All pages work.
- CMS login works.
- CRUD modules work.
- Contact form works.
- Upload works.
- Dark mode works.

### Responsive
- Mobile 360px.
- Mobile 390px.
- Tablet 768px.
- Laptop 1366px.
- Desktop 1440px+.

### SEO
- Title.
- Description.
- OG image.
- Sitemap.
- Robots.
- Slug.

### Security
- Admin route protected.
- RLS active.
- Service role not exposed.
- Upload validation.
- Form validation.

### Performance
- Compress image.
- Lazy load 3D.
- Check Lighthouse.
- Remove unused packages.

### Accessibility
- Alt text.
- Focus state.
- Keyboard nav.
- Contrast.
- Reduced motion.

---

## 15. Phase 13 — Deployment

## Tasks

1. Push code to GitHub.
2. Create Vercel project.
3. Add environment variables.
4. Deploy.
5. Setup Supabase production.
6. Run migration.
7. Create admin user.
8. Test production CMS.
9. Connect domain.
10. Submit sitemap.

## Acceptance Criteria

- Production URL accessible.
- CMS production accessible.
- Public data loads.
- Forms work.
- Images load.

---

## 16. Suggested MVP Timeline

## Week 1

- Setup project.
- Design system.
- Public layout.
- Supabase schema.
- Auth.

## Week 2

- Homepage.
- About.
- Programs.
- News.
- CMS News.

## Week 3

- CMS Programs.
- CMS Team.
- CMS Partners.
- Contact form.
- Inquiries.

## Week 4

- 3D/motion polish.
- SEO.
- Testing.
- Deployment.
- Handover.

Jika waktu terbatas, 3D dan advanced CMS workflow bisa masuk phase 2.

---

## 17. Handover Checklist

- Repository access.
- Supabase access.
- Vercel access.
- Admin account.
- Documentation.
- CMS usage guide.
- Environment variable list.
- Database schema.
- Backup note.
- Maintenance recommendation.

---

## 18. Maintenance Plan

Monthly:
- Update dependencies.
- Backup database.
- Review inquiries.
- Check broken links.
- Check Search Console.
- Compress uploaded media.
- Review admin users.

Quarterly:
- Review program archive.
- Update impact metrics.
- Update homepage featured content.
- Review SEO performance.



---


# AI IDE Master Prompt — Build Bestari Nusa Company Profile Website

Gunakan prompt ini untuk Cursor, Windsurf, Lovable, Bolt, v0, atau AI IDE lainnya.

---

## Master Prompt

Buatkan website company profile modern untuk **Bestari Nusa / Berdaya Lestari Nusantara**.

Website ini adalah platform company profile + Admin CMS untuk komunitas/foundation yang berfokus pada:
- Pengembangan SDM muda.
- Advokasi sosial.
- Riset sosial.
- Social mapping.
- Community development.
- Keberlanjutan lingkungan dan sosial.
- Kolaborasi program berdampak/CSR.

Arah visual:
- Minimalist.
- Interactive.
- Professional.
- On point.
- Tema warna hijau matcha, cream, putih.
- Ada dark mode dan light mode.
- Ada animasi loading.
- Navbar jangan terlalu mainstream: gunakan floating capsule navbar dengan active indicator, backdrop blur, dan mobile command-panel style.
- Ada animasi section reveal dan micro interaction.
- Gunakan 3D asset jika memungkinkan, misalnya abstract seed globe/community network/leaf orb, tetapi harus lazy-loaded dan punya fallback.
- Ambil inspirasi dari website modern seperti Zenless Zone Zero pada level motion, loading, depth, dan interaksi, tetapi jangan menggunakan atau meniru aset milik HoYoverse/ZZZ.

Tech stack:
- Next.js 15 App Router.
- TypeScript.
- Tailwind CSS.
- Supabase Auth.
- Supabase PostgreSQL.
- Supabase Storage.
- Framer Motion.
- next-themes.
- React Hook Form + Zod.
- lucide-react.
- react-markdown untuk konten artikel.
- React Three Fiber/Drei atau Spline embed optional untuk 3D.

Buat struktur route:

```txt
/
├── /about
├── /programs
├── /programs/[slug]
├── /news
├── /news/[slug]
├── /team
├── /research
├── /gallery
├── /contact
├── /login
└── /admin
    ├── /admin/dashboard
    ├── /admin/news
    ├── /admin/news/new
    ├── /admin/news/[id]/edit
    ├── /admin/programs
    ├── /admin/team
    ├── /admin/partners
    ├── /admin/impact
    ├── /admin/media
    ├── /admin/inquiries
    └── /admin/settings
```

Buat homepage dengan section:
1. Loading screen.
2. Floating navbar.
3. Hero section dengan headline:
   “Mengubah Riset Menjadi Aksi, Aksi Menjadi Dampak.”
4. Subheadline:
   “Bestari Nusa adalah komunitas pengembangan SDM muda yang berfokus pada riset sosial, pemberdayaan masyarakat, advokasi sosial, dan keberlanjutan untuk menciptakan peluang berdampak bagi Nusantara.”
5. CTA: “Jelajahi Program” dan “Ajukan Kolaborasi”.
6. About preview.
7. Focus areas:
   - Pengembangan Pemuda & Advokasi Sosial.
   - Riset & Aksi Masyarakat.
   - Keberlanjutan Lingkungan & Sosial.
8. Featured programs.
9. Impact snapshot.
10. Latest news/stories.
11. Team preview.
12. Partner/collaboration CTA.
13. Footer.

Gunakan color tokens:

Light mode:
```css
--background: #FFFDF7;
--foreground: #1F2A24;
--primary: #7A9A5E;
--primary-dark: #405C3B;
--primary-soft: #DDE8D2;
--cream: #F7F0DD;
--muted: #6D7566;
--border: rgba(64, 92, 59, 0.16);
--card: rgba(255, 255, 255, 0.72);
--glow: rgba(184, 217, 139, 0.48);
```

Dark mode:
```css
--background: #0F1A14;
--foreground: #FFF6DE;
--surface: #17231B;
--primary: #A7C77D;
--muted: #CFC7B0;
--border: rgba(255, 246, 222, 0.14);
--card: rgba(23, 35, 27, 0.74);
--glow: rgba(167, 199, 125, 0.32);
```

Admin CMS requirements:
- Login/logout dengan Supabase Auth.
- Protected admin route.
- Role: super_admin, admin, editor, contributor, viewer.
- CRUD News/Stories.
- CRUD Programs.
- CRUD Team Members.
- CRUD Divisions.
- CRUD Partners.
- CRUD Impact Metrics.
- Media Library.
- Contact Inquiries.
- Site Settings.
- SEO fields per content.
- Draft/published/archived status.

Database tables:
- profiles.
- content_categories.
- tags.
- media_assets.
- posts.
- post_tags.
- programs.
- program_gallery.
- divisions.
- team_members.
- partners.
- testimonials.
- impact_metrics.
- publications.
- inquiries.
- pages.
- site_settings.
- audit_logs.

Important implementation details:
- Gunakan Supabase RLS.
- Public hanya bisa membaca konten published/active.
- Admin/editor bisa CRUD sesuai role.
- Gunakan Zod validation pada semua form.
- Gunakan next/image untuk gambar.
- Lazy load 3D component.
- Gunakan `prefers-reduced-motion` untuk mengurangi animasi.
- Jangan expose service role key ke client.
- Buat `.env.example`.
- Buat responsive design untuk mobile, tablet, desktop.
- Buat metadata SEO.
- Buat sitemap dan robots.

Buat komponen utama:
- FloatingNavbar.
- MobileNavPanel.
- LoadingScreen.
- HeroSection.
- Hero3DOrb atau fallback.
- FocusAreaCard.
- ProgramCard.
- NewsCard.
- TeamCard.
- ImpactCounter.
- PartnerMarquee.
- CollaborationCTA.
- Footer.
- ThemeToggle.
- AdminSidebar.
- AdminHeader.
- DataTable.
- ContentEditorForm.
- MediaPicker.
- StatusBadge.

Untuk CMS form, gunakan:
- React Hook Form.
- Zod.
- Toast notification.
- Confirmation modal untuk delete.
- Search/filter pada table.

Tolong implementasikan secara bertahap:
1. Setup project dan design system.
2. Public layout dan homepage.
3. Supabase integration dan auth.
4. Database schema dan RLS.
5. CMS News.
6. CMS Programs.
7. CMS Team/Partners/Impact.
8. Contact form/inquiries.
9. SEO, performance, accessibility.
10. Deployment readiness.

Pastikan hasil code rapi, reusable, typed, responsive, dan siap dikembangkan.



---


# Component Specification — Bestari Nusa Website

Versi: 1.0

---

## 1. Public Components

## 1.1 FloatingNavbar

### Purpose
Navigasi utama public website dengan style non-mainstream.

### Props

```ts
type NavItem = {
  label: string
  href: string
}

type FloatingNavbarProps = {
  items: NavItem[]
  ctaLabel?: string
  ctaHref?: string
}
```

### Behavior

- Floating di top center.
- Backdrop blur.
- Shrink on scroll.
- Active route indicator.
- Desktop: horizontal capsule.
- Mobile: icon button + panel.
- Keyboard accessible.

### Visual

```txt
[Logo]  Home  About  Programs  Stories  Team  Contact  [Collaborate]
```

### Motion

- Initial: fade down.
- Scroll: height smaller.
- Active indicator: spring transition.
- Mobile panel: scale + opacity + staggered items.

---

## 1.2 LoadingScreen

### Purpose
Memberikan first impression yang unik dan branded.

### Behavior

- Muncul saat first visit per session.
- Maksimum 2 detik.
- Skip/reduce animation jika prefers-reduced-motion.
- Setelah selesai, content reveal.

### Visual Concept

```txt
Bestari Nusa
Think → Action → Sustain
[animated matcha seed particles]
```

### Storage

Use:
```ts
sessionStorage.setItem("bestari-loader-seen", "true")
```

---

## 1.3 ThemeToggle

### Purpose
Mengubah light/dark mode.

### Behavior

- Toggle antara light/dark/system.
- Simpan preferensi.
- Icon sun/moon morph.
- Accessible label.

### Props

```ts
type ThemeToggleProps = {
  variant?: "icon" | "pill"
}
```

---

## 1.4 HeroSection

### Purpose
Menjelaskan positioning Bestari Nusa dalam 30 detik pertama.

### Content

Headline:
```txt
Mengubah Riset Menjadi Aksi, Aksi Menjadi Dampak.
```

Subheadline:
```txt
Bestari Nusa adalah komunitas pengembangan SDM muda yang berfokus pada riset sosial, pemberdayaan masyarakat, advokasi sosial, dan keberlanjutan untuk menciptakan peluang berdampak bagi Nusantara.
```

CTA:
- Jelajahi Program.
- Ajukan Kolaborasi.

### Layout

Desktop:
- Left text.
- Right 3D asset.
- Floating badges.

Mobile:
- Text first.
- Static fallback visual.
- CTA stacked.

### Motion

- Headline stagger reveal.
- CTA fade-up.
- 3D slow float.

---

## 1.5 Hero3DOrb

### Purpose
Visual depth di hero.

### Tech

- React Three Fiber + Drei.
- Optional Spline iframe.

### Visual
- Abstract seed/globe.
- Community nodes.
- Matcha glow.
- Slow rotation.

### Fallback
- Static SVG/PNG if WebGL unavailable.

### Performance
- Dynamic import.
- Only render on md+ screens.
- Lazy load.

---

## 1.6 FocusAreaCard

### Props

```ts
type FocusAreaCardProps = {
  title: string
  description: string
  icon: React.ReactNode
  index?: number
}
```

### Items

1. Pengembangan Pemuda & Advokasi Sosial.
2. Riset & Aksi Masyarakat.
3. Keberlanjutan Lingkungan & Sosial.

### Motion

- Reveal on scroll.
- Hover lift 6px.
- Border glow.

---

## 1.7 ProgramCard

### Props

```ts
type ProgramCardProps = {
  title: string
  slug: string
  summary: string
  status: "upcoming" | "ongoing" | "completed" | "archived"
  category?: string
  coverImageUrl?: string
  impactSummary?: string
}
```

### Behavior

- Click to detail page.
- Status badge.
- Image zoom on hover.
- Show impact summary if available.

---

## 1.8 NewsCard

### Props

```ts
type NewsCardProps = {
  title: string
  slug: string
  excerpt: string
  coverImageUrl?: string
  category?: string
  publishedAt?: string
  readingTime?: number
}
```

### Behavior

- Click to detail page.
- Category badge.
- Date formatting.
- Image fallback.
- Hover overlay.

---

## 1.9 ImpactCounter

### Props

```ts
type ImpactCounterProps = {
  label: string
  value: number
  suffix?: string
  description?: string
  icon?: React.ReactNode
}
```

### Behavior

- Count up when visible.
- Reduced motion: show static value.
- CMS-driven.

---

## 1.10 TeamCard

### Props

```ts
type TeamCardProps = {
  name: string
  position: string
  division?: string
  photoUrl?: string
  bio?: string
  socialLinks?: {
    instagram?: string
    linkedin?: string
    email?: string
  }
}
```

### Behavior

- Hover reveal bio.
- Click optional for modal.
- Division tag.

---

## 1.11 PartnerMarquee

### Props

```ts
type PartnerMarqueeProps = {
  partners: {
    name: string
    logoUrl?: string
    websiteUrl?: string
  }[]
}
```

### Behavior

- Auto-scroll subtle.
- Pause on hover.
- Accessible static list for reduced motion.

---

## 1.12 CollaborationCTA

### Purpose
Mendorong calon mitra menghubungi Bestari Nusa.

### Copy

```txt
Mari Merancang Dampak Bersama
```

```txt
Kami terbuka untuk kolaborasi program, riset sosial, pendampingan masyarakat, media partnership, dan inisiatif keberlanjutan.
```

CTA:
- Hubungi Kami.
- Lihat Program.

---

## 1.13 Footer

### Content

- Logo.
- Short description.
- Quick links.
- Program links.
- Contact.
- Social media.
- Copyright.

---

# 2. Admin Components

## 2.1 AdminSidebar

### Items

```txt
Dashboard
News
Programs
Team
Partners
Impact
Media
Inquiries
Settings
Users
```

### Behavior

- Collapsible.
- Active route.
- Mobile drawer.
- Role-based item visibility.

---

## 2.2 AdminHeader

Features:
- Current page title.
- Search optional.
- Theme toggle.
- User avatar.
- Logout.

---

## 2.3 DataTable

### Props

```ts
type DataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T>[]
  searchKey?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
}
```

### Features

- Search.
- Sort.
- Filter.
- Pagination.
- Empty state.
- Row actions.

---

## 2.4 StatusBadge

### Status

Content:
- draft.
- in_review.
- scheduled.
- published.
- archived.

Program:
- upcoming.
- ongoing.
- completed.
- archived.

Inquiry:
- new.
- read.
- in_progress.
- replied.
- closed.
- spam.

---

## 2.5 ContentEditorForm

### Purpose
Reusable form untuk News, Program, Publication.

### Features

- Title.
- Slug auto-generate.
- Excerpt/summary.
- Markdown editor.
- Cover image picker.
- Category.
- Status.
- SEO fields.
- Preview.
- Save draft.
- Publish.

---

## 2.6 MediaPicker

### Features

- Upload.
- Search.
- Select existing media.
- Preview image.
- Alt text.
- Folder selection.
- Copy URL.

---

## 2.7 InquiryDetailPanel

### Features

- View contact info.
- View message.
- Change status.
- Add internal notes.
- Mark as replied.
- Spam/delete.

---

# 3. Page Templates

## 3.1 Public Listing Page

Use for:
- News.
- Programs.
- Gallery.
- Research.

Sections:
1. Page hero.
2. Filter/search.
3. Featured item optional.
4. Grid listing.
5. Pagination.
6. CTA.

---

## 3.2 Public Detail Page

Use for:
- News detail.
- Program detail.
- Research detail.

Sections:
1. Detail hero.
2. Metadata.
3. Content.
4. Gallery/media.
5. Related content.
6. CTA.

---

## 3.3 Admin CRUD Page

Sections:
1. Header with title and create button.
2. Filter/search.
3. Data table.
4. Row action.
5. Pagination.

---

# 4. Empty States

## News Empty

```txt
Belum ada cerita yang dipublikasikan.
Mulai tambahkan berita atau cerita dampak dari CMS.
```

## Programs Empty

```txt
Program belum tersedia.
Silakan tambahkan program melalui Admin CMS.
```

## Team Empty

```txt
Struktur tim belum ditampilkan.
Tambahkan anggota aktif melalui CMS.
```

## Inquiry Empty

```txt
Belum ada pesan masuk.
```

---

# 5. Loading States

- Skeleton card.
- Table skeleton.
- Button loading spinner.
- Page transition.
- 3D fallback loader.

---

# 6. Error States

## Public Error

```txt
Konten belum dapat dimuat.
Silakan coba beberapa saat lagi.
```

## Admin Error

```txt
Gagal menyimpan perubahan. Periksa koneksi atau coba kembali.
```

## Form Error

```txt
Mohon periksa kembali data yang wajib diisi.
```

---

# 7. Accessibility Requirements

All components:
- Must support keyboard navigation.
- Must have focus visible.
- Icon-only button requires aria-label.
- Image requires alt.
- Motion respects reduced motion.
- Form error linked to input.



---

