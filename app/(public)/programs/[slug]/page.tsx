import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Target, Users, CheckCircle, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { db } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const program = await db.getProgramBySlug(resolvedParams.slug);
  if (!program) return {};

  return {
    title: program.title,
    description: program.summary
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const program = await db.getProgramBySlug(resolvedParams.slug);

  if (!program) {
    notFound();
  }

  const getStatusColor = (status: typeof program.status) => {
    switch (status) {
      case "upcoming":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300";
      case "ongoing":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300";
      case "completed":
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-400";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: typeof program.status) => {
    switch (status) {
      case "upcoming":
        return "Akan Datang";
      case "ongoing":
        return "Sedang Berjalan";
      case "completed":
        return "Program Selesai";
      default:
        return status;
    }
  };

  return (
    <div className="w-full py-16 md:py-24 space-y-12">
      
      {/* 1. Header Navigation */}
      <section className="max-w-5xl mx-auto px-6">
        <Link 
          href="/programs"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Program
        </Link>
      </section>

      {/* 2. Main Title and Cover Area */}
      <section className="max-w-5xl mx-auto px-6 space-y-6">
        <div className="flex items-center gap-3">
          <span className={`px-3.5 py-1 rounded-full text-xs font-bold ${getStatusColor(program.status)}`}>
            {getStatusText(program.status)}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
          {program.title}
        </h1>
        <p className="text-base md:text-lg text-muted max-w-3xl leading-relaxed">
          {program.summary}
        </p>

        {/* Cover image */}
        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-border shadow-sm">
          <img
            src={program.cover_image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200&h=500"}
            alt={program.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. Program Information and Sidebar Grid */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Details (Col-span 8) */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Tentang Program
            </h2>
            <p className="text-xs md:text-sm text-muted leading-relaxed whitespace-pre-wrap">
              {program.description}
            </p>
          </div>

          {/* Objectives */}
          {program.objectives && program.objectives.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Tujuan & Sasaran Utama
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {program.objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-foreground">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approach & Beneficiary description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {program.target_beneficiaries && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Penerima Manfaat</h3>
                <p className="text-xs md:text-sm text-muted leading-relaxed">{program.target_beneficiaries}</p>
              </div>
            )}
            {program.approach && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Metodologi & Pendekatan</h3>
                <p className="text-xs md:text-sm text-muted leading-relaxed">{program.approach}</p>
              </div>
            )}
          </div>

          {/* Gallery */}
          {program.gallery && program.gallery.length > 0 && (
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Dokumentasi Kegiatan
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {program.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-card">
                    <img src={imgUrl} alt="Dokumentasi program" className="w-full h-full object-cover hover:scale-102 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Panel (Col-span 4) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          
          {/* Metadata parameters */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-5">
            <h3 className="text-sm font-bold tracking-wider uppercase text-foreground">
              Parameter Program
            </h3>
            
            <div className="space-y-4 text-xs md:text-sm">
              
              {program.start_date && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-foreground">Tanggal Pelaksanaan</h5>
                    <p className="text-muted text-xs">
                      {new Date(program.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {program.end_date && ` - ${new Date(program.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                    </p>
                  </div>
                </div>
              )}

              {program.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-foreground">Lokasi</h5>
                    <p className="text-muted text-xs">{program.location}</p>
                  </div>
                </div>
              )}

              {program.target_beneficiaries && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-foreground">Target Sasaran</h5>
                    <p className="text-muted text-xs">{program.target_beneficiaries}</p>
                  </div>
                </div>
              )}

              {program.impact_metrics && program.impact_metrics.length > 0 && (
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-foreground">Indikator Kunci</h5>
                    <ul className="list-disc pl-4 text-muted text-xs space-y-0.5">
                      {program.impact_metrics.map((met, idx) => (
                        <li key={idx}>
                          {met.label}: <strong className="text-foreground">{met.value}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-border/40 space-y-3">
              {program.registration_url ? (
                <a
                  href={program.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.8 py-2.8 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold transition-all shadow-sm"
                >
                  {program.collaboration_cta || "Daftar Sekarang"} <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="w-full block py-2.8 text-center text-xs font-semibold text-muted bg-border/40 rounded-full cursor-not-allowed">
                  Pendaftaran Ditutup
                </span>
              )}
              
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-1.8 py-2.8 border border-border bg-card hover:bg-primary-soft/30 text-foreground rounded-full text-xs font-bold transition-all"
              >
                Ajukan Kolaborasi CSR
              </Link>
            </div>

          </div>

          {/* Social impact summary block */}
          {program.impact_summary && (
            <div className="p-6 rounded-2xl border border-primary/20 bg-primary-soft/10 dark:bg-primary-soft/5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Ringkasan Dampak</h4>
              <p className="text-xs text-muted leading-relaxed font-medium italic">
                &ldquo;{program.impact_summary}&rdquo;
              </p>
            </div>
          )}

        </div>

      </section>

    </div>
  );
}
