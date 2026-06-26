import React from "react";
import { db } from "@/lib/supabase";
import TeamList from "@/components/public/team-list";

export const metadata = {
  title: "Struktur Organisasi",
  description: "Kenali pengurus, koordinator riset, dan tim fasilitator pemberdayaan Bestari Nusa."
};

export default async function TeamPage() {
  // Fetch divisions and team members
  const [divisions, allMembers] = await Promise.all([
    db.getDivisions(),
    db.getTeamMembers(false)
  ]);

  return (
    <div className="w-full pt-32 pb-16 md:pt-40 md:pb-24 space-y-16 relative z-10">
      
      {/* Page Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
          PENGURUS KAMI
        </h4>
        <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground leading-tight">
          Kolaborator Dampak Nusantara
        </h1>
        <p className="text-sm md:text-base text-muted max-w-2xl mx-auto">
          Digerakkan oleh kombinasi kepemimpinan strategis, keahlian metodologi riset sosial antropologis, dan ketekunan pendampingan warga lokal.
        </p>
      </section>

      {/* Divisions & Members Sections Wrapper (Client Component) */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <TeamList divisions={divisions} allMembers={allMembers} />
      </section>

    </div>
  );
}
