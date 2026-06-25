"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Users, Target, ArrowRight, Compass, Tag } from "lucide-react";
import Link from "next/link";
import { Program } from "@/lib/store";

interface ProgramModalProps {
  program: Program | null;
  onClose: () => void;
}

export default function ProgramModal({ program, onClose }: ProgramModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (program) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [program]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const getStatusColor = (status: Program["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "ongoing":
        return "bg-primary/10 text-primary border-primary/20";
      case "completed":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getStatusText = (status: Program["status"]) => {
    switch (status) {
      case "upcoming":
        return "Akan Datang";
      case "ongoing":
        return "Berjalan";
      case "completed":
        return "Selesai";
      default:
        return status;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.08
      }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 15,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <AnimatePresence>
      {program && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl bg-card/95 border border-border/80 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[85vh] overflow-y-auto backdrop-blur-xl"
          >
            
            {/* Topography Watermark SVG */}
            <div className="absolute top-1/2 left-1/3 w-72 h-72 opacity-5 pointer-events-none -z-10 text-primary">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M10 80 Q 30 50, 50 80 T 90 80" />
                <path d="M10 70 Q 30 40, 50 70 T 90 70" />
                <path d="M10 60 Q 30 30, 50 60 T 90 60" />
              </svg>
            </div>

            {/* Close Button with premium rotate-hover */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-primary-soft/30 hover:bg-primary text-muted hover:text-[#091213] transition-all duration-[400ms] z-20 cursor-pointer hover:rotate-90"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Media Banner & Meta Info */}
            <div className="w-full md:w-5/12 bg-primary-soft/10 border-r border-border/25 flex flex-col justify-between">
              <div>
                <motion.div 
                  variants={itemVariants}
                  className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden shrink-0 border-b border-border/25"
                >
                  {/* Photo Blueprint grid overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#091213_90%)] z-10 opacity-70" />
                  <img
                    src={program.cover_image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&h=550"}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusColor(program.status)} bg-white/95 dark:bg-card/95`}>
                      {getStatusText(program.status)}
                    </span>
                  </div>
                </motion.div>

                <div className="p-6 space-y-5 text-xs">
                  {/* Bento-style stats container */}
                  <motion.div variants={itemVariants} className="space-y-3.5">
                    {program.start_date && (
                      <div className="flex items-center gap-3 text-muted bg-card border border-border/40 p-2.5 rounded-xl">
                        <div className="p-2 bg-primary-soft/30 rounded-lg text-primary">
                          <Calendar className="w-4 h-4 shrink-0" />
                        </div>
                        <div>
                          <p className="font-bold text-[9px] uppercase tracking-wider text-primary">Waktu Pelaksanaan</p>
                          <p className="text-foreground/90 mt-0.5 font-semibold">
                            {new Date(program.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    )}

                    {program.location && (
                      <div className="flex items-center gap-3 text-muted bg-card border border-border/40 p-2.5 rounded-xl">
                        <div className="p-2 bg-primary-soft/30 rounded-lg text-primary">
                          <MapPin className="w-4 h-4 shrink-0" />
                        </div>
                        <div>
                          <p className="font-bold text-[9px] uppercase tracking-wider text-primary">Lokasi Kegiatan</p>
                          <p className="text-foreground/90 mt-0.5 font-semibold">{program.location}</p>
                        </div>
                      </div>
                    )}

                    {program.target_beneficiaries && (
                      <div className="flex items-center gap-3 text-muted bg-card border border-border/40 p-2.5 rounded-xl">
                        <div className="p-2 bg-primary-soft/30 rounded-lg text-primary">
                          <Target className="w-4 h-4 shrink-0" />
                        </div>
                        <div>
                          <p className="font-bold text-[9px] uppercase tracking-wider text-primary">Sasaran Penerima</p>
                          <p className="text-foreground/90 mt-0.5 font-semibold">{program.target_beneficiaries}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Collaboration CTA Info */}
              {program.collaboration_cta && (
                <motion.div 
                  variants={itemVariants}
                  className="mx-6 mb-6 p-4 rounded-2xl bg-[#00AFB4]/5 dark:bg-[#00AFB4]/10 border border-[#00AFB4]/20"
                >
                  <p className="font-bold text-[9px] uppercase tracking-widest text-[#00AFB4] mb-1 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> Peluang Kolaborasi
                  </p>
                  <p className="text-muted leading-relaxed text-[11px] font-light">{program.collaboration_cta}</p>
                </motion.div>
              )}
            </div>

            {/* Right Column: Title, Summaries & Actions */}
            <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col text-left justify-between">
              
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight font-serif">
                    {program.title}
                  </h2>
                  <div className="h-[2px] bg-primary/30 w-16 mt-3" />
                </motion.div>

                <div className="space-y-5">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00AFB4] flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" /> Ringkasan Inisiatif
                    </h4>
                    <p className="text-xs md:text-sm text-muted leading-relaxed font-sans font-light">
                      {program.summary}
                    </p>
                  </motion.div>

                  {program.approach && (
                    <motion.div variants={itemVariants} className="space-y-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00AFB4] flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> Alur Pendekatan / Aksi
                      </h4>
                      <p className="text-xs md:text-sm text-muted leading-relaxed font-sans font-light">
                        {program.approach}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-border/20"
              >
                {program.registration_url && (
                  <a
                    href={program.registration_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-5 py-3 bg-primary hover:bg-primary-dark text-[#091213] rounded-full text-xs font-bold transition-all hover:scale-[1.02] shadow-md shadow-primary/10"
                  >
                    Daftar / Berpartisipasi
                  </a>
                )}

                <Link
                  href={`/programs/${program.slug}`}
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-1.5 px-5 py-3 border border-border bg-card hover:bg-primary-soft/30 text-foreground rounded-full text-xs font-semibold transition-all hover:scale-[1.02]"
                >
                  Halaman Detail Penuh <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
