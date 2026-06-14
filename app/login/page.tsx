"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Mail, AlertTriangle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { MockDb } from "@/lib/store";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Kata sandi minimal terdiri dari 6 karakter" })
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dbMode = isSupabaseConfigured ? "Supabase PostgreSQL Live" : "Mock Database Offline";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginValues) => {
    setLoading(true);
    setErrorMsg("");
    try {
      if (isSupabaseConfigured && supabase) {
        // Authenticate with live Supabase auth instance
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password
        });
        if (error) throw error;
        
        // Save simple local flag
        localStorage.setItem("bestari_session", "true");
        router.push("/admin/dashboard");
      } else {
        // Authenticate with offline store
        const success = MockDb.login(data.email, data.password);
        if (success) {
          router.push("/admin/dashboard");
        } else {
          setErrorMsg("Kombinasi email dan kata sandi admin salah.");
        }
      }
    } catch (e) {
      console.error(e);
      const message = e instanceof Error ? e.message : "Gagal masuk ke sistem. Silakan periksa kembali kredensial Anda.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#091213] text-[#E7ECEC] flex flex-col justify-between p-6 relative overflow-hidden font-sans">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-glow/10 blur-3xl -z-10" />

      {/* Floating Theme Button */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Header Info */}
      <div className="flex items-center gap-2 max-w-sm mx-auto pt-6">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[#091213] font-black text-sm">
          B
        </div>
        <span className="font-bold tracking-tight text-white text-base">
          Bestari<span className="text-[#00AFB4]">Nusa</span>
        </span>
      </div>

      {/* Login Card Container */}
      <div className="max-w-md w-full mx-auto my-auto py-10">
        
        <div className="p-8 rounded-3xl border border-border bg-card/10 backdrop-blur-md shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary-soft/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-2xl font-black text-white">Portal Admin CMS</h1>
            <p className="text-xs text-muted">
              Masuk untuk mengelola postingan berita, program kerja, tim pengurus, dan pesan masuk.
            </p>
          </div>

          {/* Database Mode Badge Indicator */}
          <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-center flex items-center justify-center gap-2 text-primary">
            <Sparkles className="w-3.5 h-3.5" /> Koneksi: {dbMode}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {errorMsg && (
              <div className="p-3.5 bg-red-950/40 text-red-400 rounded-xl text-xs font-semibold border border-red-900/60 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Email input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#8FA4A6]">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA4A6]" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="admin@bestarinusa.org"
                  className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-black/40 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-[10px] font-semibold mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#8FA4A6]">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA4A6]" />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-black/40 border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-[10px] font-semibold mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark text-[#091213] rounded-xl text-xs md:text-sm font-bold transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:bg-primary/50 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-[#091213]/20 border-t-[#091213] animate-spin" />
              ) : (
                <>
                  Masuk Sistem <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Local testing helper banner */}
          {!isSupabaseConfigured && (
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-[#8FA4A6] leading-relaxed text-center">
              💡 Mode offline aktif. Masuk menggunakan akun testing:<br />
              Email: <strong className="text-white">admin@bestarinusa.org</strong> | Sandi: <strong className="text-white">admin123</strong>
            </div>
          )}

        </div>

      </div>

      {/* Footer copyright */}
      <div className="text-center text-[10px] text-muted pb-4">
        © {new Date().getFullYear()} Bestari Nusa. CMS Portal Dashboard.
      </div>

    </div>
  );
}
