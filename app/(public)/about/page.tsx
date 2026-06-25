import React from "react";
import { Award, Compass, Heart, Leaf, Shield, UserCheck } from "lucide-react";

export const metadata = {
  title: "Tentang Kami",
  description: "Pelajari visi, misi, nilai utama, dan sejarah berdirinya Bestari Nusa dalam mengabdi bagi Nusantara."
};

export default function AboutPage() {
  return (
    <div className="w-full py-16 md:py-24 space-y-20">
      
      {/* 1. Page Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
          SIAPA KAMI
        </h4>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
          Berdaya Lestari Nusantara: <br />
          <span className="text-primary">Bestari Nusa</span>
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed">
          Kami adalah wadah pemuda kolaboratif yang bergerak di persimpangan riset ilmiah dan pemberdayaan masyarakat praktis untuk menjawab tantangan sosial lokal secara berkelanjutan.
        </p>
      </section>

      {/* 2. Visual Banner */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-border shadow-md relative">
          <img
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200&h=500"
            alt="Diskusi Pemberdayaan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
        </div>
      </section>

      {/* 3. Filosofi & Sejarah */}
      <section className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4 space-y-2.5">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Filosofi Awal
          </h2>
          <div className="w-12 h-1 bg-primary rounded" />
        </div>
        <div className="md:col-span-8 space-y-4 text-sm md:text-base text-muted leading-relaxed">
          <p>
            Bestari Nusa didirikan oleh sekelompok akademisi muda dan aktivis lapangan yang melihat adanya kesenjangan besar dalam implementasi program-program sosial di Indonesia. Banyak bantuan yang diturunkan bersifat top-down, tidak didasari oleh realitas antropologis desa, sehingga tidak bertahan lama setelah masa pendanaan usai.
          </p>
          <p>
            Dengan semangat **&ldquo;Berdaya Lestari Nusantara&rdquo;**, kami percaya bahwa kekuatan sejati ada pada kemandirian warga lokal yang dipicu oleh kepemimpinan pemuda yang responsif terhadap data nyata lapangan.
          </p>
        </div>
      </section>

      {/* 4. Visi & Misi */}
      <section className="w-full py-20 bg-[#091213] dark:bg-[#050B0C] text-[#E7ECEC]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Visi */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00AFB4] flex items-center gap-2">
              <Compass className="w-4 h-4" /> VISI UTAMA
            </h3>
            <p className="text-2xl md:text-3xl font-serif font-light italic text-white leading-normal">
              &ldquo;Menjadi episentrum kepemimpinan pemuda berbasis riset guna melahirkan komunitas nusantara yang mandiri, berdaya saing, dan lestari secara lingkungan.&rdquo;
            </p>
          </div>

          {/* Misi */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00AFB4] flex items-center gap-2">
              <Award className="w-4 h-4" /> MISI KERJA
            </h3>
            <ul className="space-y-4 text-sm md:text-base text-[#8FA4A6]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#00AFB4]/15 text-[#00AFB4] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">1</span>
                <span>Membina kepemimpinan pemuda pasca-kampus melalui inkubasi program aksi nyata berdasar data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#00AFB4]/15 text-[#00AFB4] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">2</span>
                <span>Menyelenggarakan social mapping dan riset partisipatif untuk perancangan kebijakan CSR & sosial.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#00AFB4]/15 text-[#00AFB4] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">3</span>
                <span>Mengembangkan kemitraan pentahelix guna mengakselerasi program pemberdayaan ekonomi kreatif lokal.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 5. Nilai Utama */}
      <section className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
            NILAI ORGANISASI
          </h4>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Prinsip yang Mengarahkan Langkah Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="w-10 h-10 rounded-lg bg-primary-soft/50 dark:bg-primary-soft/10 text-primary flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Kebenaran Data</h3>
            <p className="text-xs md:text-sm text-muted leading-relaxed">
              Setiap keputusan program didasari data riil lapangan hasil pemetaan sosial komprehensif, bukan berdasarkan tebakan subjektif.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="w-10 h-10 rounded-lg bg-primary-soft/50 dark:bg-primary-soft/10 text-primary flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Empati Lapangan</h3>
            <p className="text-xs md:text-sm text-muted leading-relaxed">
              Mendengar langsung keluhan masyarakat sasaran secara horizontal, melibatkan warga lokal sebagai rekan setara (co-design).
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="w-10 h-10 rounded-lg bg-primary-soft/50 dark:bg-primary-soft/10 text-primary flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Aksi Berkelanjutan</h3>
            <p className="text-xs md:text-sm text-muted leading-relaxed">
              Memprioritaskan ekosistem kemandirian sosial dan regenerasi alam agar dampak sosial tetap berjalan tanpa ketergantungan bantuan.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
