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
    name: 'Naufal Bestari',
    slug: 'naufal-bestari',
    position: 'Executive Director',
    division_id: 'div-1',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Fokus pada desain intervensi sosial dan pemberdayaan pemuda pasca-kampus.',
    email: 'naufal@bestarinusa.org',
    social_links: { linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
    order_index: 1,
    is_featured: true,
    is_active: true
  },
  {
    id: 'team-2',
    name: 'Laras Safira',
    slug: 'laras-safira',
    position: 'Head of Social Research',
    division_id: 'div-2',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Lulusan Antropologi dengan keahlian pemetaan sosial (social mapping) dan FGD partisipatif.',
    email: 'laras@bestarinusa.org',
    social_links: { linkedin: 'https://linkedin.com' },
    order_index: 2,
    is_featured: true,
    is_active: true
  },
  {
    id: 'team-3',
    name: 'Budi Santoso',
    slug: 'budi-santoso',
    position: 'Field Program Manager',
    division_id: 'div-3',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Berpengalaman selama 5 tahun mendampingi masyarakat adat di bidang ekowisata.',
    email: 'budi@bestarinusa.org',
    social_links: { instagram: 'https://instagram.com' },
    order_index: 3,
    is_featured: false,
    is_active: true
  }
];

const DEFAULT_IMPACT: ImpactMetric[] = [
  { id: 'imp-1', label: 'Program Terlaksana', value: 12, suffix: '+', description: 'Inisiatif sosial dan pengembangan komunitas', icon: 'leaf', order_index: 1, is_active: true },
  { id: 'imp-2', label: 'Pemuda Terlibat', value: 320, suffix: '+', description: 'Generasi muda dalam pelatihan dan aksi sosial', icon: 'users', order_index: 2, is_active: true },
  { id: 'imp-3', label: 'Mitra Kolaborasi', value: 18, suffix: '+', description: 'Institusi, komunitas, dan partner program', icon: 'handshake', order_index: 3, is_active: true },
  { id: 'imp-4', label: 'Wilayah Dampingan', value: 6, suffix: '+', description: 'Area komunitas dampingan aktif', icon: 'map', order_index: 4, is_active: true }
];

const DEFAULT_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    title: 'Akademi Pemuda Bestari',
    slug: 'akademi-pemuda-bestari',
    summary: 'Program inkubator kepemimpinan sosial bagi lulusan baru untuk merancang solusi dampak berkelanjutan.',
    description: 'Akademi Pemuda Bestari merupakan program bootcamp intensif selama 3 bulan yang melatih generasi muda pasca-kampus dalam keterampilan pemecahan masalah sosial, metodologi riset lapangan, desain berpikir (design thinking), serta manajemen projek. Selama program, peserta didorong untuk memetakan tantangan nyata di wilayah urban maupun rural dan menciptakan projek sosial yang terukur.',
    category_id: 'cat-prog-1',
    status: 'upcoming',
    location: 'Palembang & Digital',
    start_date: '2026-08-01',
    end_date: '2026-11-01',
    cover_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=500'
    ],
    objectives: [
      'Membangun kapasitas leadership sosial pemuda.',
      'Melatih keterampilan riset data sosial secara partisipatif.',
      'Mendesain inkubasi program yang sustain secara finansial.'
    ],
    target_beneficiaries: 'Pemuda usia 20-25 tahun pasca-kelulusan.',
    approach: 'Pelatihan kelas terstruktur, bimbingan mentor berpengalaman, dan penugasan lapangan (action learning).',
    impact_summary: 'Mempersiapkan agen perubahan masa depan dengan kompetensi berbasis riset nyata.',
    impact_metrics: [
      { label: 'Kuota Peserta', value: '40 Orang' },
      { label: 'Mentor Expert', value: '8 Mentor' }
    ],
    registration_url: 'https://google.com',
    collaboration_cta: 'Daftar Akademi',
    is_featured: true,
    order_index: 1
  },
  {
    id: 'prog-2',
    title: 'Laboratorium Social Mapping',
    slug: 'laboratorium-social-mapping',
    summary: 'Pemetaan potensi dan pemecahan masalah komunitas lokal berbasis data antropologis yang mendalam.',
    description: 'Kami percaya bahwa program pemberdayaan yang baik didasari oleh pemahaman data yang kokoh. Laboratorium Social Mapping bertugas memetakan aktor penting, konflik sosial, kerentanan ekologis, serta potensi ekonomi lokal di wilayah sasaran sebelum intervensi program dimulai.',
    category_id: 'cat-prog-2',
    status: 'ongoing',
    location: 'Sumatera Selatan',
    start_date: '2026-03-01',
    end_date: '2026-07-30',
    cover_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800&h=500',
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800&h=500'
    ],
    objectives: [
      'Menghasilkan social mapping report untuk mitra CSR.',
      'Melatih warga lokal dalam mendokumentasikan aset desa.'
    ],
    target_beneficiaries: 'Pemerintah desa, masyarakat adat, dan pengembang program.',
    approach: 'PRA (Participatory Rural Appraisal), survei rumah tangga, GIS Mapping.',
    impact_summary: 'Menghindari kegagalan program CSR akibat salah mengidentifikasi kebutuhan warga.',
    impact_metrics: [
      { label: 'Desa Dipetakan', value: '5 Wilayah' },
      { label: 'Data Responden', value: '450 Rumah Tangga' }
    ],
    registration_url: '',
    collaboration_cta: 'Ajukan Pemetaan',
    is_featured: true,
    order_index: 2
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
    author_id: 'team-2',
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
  { id: 'part-1', name: 'Pertamina Hulu', slug: 'pertamina-hulu', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://pertamina.com', partnership_type: 'CSR', year: 2025, is_featured: true, order_index: 1, is_active: true },
  { id: 'part-2', name: 'Yayasan Kehati', slug: 'yayasan-kehati', logo: 'https://images.unsplash.com/photo-1618005198143-e528346d9a59?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://kehati.or.id', partnership_type: 'NGO', year: 2026, is_featured: true, order_index: 2, is_active: true },
  { id: 'part-3', name: 'Universitas Sriwijaya', slug: 'unsri', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=150&h=80', website_url: 'https://unsri.ac.id', partnership_type: 'Academic', year: 2025, is_featured: true, order_index: 3, is_active: true }
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
