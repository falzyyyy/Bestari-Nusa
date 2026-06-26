import React from "react";
import { Award, Compass, Heart, Leaf, Shield, UserCheck } from "lucide-react";

export const metadata = {
  title: "Tentang Kami",
  description: "Pelajari visi, misi, nilai utama, dan sejarah berdirinya Bestari Nusa dalam mengabdi bagi Nusantara."
};

export default function AboutPage() {
  return (
    <div className="w-full pt-32 pb-16 md:pt-40 md:pb-24 space-y-20">
      
      {/* 1. Page Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
          SIAPA KAMI
        </h4>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
          Berdaya Lestari Nusantara: <br />
          <span className="text-primary">Bestari Nusa</span>
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-3xl mx-auto">
          Berdaya Lestari Nusantara Foundation adalah lembaga sosial, riset, dan edukasi yang berfokus pada pelibatan dan pengembangan masyarakat serta pelestarian lingkungan. Melalui program pendidikan, penguatan ekonomi, pengembangan kapasitas, dan kegiatan berkelanjutan, Bestari Nusa Foundation hadir untuk menciptakan dampak positif bagi masyarakat dan lingkungan secara berkelanjutan.
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
            Tentang Kami
          </h2>
          <div className="w-12 h-1 bg-primary rounded" />
        </div>
        <div className="md:col-span-8 space-y-4 text-sm md:text-base text-muted leading-relaxed">
          <p>
            The Berdaya Lestari Nusantara Foundation is a social, research, and educational organization dedicated to community involvement and development, as well as environmental conservation, through educational programs, economic empowerment, capacity building, and sustainable initiatives.
          </p>
          <p>
            Dengan semangat <strong>&ldquo;Mewujudkan Masyarakat Berdaya dan Lingkungan Lestari bagi Nusantara&rdquo;</strong>, Yayasan berkomitmen untuk menciptakan dampak positif jangka panjang bagi masyarakat dan kelestarian lingkungan secara berkelanjutan.
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-primary pt-2">
            Think and Action for Social Research, Community Development and Sustainability
          </p>
        </div>
      </section>

      {/* 4. Visi & Misi */}
      <section className="w-full py-20 bg-[#091213] dark:bg-[#050B0C] text-[#E7ECEC]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Visi */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00AFB4] flex items-center gap-2">
              <Compass className="w-4 h-4" /> VISI UTAMA (VISION)
            </h3>
            <p className="text-2xl md:text-3xl font-serif font-light italic text-white leading-normal">
              &ldquo;Mewujudkan Masyarakat Berdaya dan Lingkungan Lestari bagi Nusantara&rdquo;
            </p>
            <p className="text-sm text-[#8FA4A6] italic">
              &ldquo;Creating an Empowered Society and a Sustainable Environment for the Nusantara&rdquo;
            </p>
          </div>

          {/* Misi */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00AFB4] flex items-center gap-2">
              <Award className="w-4 h-4" /> MISI KERJA (MISSION)
            </h3>
            <ul className="space-y-4 text-sm md:text-base text-[#8FA4A6]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#00AFB4]/15 text-[#00AFB4] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">1</span>
                <span>Meningkatkan kapasitas dan resiliensi masyarakat melalui riset sosial, pendidikan, pelatihan, serta penguatan keterampilan untuk menciptakan sumber daya manusia yang produktif dan berdaya saing.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#00AFB4]/15 text-[#00AFB4] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">2</span>
                <span>Mendorong pemberdayaan ekonomi masyarakat yang berkelanjutan melalui pengembangan usaha lokal, inovasi, serta pemanfaatan potensi daerah secara optimal.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#00AFB4]/15 text-[#00AFB4] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">3</span>
                <span>Melestarikan lingkungan hidup dan sumber daya alam melalui program konservasi, pengelolaan lingkungan yang berkelanjutan, serta peningkatan kesadaran masyarakat terhadap pentingnya menjaga ekosistem.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#00AFB4]/15 text-[#00AFB4] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">4</span>
                <span>Membangun kolaborasi dan partisipasi multi-pihak dalam menciptakan pembangunan yang inklusif, berkelanjutan, dan berorientasi pada kesejahteraan masyarakat serta kelestarian lingkungan.</span>
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
            Nilai Utama Kami: B-E-S-T-A-R-I-N-U-S-A
          </h2>
          <p className="text-sm text-muted max-w-xl mx-auto">
            Yayasan didorong oleh sebelas pilar utama yang membentuk karakter kerja, keilmuan, dan aksi pemberdayaan kami di seluruh Nusantara.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { letter: "B", value: "Balance", desc: "Menjaga harmoni antara pembangunan sosial, pelestarian lingkungan, dan pertumbuhan ekonomi." },
            { letter: "E", value: "Empowerment", desc: "Memberdayakan masyarakat untuk mengenali potensi diri dan memimpin kemandirian mereka sendiri." },
            { letter: "S", value: "Sustainability", desc: "Memastikan setiap inisiatif dan dampak sosial memiliki ketahanan jangka panjang bagi generasi mendatang." },
            { letter: "T", value: "Trust", desc: "Membangun hubungan yang berlandaskan keterbukaan, kejujuran, dan rasa saling percaya di antara pemangku kepentingan." },
            { letter: "A", value: "Accountability", desc: "Menjunjung tinggi tanggung jawab atas setiap keputusan, dana, dan dampak dari program yang dijalankan." },
            { letter: "R", value: "Resilience", desc: "Menumbuhkan kapasitas masyarakat agar tangguh menghadapi perubahan sosial, ekonomi, dan iklim." },
            { letter: "I", value: "Integrity", desc: "Menjaga konsistensi tindakan dengan nilai-nilai moral, kebenaran ilmiah, dan etika profesional." },
            { letter: "N", value: "Novelty", desc: "Mendorong inovasi dan pemikiran kreatif dalam memecahkan tantangan sosial serta lingkungan." },
            { letter: "U", value: "Utility", desc: "Menghasilkan solusi praktis dan program yang memberikan kegunaan serta nilai tambah langsung bagi masyarakat." },
            { letter: "S", value: "Stewardship", desc: "Menjadi pengelola yang bertanggung jawab terhadap kelestarian alam dan sumber daya bumi Nusantara." },
            { letter: "A", value: "Action", desc: "Menerjemahkan gagasan akademik dan hasil riset sosial ke dalam langkah konkret yang membawa perubahan nyata." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all flex items-start gap-4 shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-primary-soft/50 dark:bg-primary-soft/10 text-primary flex items-center justify-center shrink-0 font-serif text-2xl font-bold tracking-tight border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {item.letter}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {item.value}
                </h3>
                <p className="text-xs md:text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Portofolio Proyek */}
      <section className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
            REKAM JEJAK
          </h4>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Portofolio Proyek Yayasan
          </h2>
          <p className="text-sm text-muted max-w-xl mx-auto">
            Bestari Nusa memiliki pengalaman luas dalam riset sosial, pemetaan komunitas, dan pengukuran dampak bersama berbagai mitra korporasi dan institusi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Social Mapping */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-5 flex flex-col h-full hover:border-primary/30 transition-colors duration-350 shadow-sm">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase">Kategori A</span>
              <h3 className="text-lg font-bold text-foreground">Social Mapping</h3>
              <p className="text-xs text-muted">Pemetaan potensi, kerentanan ekologis, dan aset sosial komunitas lokal.</p>
            </div>
            <div className="h-[1px] bg-border/40" />
            <ul className="space-y-4 text-xs md:text-sm text-muted flex-grow">
              {[
                { title: "Kajian Social Mapping PT Buana Sriwijaya Sejahtera (Desa Biaro Lamo & Jadi Mulya)", year: "2021" },
                { title: "Kajian Social Mapping Pengembangan Desa Wisata Padang Bindu (Kec. Semidang Aji, OKU)", year: "2022" },
                { title: "Kajian Social Mapping Rencana Pembangunan Kilang PT KPI RDMP RU III Plaju", year: "2022" },
                { title: "Kajian Social Mapping & Dampak Sosial Wilayah Operasional PT Oki Pulp & Paper Mills", year: "2023" },
                { title: "Penyusunan Dokumen Social Mapping PT PLN UIP Sumbagsel (Sumatera Selatan)", year: "2024" },
                { title: "Penyusunan Dokumen Social Mapping PT PLN UIP Sumbagsel (Desa Sungsang IV, Banyuasin)", year: "2025" },
                { title: "Kajian Social Mapping PT PLN Nusantara Power (PLTA Way Besai, Lampung Barat)", year: "2025" },
                { title: "Kajian Social Mapping Blok Rimau Kalabau PT Medco E&P Indonesia (Desa Lais Utara)", year: "2025" }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <span className="text-primary font-bold shrink-0 mt-0.5">•</span>
                  <div className="space-y-0.5">
                    <p className="text-foreground font-medium leading-relaxed">{item.title}</p>
                    <span className="text-[10px] font-bold text-primary">{item.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Stakeholder Engagement */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-5 flex flex-col h-full hover:border-primary/30 transition-colors duration-350 shadow-sm">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase">Kategori B</span>
              <h3 className="text-lg font-bold text-foreground">Stakeholder Engagement</h3>
              <p className="text-xs text-muted">Hubungan pemangku kepentingan dan analisis ekspektasi multi-pihak.</p>
            </div>
            <div className="h-[1px] bg-border/40" />
            <ul className="space-y-4 text-xs md:text-sm text-muted flex-grow">
              {[
                { title: "Penyusunan Dokumen Stakeholder Engagement & REA PT Pertamina EP Ramba Field (Musi Banyuasin)", year: "2022" },
                { title: "Kajian Stakeholder Engagement PT Medco E&P (Kabupaten Musi Banyuasin)", year: "2023" },
                { title: "Kajian Stakeholder Engagement PT Pertamina Geothermal Energy LMB 1 (Sumatera Selatan)", year: "2024" },
                { title: "Kajian Stakeholder Engagement PT Medco E&P (Kab. Musi Banyuasin & Musi Rawas Utara)", year: "2024" },
                { title: "Kajian Stakeholder Engagement Wilayah Operasional PT Pertamina EP Prabumulih", year: "2025" }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <span className="text-primary font-bold shrink-0 mt-0.5">•</span>
                  <div className="space-y-0.5">
                    <p className="text-foreground font-medium leading-relaxed">{item.title}</p>
                    <span className="text-[10px] font-bold text-primary">{item.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* SROI */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-5 flex flex-col h-full hover:border-primary/30 transition-colors duration-350 shadow-sm">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase">Kategori C</span>
              <h3 className="text-lg font-bold text-foreground">Social Return on Investment</h3>
              <p className="text-xs text-muted">Pengukuran nilai dampak sosial dan pengembalian investasi program CSR.</p>
            </div>
            <div className="h-[1px] bg-border/40" />
            <ul className="space-y-4 text-xs md:text-sm text-muted flex-grow">
              {[
                { title: "Penyusunan Dokumen SROI PT PLN UIP Sumbagsel (Sumsel, Babel, & Lampung)", year: "2022" },
                { title: "Kajian SROI Rumah BUMN Sumsel PT Pusri Palembang", year: "2023" },
                { title: "Penyusunan Dokumen SROI PT PLN UIP Sumbagsel (Sumatera Selatan)", year: "2024" },
                { title: "Kajian SROI PT Medco Energy E&P (Suban Area)", year: "2024" },
                { title: "Penyusunan Dokumen SROI PT Supreme Energy Rantau Dedap", year: "2025" }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <span className="text-primary font-bold shrink-0 mt-0.5">•</span>
                  <div className="space-y-0.5">
                    <p className="text-foreground font-medium leading-relaxed">{item.title}</p>
                    <span className="text-[10px] font-bold text-primary">{item.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}
