"use client";

import { useState } from "react";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Program } from "@/lib/store";
import ProgramModal from "./program-modal";

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group flex flex-col overflow-hidden rounded-md border border-border bg-card/65 hover:border-primary/40 hover:shadow-sm cursor-pointer transition-all duration-[800ms] ease-[0.16,1,0.3,1] w-full"
      >
        {/* Program Cover Image with Grayscale Filter & Slow Custom Zoom */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-primary-soft/10">
          <img
            src={program.cover_image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&h=550"}
            alt={program.title}
            className="w-full h-full object-cover grayscale saturate-[0.8] brightness-[0.95] group-hover:grayscale-0 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[800ms] ease-[0.16,1,0.3,1]"
            loading="lazy"
          />
          {/* Status Badge - Vintage Tag Style */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${getStatusColor(program.status)} bg-white/95 dark:bg-card/95`}>
              {getStatusText(program.status)}
            </span>
          </div>
        </div>

        {/* Program Content Details */}
        <div className="flex flex-col p-6 flex-grow">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3.5 text-xs text-muted mb-3">
            {program.start_date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{new Date(program.start_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
              </div>
            )}
            {program.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{program.location}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors duration-500 flex items-start justify-between gap-1">
            <span>{program.title}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 text-primary transition-opacity duration-500" />
          </h3>
          
          {/* Excerpt */}
          <p className="text-xs md:text-sm text-muted leading-relaxed line-clamp-3 mb-4 flex-grow">
            {program.summary}
          </p>

          {/* Action Footnote */}
          <div className="pt-4 border-t border-border/25 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-primary-dark transition-colors duration-500">
            <span>Lihat Pratinjau Program</span>
            <span className="w-6 h-6 rounded-full bg-primary-soft/50 group-hover:bg-primary group-hover:text-[#091213] flex items-center justify-center transition-all duration-[600ms] ease-[0.16,1,0.3,1]">
              →
            </span>
          </div>
        </div>
      </div>

      {/* Program Detail Preview Modal */}
      <ProgramModal program={isOpen ? program : null} onClose={() => setIsOpen(false)} />
    </>
  );
}
