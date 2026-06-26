// Local storage and memory-based database simulator for Bestari Nusa website
// Enables complete CMS functionality offline or without Supabase connection.

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'news' | 'program' | 'research' | 'gallery';
  description: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category_id: string;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  reading_time: number;
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category_id: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'archived';
  location: string;
  start_date: string;
  end_date: string;
  cover_image: string;
  gallery: string[];
  objectives: string[];
  target_beneficiaries: string;
  approach: string;
  impact_summary: string;
  impact_metrics: { label: string; value: string }[];
  registration_url: string;
  collaboration_cta: string;
  is_featured: boolean;
  order_index: number;
  seo_title?: string;
  seo_description?: string;
}

export interface Division {
  id: string;
  name: string;
  slug: string;
  description: string;
  order_index: number;
}

export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  position: string;
  division_id: string;
  photo: string;
  bio: string;
  email: string;
  social_links: { instagram?: string; linkedin?: string; twitter?: string };
  order_index: number;
  is_featured: boolean;
  is_active: boolean;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website_url: string;
  partnership_type: string;
  year: number;
  is_featured: boolean;
  order_index: number;
  is_active: boolean;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  icon: string;
  order_index: number;
  is_active: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  inquiry_type: 'collaboration' | 'csr' | 'media' | 'volunteer' | 'research' | 'general';
  message: string;
  status: 'new' | 'read' | 'in_progress' | 'replied' | 'closed' | 'spam';
  internal_notes: string;
  created_at: string;
}

// Initial Mock Seed Data
const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-news-1', name: 'Berita Kegiatan', slug: 'berita-kegiatan', type: 'news', description: 'Update kegiatan resmi Bestari Nusa' },
  { id: 'cat-news-2', name: 'Cerita Dampak', slug: 'cerita-dampak', type: 'news', description: 'Cerita perubahan dari program' },
  { id: 'cat-news-3', name: 'Riset Sosial', slug: 'riset-sosial', type: 'news', description: 'Insight berbasis riset sosial' },
  { id: 'cat-prog-1', name: 'Youth Development', slug: 'youth-development', type: 'program', description: 'Pengembangan pemuda' },
  { id: 'cat-prog-2', name: 'Community Development', slug: 'community-development', type: 'program', description: 'Pemberdayaan masyarakat' },
  { id: 'cat-prog-3', name: 'Sustainability', slug: 'sustainability', type: 'program', description: 'Keberlanjutan lingkungan' },
  { id: 'cat-prog-4', name: 'CSR Collaboration', slug: 'csr-collaboration', type: 'program', description: 'Kemitraan korporasi' }
];

