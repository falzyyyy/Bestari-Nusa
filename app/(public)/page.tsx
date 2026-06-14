import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Target, ShieldCheck, HelpCircle } from "lucide-react";
import { db } from "@/lib/supabase";
import Hero3DOrb from "@/components/3d/hero-orb";
import FocusAreaCard from "@/components/public/focus-area-card";
import ProgramCard from "@/components/public/program-card";
import NewsCard from "@/components/public/news-card";
import ImpactCounter from "@/components/public/impact-counter";
import PartnerMarquee from "@/components/public/partner-marquee";

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  // Fetch data from database client
  const [featuredPrograms, latestPosts, impactMetrics, partners, newsCategories] = await Promise.all([
    db.getPrograms(true),
    db.getPosts(false),
    db.getImpactMetrics(),
    db.getPartners(true),
    db.getCategories("news")
  ]);

  // Take top 3 for news display
  const newsDisplay = latestPosts.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-12 overflow-hidden bg-gradient-to-b from-primary-soft/20 via-background to-background">
        {/* Soft decorative background glows */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/5 dark:bg-primary/2 rounded-full blur-3xl" />
        <div className="absolute bottom-1/5 right-1/10 w-96 h-96 bg-cream/10 dark:bg-[#1a2c1f]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full relative z-10">
          
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col space-y-6 text-left animate-fade-in-up">
            
            {/* Small Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-soft/60 dark:bg-primary-soft/10 text-primary-dark dark:text-primary border border-primary/20 w-fit">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Berdaya Lestari Nusantara
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08] max-w-2xl">
              Mengubah Riset <br />
              Menjadi <span className="text-primary relative inline-block">Aksi</span>, <br />
              Aksi Menjadi <span className="text-primary-dark dark:text-primary relative inline-block">Dampak</span>.
            </h1>

            <p className="text-sm md:text-base text-muted max-w-xl leading-relaxed">
              Bestari Nusa adalah ruang kolaborasi pengembangan SDM muda yang berfokus pada riset sosial, pemberdayaan masyarakat, advokasi sosial, dan keberlanjutan untuk menciptakan peluang berdampak bagi Nusantara.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <Link
                href="/programs"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-semibold transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Jelajahi Program <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card hover:bg-primary-soft/30 text-foreground rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Ajukan Kolaborasi
              </Link>
            </div>
          </div>

          {/* Right 3D Visual Column */}
          <div className="md:col-span-5 w-full flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-3xl bg-card/30 dark:bg-card/5 border border-border/40 p-4 shadow-inner relative">
              {/* Outer decorative floating mini-badges */}
              <div className="absolute top-8 left-4 p-3 bg-card rounded-2xl border border-border shadow-md animate-float z-20 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Social Research</span>
              </div>
              <div className="absolute bottom-10 right-4 p-3 bg-card rounded-2xl border border-border shadow-md animate-float z-20 flex items-center gap-2 [animation-delay:2s]">
                <Target className="w-4 h-4 text-amber-600" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Youth Leadership</span>
              </div>

              <Hero3DOrb />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="py-20 bg-background border-t border-border/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          <div className="md:col-span-5 relative">
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-border shadow-md">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=500"
                alt="Pemuda Bestari Nusa"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay glow */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
          </div>

          <div className="md:col-span-7 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
              TENTANG KAMI
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Menghubungkan Gagasan dan Aksi Lapangan
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Bestari Nusa (Berdaya Lestari Nusantara) hadir sebagai ruang bertumbuh bagi pemuda pasca-kampus. Kami percaya aksi sosial yang hebat tidak hanya bersumber dari niat baik, melainkan dari data pemetaan masalah (evidence-based) yang jernih dan dirancang secara partisipatif bersama warga lokal agar memiliki keberlanjutan yang panjang.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
              >
                Pelajari Filosofi & Visi Kami <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOCUS AREAS */}
      <section className="py-20 bg-primary-soft/10 dark:bg-primary-soft/5">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Header */}
          <div className="max-w-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
              FOKUS GERAKAN
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Area Kerja yang Kami Lakukan
            </h2>
            <p className="text-xs md:text-sm text-muted">
              Melalui kolaborasi pentahelix, kami berfokus pada tiga dimensi pilar utama untuk mendorong kemandirian sosial.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FocusAreaCard
              title="Pengembangan Pemuda & Advokasi Sosial"
              description="Membekali pemuda dengan kepemimpinan, kepedulian sosial, serta keterampilan advokasi isu-isu kemanusiaan."
              iconName="youth"
            />
            <FocusAreaCard
              title="Riset & Aksi Masyarakat"
              description="Mengumpulkan data riil desa lewat social mapping untuk merancang program pemberdayaan ekonomi sosial lokal."
              iconName="research"
            />
            <FocusAreaCard
              title="Keberlanjutan Lingkungan & Sosial"
              description="Menanamkan kebiasaan pelestarian alam dan lingkungan bersamaan dengan peningkatan kemakmuran komunitas lokal."
              iconName="sustainability"
            />
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROGRAMS */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                PROGRAM UNGGULAN
              </h4>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Inisiatif Kolaboratif Terkini
              </h2>
              <p className="text-xs md:text-sm text-muted">
                Jadilah bagian dari langkah perubahan ini. Pilih program yang sesuai dengan kontribusi yang ingin Anda berikan.
              </p>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border hover:bg-primary-soft/30 text-sm font-semibold transition-colors shrink-0"
            >
              Semua Program <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Programs Grid */}
          {featuredPrograms.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-border rounded-xl">
              <p className="text-muted">Program belum tersedia. Silakan tambahkan program melalui Admin CMS.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPrograms.slice(0, 2).map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. IMPACT SNAPSHOT */}
      <section className="py-20 bg-[#1F2A24] dark:bg-[#0E1712] text-[#FFF6DE]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A7C77D]">
              DAMPAK NYATA
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Tumbuh dan Berdampak Bersama
            </h2>
            <p className="text-xs md:text-sm text-[#CFC7B0] leading-relaxed">
              Setiap angka di bawah ini merupakan proses belajar, kolaborasi lintas lembaga, serta dedikasi pemuda yang turun langsung di tengah masyarakat.
            </p>
          </div>

          {/* Counters Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactMetrics.map((metric) => (
              <ImpactCounter
                key={metric.id}
                label={metric.label}
                value={Number(metric.value)}
                suffix={metric.suffix}
                description={metric.description || ""}
                icon={metric.icon || "leaf"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST NEWS / STORIES */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                CERITA DARI LAPANGAN
              </h4>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Kabar Kegiatan & Riset Sosial
              </h2>
              <p className="text-xs md:text-sm text-muted">
                Dapatkan cerita menarik, hasil mapping desa, policy brief, serta dokumentasi evaluasi program kami.
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border hover:bg-primary-soft/30 text-sm font-semibold transition-colors shrink-0"
            >
              Lihat Semua Cerita <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stories Grid */}
          {newsDisplay.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-border rounded-xl">
              <p className="text-muted">Belum ada cerita yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsDisplay.map((post) => {
                const category = newsCategories.find(c => c.id === post.category_id);
                return (
                  <NewsCard 
                    key={post.id} 
                    post={post} 
                    categoryName={category?.name || "Riset Sosial"}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 7. PARTNER MARQUEE */}
      <section className="py-12 bg-primary-soft/10 dark:bg-[#0f1d16]/30 border-t border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <h5 className="text-center text-xs font-bold uppercase tracking-widest text-muted mb-8">
            DIDUKUNG OLEH MITRA & KOLABORATOR KAMI
          </h5>
          <PartnerMarquee partners={partners} />
        </div>
      </section>

      {/* 8. COLLABORATION CTA */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="p-8 md:p-12 rounded-3xl border border-primary/20 bg-gradient-to-tr from-primary-soft/40 via-background to-background dark:from-primary-soft/5 dark:via-card dark:to-card text-center space-y-6 relative overflow-hidden shadow-sm">
            
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cream/15 rounded-full blur-xl" />

            <div className="w-12 h-12 rounded-full bg-primary-soft/60 dark:bg-primary-soft/20 flex items-center justify-center mx-auto text-primary animate-pulse">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Mari Merancang Dampak Bersama
            </h2>
            
            <p className="text-sm md:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Kami membuka peluang lebar untuk kolaborasi program pemberdayaan, pelaksanaan riset mapping sosial desa, program CSR, hingga pengiriman relawan bersama institusi Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-semibold transition-colors cursor-pointer"
              >
                Hubungi Hub Kerja Sama
              </Link>
              <Link
                href="/programs"
                className="w-full sm:w-auto px-6 py-3 border border-border bg-card hover:bg-primary-soft/30 text-foreground rounded-full text-sm font-semibold transition-colors cursor-pointer"
              >
                Lihat Fokus Program
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
