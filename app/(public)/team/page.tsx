import React from "react";
import { Mail, Users } from "lucide-react";
import { Instagram, Linkedin, Twitter } from "@/components/ui/icons";
import { db } from "@/lib/supabase";

export const metadata = {
  title: "Struktur Organisasi",
  description: "Kenali pengurus, koordinator riset, and tim fasilitator pemberdayaan Bestari Nusa."
};

export default async function TeamPage() {
  // Fetch divisions and team members
  const [divisions, allMembers] = await Promise.all([
    db.getDivisions(),
    db.getTeamMembers(false)
  ]);

  return (
    <div className="w-full py-16 md:py-24 space-y-16">
      
      {/* Page Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
          PENGURUS KAMI
        </h4>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Kolaborator Dampak Nusantara
        </h1>
        <p className="text-sm md:text-base text-muted max-w-2xl mx-auto">
          Digerakkan oleh kombinasi kepemimpinan strategis, keahlian metodologi riset sosial antropologis, dan ketekunan pendampingan warga lokal.
        </p>
      </section>

      {/* Divisions & Members Sections */}
      <section className="max-w-5xl mx-auto px-6 space-y-16">
        {divisions.map((division) => {
          // Filter members belonging to this division
          const membersInDivision = allMembers.filter(
            (m) => m.division_id === division.id
          );

          if (membersInDivision.length === 0) return null;

          return (
            <div key={division.id} className="space-y-6">
              
              {/* Division Title & Line */}
              <div className="flex items-center gap-4 border-b border-border/40 pb-3">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                  {division.name}
                </h3>
                <span className="text-xs text-muted">
                  ({membersInDivision.length} Orang)
                </span>
                <div className="h-[1px] bg-border/40 flex-grow" />
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {membersInDivision.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col p-6 rounded-2xl border border-border bg-card shadow-sm hover:scale-[1.01] transition-transform duration-300 space-y-4"
                  >
                    {/* Avatar photo */}
                    <div className="aspect-square w-full rounded-xl overflow-hidden bg-primary-soft/10 relative">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-soft text-primary">
                          <Users className="w-12 h-12" />
                        </div>
                      )}
                    </div>

                    {/* Meta name / role */}
                    <div>
                      <h4 className="text-base font-bold text-foreground">
                        {member.name}
                      </h4>
                      <p className="text-xs text-primary font-medium mt-0.5">
                        {member.position}
                      </p>
                    </div>

                    {/* Bio */}
                    {member.bio && (
                      <p className="text-xs text-muted leading-relaxed line-clamp-3 flex-grow">
                        {member.bio}
                      </p>
                    )}

                    {/* Social networks & email */}
                    <div className="flex items-center gap-2.5 pt-3.5 border-t border-border/40">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-1.5 rounded-full hover:bg-primary-soft text-muted hover:text-primary transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {member.social_links?.linkedin && (
                        <a
                          href={member.social_links.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-full hover:bg-primary-soft text-muted hover:text-primary transition-colors"
                          aria-label={`LinkedIn ${member.name}`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.social_links?.instagram && (
                        <a
                          href={member.social_links.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-full hover:bg-primary-soft text-muted hover:text-primary transition-colors"
                          aria-label={`Instagram ${member.name}`}
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {member.social_links?.twitter && (
                        <a
                          href={member.social_links.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-full hover:bg-primary-soft text-muted hover:text-primary transition-colors"
                          aria-label={`Twitter ${member.name}`}
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </section>

    </div>
  );
}