const DEFAULT_DIVISIONS: Division[] = [
  { id: 'div-1', name: 'Executive Council', slug: 'executive-council', description: 'Dewan pengurus inti', order_index: 1 },
  { id: 'div-2', name: 'Research & Development', slug: 'research-development', description: 'Tim riset dan kajian sosial', order_index: 2 },
  { id: 'div-3', name: 'Community Empowerment', slug: 'community-empowerment', description: 'Tim pemberdayaan lapangan', order_index: 3 },
  { id: 'div-4', name: 'Program & Partnerships', slug: 'program-partnerships', description: 'Tim kemitraan & CSR', order_index: 4 }
];

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Yui Zahana, S.Sos., M.Si',
    slug: 'yui-zahana',
    position: 'Direktur & Senior Researcher',
    division_id: 'div-1',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Keahlian: Social Mapping, SROI, Stakeholder Engagement. Pendidikan: S.Sos Sosiologi - Universitas Sriwijaya (2023) | M.Si Magister Sosiologi - Universitas Sriwijaya (2025).',
    email: 'yui.zahana@bestarinusa.id',
    social_links: { linkedin: 'https://linkedin.com/in/yuizahana' },
    order_index: 1,
    is_featured: true,
    is_active: true
  },
  {
    id: 'team-3',
    name: 'Dinar Try Akbar, S.Sos., M.Si',
    slug: 'dinar-try-akbar',
    position: 'Senior Researcher',
    division_id: 'div-2',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Keahlian: Social Mapping, Community Involvement and Development. Pendidikan: S.Sos Sosiologi - Universitas Sriwijaya (2023) | M.Si Magister Pengelolaan Lingkungan - Pascasarjana Unsri (2025) | Dr Ilmu Lingkungan - Pascasarjana Unsri (Present).',
    email: 'dinar.try@bestarinusa.id',
    social_links: { linkedin: 'https://linkedin.com' },
    order_index: 2,
    is_featured: true,
    is_active: true
  },
  {
    id: 'team-2',
    name: 'Fadila Nur Amalia, S.H., M.I.Pol',
    slug: 'fadila-nur-amalia',
    position: 'Senior Researcher',
    division_id: 'div-2',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Keahlian: Public Policy, Risk Management. Pendidikan: S.H Hukum - Universitas Sriwijaya (2017) | M.I.Pol FISIP - Universitas Padjadjaran (2024).',
    email: 'fadila.nur@bestarinusa.id',
    social_links: { linkedin: 'https://linkedin.com' },
    order_index: 3,
    is_featured: true,
    is_active: true
  },
  {
    id: 'team-5',
    name: 'Maharani, S.Sos',
    slug: 'maharani',
    position: 'Senior Researcher',
    division_id: 'div-2',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Keahlian: Social Mapping, Social Return on Investment. Pendidikan: S.Sos Sosiologi - Universitas Sriwijaya (2025).',
    email: 'maharani@bestarinusa.id',
    social_links: { linkedin: 'https://linkedin.com' },
    order_index: 4,
    is_featured: false,
    is_active: true
  },
  {
    id: 'team-4',
    name: 'Detia Zalyanti, S.Sos',
    slug: 'detia-zalyanti',
    position: 'Senior Researcher',
    division_id: 'div-2',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Keahlian: Indeks Kepuasan Masyarakat, Social Return on Investment. Pendidikan: S.Sos Sosiologi - Universitas Sriwijaya (2024) | M.Sc PSdK - Universitas Gadjah Mada (Present).',
    email: 'detia.zalyanti@bestarinusa.id',
    social_links: { linkedin: 'https://linkedin.com' },
    order_index: 5,
    is_featured: false,
    is_active: true
  },
  {
    id: 'team-6',
    name: 'Wardah Habiba, S.Sos',
    slug: 'wardah-habiba',
    position: 'Assistant & Junior Researcher',
    division_id: 'div-2',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Keahlian: Social Mapping, Stakeholder Engagement. Pendidikan: S.Sos Sosiologi - Universitas Sriwijaya (2026).',
    email: 'wardah.habiba@bestarinusa.id',
    social_links: { instagram: 'https://instagram.com' },
    order_index: 6,
    is_featured: false,
    is_active: true
  },
  {
    id: 'team-7',
    name: 'M. Syaifuddin Aziz, S.Sos',
    slug: 'm-syaifuddin-aziz',
    position: 'Assistant & Junior Researcher',
    division_id: 'div-2',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Keahlian: Social Mapping, SROI. Pendidikan: S.Sos Sosiologi - Universitas Sriwijaya (2026).',
    email: 'syaifuddin.aziz@bestarinusa.id',
    social_links: { linkedin: 'https://linkedin.com' },
    order_index: 7,
    is_featured: false,
    is_active: true
  },
  {
    id: 'team-8',
    name: 'Salsabila Nanda F., S.Sos',
    slug: 'salsabila-nanda-f',
    position: 'Assistant & Junior Researcher',
    division_id: 'div-2',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Keahlian: IKM, SROI. Pendidikan: S.Sos Sosiologi - Universitas Sriwijaya (2026).',
    email: 'salsabila.nanda@bestarinusa.id',
    social_links: { instagram: 'https://instagram.com' },
    order_index: 8,
    is_featured: false,
    is_active: true
  }
];

const DEFAULT_IMPACT: ImpactMetric[] = [
  { id: 'imp-1', label: 'Program Terlaksana', value: 10, suffix: '+', description: 'Inisiatif sosial, riset, dan pengembangan komunitas', icon: 'leaf', order_index: 1, is_active: true },
  { id: 'imp-2', label: 'Relawan Terlibat', value: 500, suffix: '+', description: 'Pemuda, dosen, dan relawan korporasi', icon: 'users', order_index: 2, is_active: true },
  { id: 'imp-3', label: 'Mitra Kerja Sama', value: 10, suffix: '+', description: 'Korporasi, BUMN, dan institusi akademik', icon: 'handshake', order_index: 3, is_active: true },
  { id: 'imp-4', label: 'Sampah Terkelola', value: 5254, suffix: '+ Kg', description: 'Reduksi sampah lingkungan dari aksi Employee Green Involvement', icon: 'trash-2', order_index: 4, is_active: true },
  { id: 'imp-5', label: 'Pohon Ditanam', value: 3500, suffix: '+', description: 'Bibit mangrove dan pohon pelindung di berbagai lokasi', icon: 'trees', order_index: 5, is_active: true }
];

