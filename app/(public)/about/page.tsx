import React from "react";
import { Award, Compass } from "lucide-react";
import { db } from "@/lib/supabase";
import { DEFAULT_SITE_SETTINGS } from "@/lib/store";

export const revalidate = 60; // Revalidate every minute

export const metadata = {
  title: "Tentang Kami",
  description: "Pelajari visi, misi, nilai utama, dan sejarah berdirinya Bestari Nusa dalam mengabdi bagi Nusantara."
};

export default async function AboutPage() {
  const customSettings = await db.getSiteSetting("page_about");
  const settings = customSettings || DEFAULT_SITE_SETTINGS.page_about;

  return (
    <div className="w-full pt-32 pb-16 md:pt-40 md:pb-24 space-y-20">
      
      {/* 1. Page Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
          SIAPA KAMI
        </h4>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
          {settings.header_title.split(":")[0]}: <br />
          <span className="text-primary">{settings.header_title.split(":")[1] || settings.header_title}</span>
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-3xl mx-auto">
          {settings.header_description}
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
            {settings.about_title}
          </h2>
          <div className="w-12 h-1 bg-primary rounded" />
        </div>
        <div className="md:col-span-8 space-y-4 text-sm md:text-base text-muted leading-relaxed">
          <p>
            {settings.about_description_id}
          </p>
          <p>
            {settings.about_description_id_2}
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
              &ldquo;{settings.visi}&rdquo;
            </p>
            {settings.visi_en && (
              <p className="text-sm text-[#8FA4A6] italic">
                &ldquo;{settings.visi_en}&rdquo;
              </p>
            )}
          </div>

          {/* Misi */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00AFB4] flex items-center gap-2">
              <Award className="w-4 h-4" /> MISI KERJA (MISSION)
            </h3>
            <ul className="space-y-4 text-sm md:text-base text-[#8FA4A6]">
              {settings.misi?.map((m: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#00AFB4]/15 text-[#00AFB4] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">{idx + 1}</span>
                  <span>{m}</span>
                </li>
              ))}
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
          {(settings.nilai_utama || DEFAULT_SITE_SETTINGS.page_about.nilai_utama).map((item: any, idx: number) => (
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

    </div>
  );
}
