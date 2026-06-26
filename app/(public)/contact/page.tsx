"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles, MessageSquare } from "lucide-react";
import { db } from "@/lib/supabase";

// Form Validation Schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(3, { message: "Nama lengkap minimal terdiri dari 3 karakter" }),
  email: z.string().email({ message: "Format alamat email tidak valid" }),
  phone: z.string().min(10, { message: "Nomor telepon minimal terdiri dari 10 digit" }),
  institution: z.string().optional(),
  inquiry_type: z.enum(["collaboration", "csr", "media", "volunteer", "research", "general"]),
  message: z.string().min(15, { message: "Isi pesan minimal terdiri dari 15 karakter" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      inquiry_type: "general"
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const success = await db.submitInquiry({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        institution: data.institution || "",
        inquiry_type: data.inquiry_type,
        message: data.message
      });

      if (success) {
        setSubmitted(true);
        reset();
      } else {
        setErrorMsg("Gagal mengirimkan formulir. Coba lagi dalam beberapa saat.");
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || "Terjadi kesalahan sistem. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-32 pb-16 md:pt-40 md:pb-24 space-y-16">
      
      {/* Page Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
          HUBUNGI KAMI
        </h4>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Mari Memulai Kolaborasi
        </h1>
        <p className="text-sm md:text-base text-muted max-w-2xl mx-auto">
          Mulai dari kemitraan CSR korporat, riset lapangan, hingga partisipasi kerelawanan pemuda. Hub kami siap merespons pesan Anda dalam 1x24 jam.
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Contacts info (Col-span 5) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          
          <div className="p-8 rounded-2xl border border-border bg-card space-y-6">
            <h3 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Hub Kontak Resmi
            </h3>
            
            <div className="space-y-4 text-xs md:text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-foreground">Sekretariat Bestari</h5>
                  <p className="text-muted text-xs leading-relaxed mt-0.5">
                    Jl. Merdeka No. 45, Bukit Kecil, Palembang, Sumatera Selatan 30113
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-foreground">Hubungi Email</h5>
                  <p className="text-muted text-xs mt-0.5">info@bestarinusa.org</p>
                  <p className="text-muted text-xs">halo@bestarinusa.org</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-foreground">Layanan WhatsApp</h5>
                  <p className="text-muted text-xs mt-0.5">+62 812-3456-789</p>
                </div>
              </div>
            </div>

            {/* Google Map mock frame */}
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-border/60 bg-primary-soft/10 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <MapPin className="w-8 h-8 text-primary animate-bounce mb-1" />
                <span className="text-xs font-bold text-foreground">Peta Lokasi Kantor</span>
                <span className="text-[10px] text-muted">Palembang, Sumatera Selatan</span>
              </div>
              {/* Fallback pattern */}
              <div className="w-full h-full bg-[radial-gradient(#7a9a5e_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            </div>

          </div>

          <div className="p-6 rounded-2xl border border-primary/20 bg-primary-soft/10 dark:bg-primary-soft/5 flex gap-3.5">
            <Sparkles className="w-5 h-5 text-primary shrink-0" />
            <p className="text-xs text-muted leading-relaxed font-medium">
              Setiap pesan kolaborasi yang Anda kirimkan terenkripsi secara aman dan akan diproses langsung oleh perwakilan tim kami.
            </p>
          </div>

        </div>

        {/* Right Column: Submission Form (Col-span 7) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl border border-border bg-card shadow-sm">
            
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary-soft/50 text-primary flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-foreground">Pesan Terkirim!</h3>
                <p className="text-xs md:text-sm text-muted max-w-md mx-auto">
                  Terima kasih telah menghubungi Bestari Nusa. Pesan Anda telah terekam di sistem kami dan perwakilan tim kami akan segera menghubungi Anda.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold transition-all cursor-pointer"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {errorMsg && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">Nama Lengkap *</label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full px-4 py-2.5 text-xs md:text-sm bg-background border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 font-semibold">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">Alamat Email *</label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="contoh@domain.com"
                      className="w-full px-4 py-2.5 text-xs md:text-sm bg-background border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-500 font-semibold">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">Nomor Telepon/WA *</label>
                    <input
                      type="text"
                      {...register("phone")}
                      placeholder="Contoh: 0812xxxxxxxx"
                      className="w-full px-4 py-2.5 text-xs md:text-sm bg-background border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-500 font-semibold">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Institution field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">Institusi/Instansi (Opsional)</label>
                    <input
                      type="text"
                      {...register("institution")}
                      placeholder="Nama lembaga Anda"
                      className="w-full px-4 py-2.5 text-xs md:text-sm bg-background border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                {/* Inquiry Type dropdown selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Tujuan Hubungan *</label>
                  <select
                    {...register("inquiry_type")}
                    className="w-full px-4 py-2.5 text-xs md:text-sm bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="general">Pertanyaan Umum</option>
                    <option value="collaboration">Kolaborasi Kemitraan</option>
                    <option value="csr">Kerja Sama CSR Korporat</option>
                    <option value="media">Liputan / Publikasi Media</option>
                    <option value="volunteer">Pendaftaran Relawan</option>
                    <option value="research">Riset & Social Mapping</option>
                  </select>
                  {errors.inquiry_type && (
                    <p className="text-[10px] text-red-500 font-semibold">{errors.inquiry_type.message}</p>
                  )}
                </div>

                {/* Message text area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Detail Pesan *</label>
                  <textarea
                    rows={5}
                    {...register("message")}
                    placeholder="Tuliskan detail pesan, maksud kolaborasi, atau program kerja sama yang diajukan..."
                    className="w-full px-4 py-3 text-xs md:text-sm bg-background border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-500 font-semibold">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm disabled:bg-primary/60 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  ) : (
                    <>
                      Kirim Formulir <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </section>

    </div>
  );
}