const DEFAULT_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    title: 'Energy Youth Movement: Mangrove Conservation',
    slug: 'energy-youth-movement-mangrove',
    summary: 'Mangrove Conservation For A Sustainability Environment - Hari Lingkungan Hidup Sedunia.',
    description: 'Program ini fokus pada pelestarian ekosistem pesisir melalui pembuatan Pojok Literasi Mangrove untuk sarana edukasi anak-anak, penanaman serentak 2.000 bibit mangrove bersama 150 relawan dari mahasiswa, dosen, dan staf PLN, serta inovasi hilirisasi berupa pembuatan sabun alami dari ekstrak buah mangrove pedada (Sonneratia Caseolaris).',
    category_id: 'cat-prog-3',
    status: 'completed',
    location: 'Pesisir Sumatera Selatan',
    start_date: '2023-06-05',
    end_date: '2023-06-08',
    cover_image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800&h=500'
    ],
    objectives: [
      'Sarana edukasi & literasi ekosistem pesisir',
      'Penanaman 2.000 bibit mangrove',
      'Produksi sabun alami buah pedada'
    ],
    target_beneficiaries: 'Masyarakat pesisir dan pengunjung edukasi',
    approach: 'Community collaboration, eco-education, green volunteering',
    impact_summary: 'Mendukung capaian Tujuan Pembangunan Berkelanjutan (SDGs) pilar lingkungan.',
    impact_metrics: [
      { label: 'Bibit Pohon', value: '2.000' },
      { label: 'Relawan Terlibat', value: '150' }
    ],
    registration_url: '',
    collaboration_cta: 'Lihat Dokumentasi',
    is_featured: true,
    order_index: 1
  },
  {
    id: 'prog-2',
    title: 'Konservasi Mangrove Berbasis Masyarakat',
    slug: 'konservasi-mangrove-sungsang',
    summary: 'Pengelolaan Konservasi Mangrove Berbasis Masyarakat di Desa Sungsang IV, Banyuasin.',
    description: 'Program penguatan kapasitas kelompok lokal dalam pembibitan mangrove (nursery ground) serta penyusunan modul belajar ekosistem mangrove khusus anak-anak tingkat SD dan SMP di Desa Sungsang IV.',
    category_id: 'cat-prog-2',
    status: 'completed',
    location: 'Desa Sungsang IV, Banyuasin',
    start_date: '2024-04-10',
    end_date: '2024-10-15',
    cover_image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [],
    objectives: [
      'Penguatan kapasitas kelompok tani hutan',
      'Pembuatan nursery ground',
      'Modul belajar sekolah dasar & menengah'
    ],
    target_beneficiaries: 'Kelompok pembibit lokal dan siswa sekolah dasar/menengah',
    approach: 'Capacity building, participatory training, module formulation',
    impact_summary: 'Membangun kemandirian ekologis dan kesadaran lingkungan anak usia sekolah.',
    impact_metrics: [
      { label: 'Modul Sekolah', value: '2 Tingkat' },
      { label: 'Nursery Ground', value: '1 Unit' }
    ],
    registration_url: '',
    collaboration_cta: 'Hubungi Kemitraan',
    is_featured: true,
    order_index: 2
  },
  {
    id: 'prog-eko',
    title: 'Ekoeduwisata Mangrove Terpadu',
    slug: 'ekoeduwisata-mangrove-terpadu',
    summary: 'Kawasan ekowisata terpadu berbasis sosial, ekologi, dan ekonomi di Desa Sungsang IV.',
    description: 'Program pengembangan kawasan mangrove Desa Sungsang IV sebagai ruang edukasi, konservasi, dan potensi ekonomi masyarakat. Melibatkan pembangunan Pojok Literasi Mangrove Sungsang IV dan edukasi keanekaragaman hayati (satwa dan tumbuhan). Mendukung SDGs Quality Education, Decent Work & Economic Growth, dan Climate Action.',
    category_id: 'cat-prog-3',
    status: 'completed',
    location: 'Desa Sungsang IV, Banyuasin',
    start_date: '2024-05-01',
    end_date: '2024-11-30',
    cover_image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [],
    objectives: [
      'Ekoeduwisata dengan pendekatan sosial, ekologi, dan ekonomi',
      'Pojok Literasi Mangrove Sungsang IV',
      'Edukasi flora & fauna ekosistem pesisir'
    ],
    target_beneficiaries: 'Masyarakat Desa Sungsang IV dan anak-anak sekolah',
    approach: 'Community eco-education, biodiversity awareness',
    impact_summary: 'Menyediakan sarana edukasi tentang keanekaragaman hayati untuk literasi pesisir.',
    impact_metrics: [
      { label: 'Pojok Literasi', value: '1 Unit' },
      { label: 'SDGs Didukung', value: '3 Pilar' }
    ],
    registration_url: '',
    collaboration_cta: 'Detail Program',
    is_featured: false,
    order_index: 3
  },
  {
    id: 'prog-3',
    title: 'Employee Green Involvement',
    slug: 'employee-green-involvement',
    summary: 'Aksi lingkungan pengumpulan sampah didukung penuh oleh PT PLN UIP Sumbagsel.',
    description: 'Program aksi bersih lingkungan terpadu yang melibatkan 152 relawan pegawai PLN, Dinas Lingkungan Hidup Palembang, komunitas Bank Sampah, serta dosen dan mahasiswa FISIP Unsri. Aksi ini berhasil mengumpulkan dan mengolah 5.254 kg sampah menjadi barang kerajinan bernilai guna.',
    category_id: 'cat-prog-4',
    status: 'completed',
    location: 'Ekowisata Mangrove Palembang',
    start_date: '2024-07-20',
    end_date: '2024-07-22',
    cover_image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [],
    objectives: [
      'Aksi pembersihan ekowisata terpadu',
      'Penyaluran sampah ke Bank Sampah',
      'Kolaborasi pentahelix'
    ],
    target_beneficiaries: 'Ekowisata lokal dan komunitas bank sampah',
    approach: 'Employee volunteering, circular economy processing',
    impact_summary: 'Pengurangan sampah plastik di ekosistem pesisir kota.',
    impact_metrics: [
      { label: 'Sampah Terkumpul', value: '5.254 Kg' },
      { label: 'Relawan Pegawai', value: '152' },
      { label: 'Pihak Terlibat', value: '4 Instansi' }
    ],
    registration_url: '',
    collaboration_cta: 'Lihat Laporan',
    is_featured: true,
    order_index: 4
  },
  {
    id: 'prog-4',
    title: 'Energizing Green Space',
    slug: 'energizing-green-space',
    summary: 'Penanaman 1.000 pohon di lahan bekas pembuangan sampah TPA Kramasan.',
    description: 'Rehabilitasi lahan non-produktif bekas pembuangan sampah TPA Kramasan Palembang dengan menanam 1.000 bibit pohon keras. Program ini dilakukan dalam rangka Hari Menanam Pohon Indonesia bersama 150 relawan dari DLH, PLN, dosen dan mahasiswa.',
    category_id: 'cat-prog-3',
    status: 'completed',
    location: 'TPA Kramasan, Palembang',
    start_date: '2024-11-28',
    end_date: '2024-11-30',
    cover_image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [],
    objectives: [
      'Rehabilitasi lahan bekas TPA',
      'Penanaman 1.000 pohon pelindung',
      'Kampanye hijau bersama mahasiswa'
    ],
    target_beneficiaries: 'Masyarakat sekitar Kramasan',
    approach: 'Land rehabilitation, collaborative planting',
    impact_summary: 'Pencegahan pencemaran tanah dan peningkatan luasan ruang terbuka hijau.',
    impact_metrics: [
      { label: 'Pohon Ditanam', value: '1.000' },
      { label: 'Volunteer', value: '150' }
    ],
    registration_url: '',
    collaboration_cta: 'Dukung Aksi',
    is_featured: false,
    order_index: 5
  },
  {
    id: 'prog-5',
    title: 'Kampung Hijau Desa Segayam',
    slug: 'kampung-hijau-segayam',
    summary: 'Penanaman 500 pohon kebun durian dan pengolahan sampah organik budidaya maggot.',
    description: 'Program revitalisasi pertanian hortikultura melalui penanaman 500 bibit durian unggul dikombinasikan dengan edukasi pengolahan sampah rumah tangga berbasis budidaya maggot untuk pakan alternatif.',
    category_id: 'cat-prog-2',
    status: 'completed',
    location: 'Desa Segayam, Muara Enim',
    start_date: '2024-05-15',
    end_date: '2024-09-20',
    cover_image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [],
    objectives: [
      'Hortikultura kebun durian',
      'Pengelolaan sampah organik warga',
      'Pembangunan kandang maggot'
    ],
    target_beneficiaries: 'Petani dan warga Desa Segayam',
    approach: 'Circular village concept, community empowerment',
    impact_summary: 'Diversifikasi penghasilan pertanian dan reduksi sampah organik.',
    impact_metrics: [
      { label: 'Bibit Durian', value: '500 Pohon' },
      { label: 'Budidaya Maggot', value: '1 Unit' }
    ],
    registration_url: '',
    collaboration_cta: 'Detail Program',
    is_featured: false,
    order_index: 6
  },
  {
    id: 'prog-6',
    title: 'Zero Waste Warriors',
    slug: 'zero-waste-warriors',
    summary: 'Penempatan drop box sampah botol plastik terintegrasi Bank Sampah.',
    description: 'Inovasi sirkular berupa pengadaan dan penempatan 10 drop box botol plastik pintar di taman dan ruang publik Kota Palembang. Aksi ini didukung edukasi bahaya sampah plastik dan clean up massal bersama 200 relawan.',
    category_id: 'cat-prog-3',
    status: 'completed',
    location: 'Taman Publik Palembang',
    start_date: '2025-06-05',
    end_date: '2025-06-10',
    cover_image: 'https://images.unsplash.com/photo-1605600611280-146e68892f6b?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [],
    objectives: [
      'Penempatan 10 unit drop box',
      'Kampanye edukasi bahaya plastik',
      'Clean up massal ruang publik'
    ],
    target_beneficiaries: 'Warga Kota Palembang',
    approach: 'Public space recycling infrastructure, social volunteering',
    impact_summary: 'Membantu pengumpulan botol plastik sekali pakai langsung dari sumbernya.',
    impact_metrics: [
      { label: 'Drop Box', value: '10 Unit' },
      { label: 'Partisipan', value: '200 Orang' }
    ],
    registration_url: '',
    collaboration_cta: 'Hubungi Kami',
    is_featured: true,
    order_index: 7
  },
  {
    id: 'prog-7',
    title: 'Ketahanan Pangan & UMKM Air Sempiang',
    slug: 'ketahanan-pangan-air-sempiang',
    summary: 'Pemberdayaan UMK Putri Landbouw Desa Air Sempiang, Bengkulu.',
    description: 'Program pendampingan berkelanjutan untuk 30 perempuan dalam kelompok UMK Putri Landbouw di Bengkulu untuk mengolah hasil pertanian lokal bernilai tambah dengan prinsip ekonomi sirkuler. Didampingi oleh tim ahli dari FISIP Unsri.',
    category_id: 'cat-prog-2',
    status: 'completed',
    location: 'Desa Air Sempiang, Bengkulu',
    start_date: '2025-03-01',
    end_date: '2025-10-31',
    cover_image: 'https://images.unsplash.com/photo-1595275313395-5d9c669fb718?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [],
    objectives: [
      'Pembinaan 30 perempuan pelaku usaha',
      'Hilirisasi hasil pertanian lokal',
      'Pelatihan sirkuler & pemasaran'
    ],
    target_beneficiaries: 'Kelompok UMK Putri Landbouw',
    approach: 'Women economic empowerment, circular food economy',
    impact_summary: 'Meningkatkan ketahanan pangan dan perekonomian mikro keluarga.',
    impact_metrics: [
      { label: 'Perempuan Dibina', value: '30 Orang' },
      { label: 'Produk Baru', value: '3 Varian' }
    ],
    registration_url: '',
    collaboration_cta: 'Detail Program',
    is_featured: true,
    order_index: 8
  },
  {
    id: 'prog-8',
    title: 'Menjaga Air untuk Bumi yang Tangguh',
    slug: 'menjaga-air-sungai-pedado',
    summary: 'Program Adaptasi Perubahan Iklim bermitra PT PLN UIP Sumbagsel di Kampung Sungai Pedado, Palembang.',
    description: 'Program adaptasi perubahan iklim bermitra PT PLN Persero UIP Sumbagsel di Kampung Sungai Pedado, Kelurahan Keramasan, Kecamatan Kertapati, Kota Palembang. Masyarakat Sungai Pedado telah puluhan tahun hidup tanpa akses air bersih yang layak dan bergantung langsung pada air sungai untuk mandi, mencuci, dan memasak. Setelah survei lokasi ditemukan lahan wakaf dengan bangunan hampir tidak layak pakai, akses jalan rusak parah, dan lokasi kerap tergenang saat air Sungai Musi pasang. Melalui mufakat warga, lokasi dibangun kembali menjadi MCK umum, pusat kontrol distribusi air bersih, taman bunga, dan lahan TOGA. Pembangunan mencakup instalasi pipanisasi air bersih, pembuatan 2 titik sumur bor sedalam 30-40 meter, pemasangan 3 unit penerangan lampu jalan, perbaikan akses jalan, serta pembangunan taman bunga dan lahan Tanaman Obat Keluarga.',
    category_id: 'cat-prog-2',
    status: 'completed',
    location: 'Kampung Sungai Pedado, Kel. Keramasan, Kec. Kertapati, Palembang',
    start_date: '2025-07-01',
    end_date: '2025-11-30',
    cover_image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [],
    objectives: [
      'Pembangunan MCK umum & pusat kontrol distribusi air bersih',
      'Pembuatan 2 sumur bor sedalam 30-40 meter',
      'Instalasi 3 titik penerangan lampu jalan',
      'Pembuatan taman bunga & lahan TOGA'
    ],
    target_beneficiaries: 'Masyarakat Kampung Sungai Pedado',
    approach: 'Infrastructure rehabilitation, clean water piping, ecological garden',
    impact_summary: 'Menyediakan akses sanitasi dan air bersih pertama yang layak bagi puluhan keluarga yang sebelumnya bergantung langsung pada air Sungai Musi.',
    impact_metrics: [
      { label: 'Sumur Bor', value: '2 Titik' },
      { label: 'Penerangan Jalan', value: '3 Titik' },
      { label: 'Lahan TOGA', value: '1 Unit' },
      { label: 'MCK Umum', value: '1 Unit' }
    ],
    registration_url: '',
    collaboration_cta: 'Hubungi Kami',
    is_featured: true,
    order_index: 9
  },
  {
    id: 'prog-9',
    title: 'Pendampingan Pengembangan Nanas Kelekar',
    slug: 'pendampingan-nanas-kelekar',
    summary: 'Program pendampingan masyarakat dan komoditas lokal binaan PT Bukit Asam.',
    description: 'Program kemitraan dan binaan PT Bukit Asam yang berfokus pada pendampingan masyarakat, pengembangan komoditas lokal (Nanas Kelekar), dan penguatan potensi ekonomi berbasis produk daerah. Detail program lebih lanjut belum dicantumkan pada slide resmi.',
    category_id: 'cat-prog-4',
    status: 'ongoing',
    location: 'Data belum tersedia di brief',
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    cover_image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [],
    objectives: [
      'Pendampingan masyarakat',
      'Pengembangan komoditas lokal (Nanas Kelekar)',
      'Penguatan potensi ekonomi berbasis produk daerah'
    ],
    target_beneficiaries: 'Data belum tersedia di brief',
    approach: 'Data belum tersedia di brief',
    impact_summary: 'Data belum tersedia di brief',
    impact_metrics: [],
    registration_url: '',
    collaboration_cta: 'Hubungi Kami',
    is_featured: false,
    order_index: 10
  }
];

