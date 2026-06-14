import Link from "next/link";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Program } from "@/lib/store";

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const getStatusColor = (status: Program["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/55";
      case "ongoing":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/55";
      case "completed":
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-400 border-slate-200/55";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-400 border-slate-200/55";
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
    <Link 
      href={`/programs/${program.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 w-full"
    >
      {/* Program Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-primary-soft/10">
        <img
          src={program.cover_image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&h=500"}
          alt={program.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(program.status)}`}>
            {getStatusText(program.status)}
          </span>
        </div>
      </div>

      {/* Program Content Details */}
      <div className="flex flex-col p-6 flex-grow">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-muted mb-2.5">
          {program.start_date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{new Date(program.start_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
            </div>
          )}
          {program.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{program.location}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors duration-300 flex items-start justify-between gap-1">
          <span>{program.title}</span>
          <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </h3>
        <p className="text-xs md:text-sm text-muted leading-relaxed line-clamp-3 mb-4 flex-grow">
          {program.summary}
        </p>

        {/* Action Footnote */}
        <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-primary-dark transition-colors">
          <span>Pelajari Selengkapnya</span>
          <span className="w-6 h-6 rounded-full bg-primary-soft/50 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors duration-300">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
