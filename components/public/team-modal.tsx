"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Users, ArrowUpRight, Compass, Heart } from "lucide-react";
import { Instagram, Linkedin, Twitter } from "@/components/ui/icons";
import { TeamMember } from "@/lib/store";

interface TeamModalProps {
  member: TeamMember | null;
  onClose: () => void;
  divisionName?: string;
}

export default function TeamModal({ member, onClose, divisionName }: TeamModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (member) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [member]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Stagger variants for content entry
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.08
      }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <AnimatePresence>
      {member && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay with premium blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl bg-card/90 border border-border/80 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 max-h-[85vh] overflow-y-auto backdrop-blur-xl group/modal"
          >
            
            {/* Topography Watermark for visual depth inside the modal */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 pointer-events-none -z-10 text-primary">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M10 80 Q 30 50, 50 80 T 90 80" />
                <path d="M10 70 Q 30 40, 50 70 T 90 70" />
                <path d="M10 60 Q 30 30, 50 60 T 90 60" />
                <path d="M10 50 Q 30 20, 50 50 T 90 50" />
              </svg>
            </div>

            {/* Close Button with vintage animation */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-primary-soft/30 hover:bg-primary text-muted hover:text-[#091213] transition-all duration-[400ms] z-20 cursor-pointer hover:rotate-90"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Premium Profile Photo Card & Socials */}
            <div className="w-full md:w-5/12 flex flex-col items-center shrink-0 space-y-5">
              
              {/* Photo Frame with subtle glow */}
              <motion.div 
                variants={itemVariants}
                className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-primary-soft/10 relative border border-border/50 shadow-md group/image"
              >
                {/* Blueprint grid effect overlay on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#091213_90%)] z-10 opacity-70" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,175,180,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,175,180,0.03)_1px,transparent_1px)] bg-[size:16px_16px] z-10" />
                
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover scale-100 group-hover/image:scale-[1.03] transition-transform duration-[1.2s] ease-[0.16,1,0.3,1]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-soft/20 text-primary">
                    <Users className="w-14 h-14" />
                  </div>
                )}
              </motion.div>

              {/* Social Channels */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center gap-2.5 w-full bg-primary-soft/20 dark:bg-primary-soft/5 border border-border/25 py-2.5 px-4 rounded-2xl"
              >
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-xl bg-card border border-border/50 hover:border-primary/50 text-muted hover:text-primary transition-all duration-300 hover:scale-105"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {member.social_links?.linkedin && (
                  <a
                    href={member.social_links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-card border border-border/50 hover:border-primary/50 text-muted hover:text-primary transition-all duration-300 hover:scale-105"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.social_links?.instagram && (
                  <a
                    href={member.social_links.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-card border border-border/50 hover:border-primary/50 text-muted hover:text-primary transition-all duration-300 hover:scale-105"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {member.social_links?.twitter && (
                  <a
                    href={member.social_links.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-card border border-border/50 hover:border-primary/50 text-muted hover:text-primary transition-all duration-300 hover:scale-105"
                    title="Twitter / X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            </div>

            {/* Right Column: Name, Position, Description */}
            <div className="flex flex-col flex-grow text-left justify-between space-y-6 pt-2">
              
              <div className="space-y-4">
                {/* Division Label */}
                <motion.div variants={itemVariants}>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#00AFB4] bg-[#00AFB4]/10 border border-[#00AFB4]/20 px-3 py-1 rounded-full">
                    {divisionName || "Pengurus Inti"}
                  </span>
                </motion.div>

                {/* Name & Title */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight font-serif">
                    {member.name}
                  </h2>
                  <p className="text-xs md:text-sm text-primary font-bold tracking-wide flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> {member.position}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="h-[1px] bg-border/30 w-full" />

                {/* Biography */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#00AFB4]" /> Profil & Fokus Gerakan
                  </h4>
                  <p className="text-xs md:text-sm text-muted leading-relaxed font-sans font-light">
                    {member.bio || "Anggota aktif kepengurusan Bestari Nusa yang berfokus dalam menggerakkan riset sosial, pemetaan isu kemanusiaan, serta mendampingi aksi aksi pemberdayaan masyarakat di penjuru Nusantara."}
                  </p>
                </motion.div>
              </div>

              {/* Action/Indicator footer */}
              <motion.div 
                variants={itemVariants}
                className="pt-4 border-t border-border/20 text-[10px] text-muted flex items-center justify-between"
              >
                <span>Bestari Nusa Research Team</span>
                <span className="flex items-center gap-1">
                  Active Member <ArrowUpRight className="w-3 h-3 text-primary" />
                </span>
              </motion.div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