const DEFAULT_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Pentingnya Evidence-Based Aksi bagi Komunitas Pemuda',
    slug: 'pentingnya-evidence-based-aksi',
    excerpt: 'Mengapa riset sosial harus mendahului aksi lapangan? Menghindari jebakan program yang tidak sesuai sasaran.',
    content: `
# Mengapa Riset Harus Mendahului Aksi?

Banyak gerakan sosial yang didasari oleh semangat membara, namun berakhir tanpa dampak berkelanjutan karena tidak memahami kebutuhan nyata masyarakat. Di Bestari Nusa, kami menerapkan prinsip **Think before Act**.

## Tantangan Aksi Sosial Konvensional
Seringkali komunitas membuat bantuan pangan atau pelatihan bisnis tanpa memetakan:
1. **Siapa aktor dominan** di desa tersebut?
2. **Bagaimana pola relasi kuasa** lokal?
3. **Apakah pelatihan tersebut benar-benar relevan** dengan mata pencaharian setempat?

## Pendekatan Riset Sosial Partisipatif
Dengan riset sosial, pemuda diajak untuk tinggal bersama warga, mendengarkan keluhan mereka, dan melakukan tabulasi aset desa. Data inilah yang akan menjadi cetak biru program agar investasi waktu, tenaga, dan dana melahirkan dampak sosial yang lestari.
    `,
    cover_image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800&h=500',
    category_id: 'cat-news-3',
    author_id: 'team-1',
    status: 'published',
    is_featured: true,
    published_at: '2026-06-10T08:00:00Z',
    seo_title: 'Pentingnya Evidence-Based Aksi Sosial Pemuda',
    seo_description: 'Pelajari mengapa riset sosial sangat penting sebagai langkah awal sebelum merancang program aksi sosial masyarakat.',
    reading_time: 3
  },
  {
    id: 'post-2',
    title: 'Bestari Nusa Resmikan Program Kolaborasi Pemberdayaan Lingkungan Desa',
    slug: 'bestari-nusa-resmikan-kolaborasi-desa',
    excerpt: 'Melalui program CSR, kami memulai langkah restorasi ekologis berbasis ekonomi kreatif di wilayah pesisir.',
    content: `
# Restorasi Lingkungan Pesisir Berkelanjutan

Bestari Nusa bersama mitra CSR meresmikan program aksi bersama di Desa Muara Baru. Fokus dari kolaborasi ini adalah menanam mangrove sembari mengembangkan potensi pengolahan pangan lokal oleh ibu-ibu BUMDes.

## Tiga pilar utama dalam projek ini:
- **Restorasi**: Pemulihan ekosistem bibir pantai guna mencegah abrasi.
- **Edukasi**: Pelatihan pemuda desa dalam pengelolaan ekowisata mandiri.
- **Ekonomi**: Pengolahan buah mangrove menjadi sirup khas bernilai jual tinggi.
    `,
    cover_image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800&h=500',
    category_id: 'cat-news-1',
    author_id: 'team-1',
    status: 'published',
    is_featured: false,
    published_at: '2026-06-12T14:30:00Z',
    reading_time: 2
  }
];

const DEFAULT_PARTNERS: Partner[] = [
  { id: 'part-1', name: 'PT PLN UIP Sumbagsel', slug: 'pln-uip-sumbagsel', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://pln.co.id', partnership_type: 'CSR', year: 2024, is_featured: true, order_index: 1, is_active: true },
  { id: 'part-2', name: 'PT Bukit Asam', slug: 'bukit-asam', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://ptba.co.id', partnership_type: 'CSR', year: 2026, is_featured: true, order_index: 2, is_active: true },
  { id: 'part-3', name: 'PT Pusri Palembang', slug: 'pusri-palembang', logo: 'https://images.unsplash.com/photo-1618005198143-e528346d9a59?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://pusri.co.id', partnership_type: 'CSR', year: 2023, is_featured: true, order_index: 3, is_active: true },
  { id: 'part-4', name: 'PT Pertamina EP', slug: 'pertamina-ep', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://pertamina.com', partnership_type: 'CSR', year: 2022, is_featured: true, order_index: 4, is_active: true },
  { id: 'part-5', name: 'PT Medco E&P Indonesia', slug: 'medco-ep-indonesia', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://medcoenergi.com', partnership_type: 'CSR', year: 2025, is_featured: true, order_index: 5, is_active: true },
  { id: 'part-6', name: 'Universitas Sriwijaya (FISIP)', slug: 'unsri', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://unsri.ac.id', partnership_type: 'Academic', year: 2023, is_featured: true, order_index: 6, is_active: true },
  { id: 'part-7', name: 'PT Pertamina Geothermal Energy', slug: 'pertamina-geothermal', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://pge.pertamina.com', partnership_type: 'CSR', year: 2024, is_featured: true, order_index: 7, is_active: true },
  { id: 'part-8', name: 'PT Supreme Energy', slug: 'supreme-energy', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://supreme-energy.com', partnership_type: 'CSR', year: 2025, is_featured: true, order_index: 8, is_active: true },
  { id: 'part-9', name: 'PT Oki Pulp & Paper Mills', slug: 'oki-pulp-paper', logo: 'https://images.unsplash.com/photo-1618005198143-e528346d9a59?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://www.aprilasia.com', partnership_type: 'CSR', year: 2023, is_featured: false, order_index: 9, is_active: true },
  { id: 'part-10', name: 'PT PLN Nusantara Power', slug: 'pln-nusantara-power', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://pln.co.id', partnership_type: 'CSR', year: 2025, is_featured: false, order_index: 10, is_active: true }
];

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Rudi Pratama',
    email: 'rudi.pratama@corporate.com',
    phone: '08123456789',
    institution: 'PT Cahaya Abadi',
    inquiry_type: 'csr',
    message: 'Halo Bestari Nusa, kami tertarik untuk melakukan pemetaan sosial (social mapping) di daerah ring 1 perusahaan kami di Sumatera Selatan. Apakah kita bisa jadwalkan sesi diskusi singkat?',
    status: 'new',
    internal_notes: 'Rencana diskusi awal hari Selasa jam 10 pagi.',
    created_at: '2026-06-13T10:00:00Z'
  }
];

// Helper to access LocalStorage safely in Next.js SSR
const isClient = typeof window !== 'undefined';

const getStoredData = <T>(key: string, defaults: T): T => {
  if (!isClient) return defaults;
  const stored = localStorage.getItem(`bestari_db_${key}`);
  return stored ? JSON.parse(stored) : defaults;
};

const setStoredData = <T>(key: string, data: T): void => {
  if (isClient) {
    localStorage.setItem(`bestari_db_${key}`, JSON.stringify(data));
  }
};

// Database store object
export const MockDb = {
  getCategories: () => getStoredData('categories', DEFAULT_CATEGORIES),
  saveCategories: (data: Category[]) => setStoredData('categories', data),

  getDivisions: () => getStoredData('divisions', DEFAULT_DIVISIONS),
  saveDivisions: (data: Division[]) => setStoredData('divisions', data),

  getTeamMembers: () => getStoredData('team_members', DEFAULT_MEMBERS),
  saveTeamMembers: (data: TeamMember[]) => setStoredData('team_members', data),

  getImpactMetrics: () => getStoredData('impact_metrics', DEFAULT_IMPACT),
  saveImpactMetrics: (data: ImpactMetric[]) => setStoredData('impact_metrics', data),

  getPrograms: () => getStoredData('programs', DEFAULT_PROGRAMS),
  savePrograms: (data: Program[]) => setStoredData('programs', data),

  getPosts: () => getStoredData('posts', DEFAULT_POSTS),
  savePosts: (data: Post[]) => setStoredData('posts', data),

  getPartners: () => getStoredData('partners', DEFAULT_PARTNERS),
  savePartners: (data: Partner[]) => setStoredData('partners', data),

  getInquiries: () => getStoredData('inquiries', DEFAULT_INQUIRIES),
  saveInquiries: (data: Inquiry[]) => setStoredData('inquiries', data),

  // Auth helper
  getAdminUser: () => ({ email: 'admin@bestarinusa.org', fullName: 'Super Admin' }),
  checkSession: (): boolean => {
    if (!isClient) return false;
    return localStorage.getItem('bestari_session') === 'true';
  },
  login: (email: string, pass: string): boolean => {
    if (email === 'admin@bestarinusa.org' && pass === 'admin123') {
      localStorage.setItem('bestari_session', 'true');
      return true;
    }
    return false;
  },
  logout: (): void => {
    if (isClient) {
      localStorage.removeItem('bestari_session');
    }
  }
};
