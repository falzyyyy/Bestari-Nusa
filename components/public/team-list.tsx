"use client";

import React, { useState } from "react";
import { Mail, Users, ArrowUpRight } from "lucide-react";
import { Instagram, Linkedin, Twitter } from "@/components/ui/icons";
import { TeamMember, Division } from "@/lib/store";
import TeamModal from "./team-modal";

interface TeamListProps {
  divisions: Division[];
  allMembers: TeamMember[];
}

export default function TeamList({ divisions, allMembers }: TeamListProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeDivisionName, setActiveDivisionName] = useState<string>("");

  const handleMemberClick = (member: TeamMember, divName: string) => {
    setSelectedMember(member);
    setActiveDivisionName(divName);
  };

  return (
    <>
      <div className="space-y-16">
        {divisions.map((division) => {
          const membersInDivision = allMembers.filter(
            (m) => m.division_id === division.id
          );

          if (membersInDivision.length === 0) return null;

          return (
            <div key={division.id} className="space-y-6">
              
              {/* Division Title & Line */}
              <div className="flex items-center gap-4 border-b border-border/25 pb-3">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                  {division.name}
                </h3>
                <span className="text-xs text-muted">
                  ({membersInDivision.length} Orang)
                </span>
                <div className="h-[1px] bg-border/20 flex-grow" />
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {membersInDivision.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => handleMemberClick(member, division.name)}
                    className="group flex flex-col p-6 rounded-md border border-border bg-card/65 hover:border-primary/40 hover:shadow-sm cursor-pointer transition-all duration-[600ms] ease-[0.16,1,0.3,1] space-y-4 relative"
                  >
                    
                    {/* Avatar photo with Slow Gray-to-Color zoom */}
                    <div className="aspect-square w-full rounded overflow-hidden bg-primary-soft/10 relative">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale saturate-[0.8] brightness-[0.95] group-hover:grayscale-0 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[800ms] ease-[0.16,1,0.3,1]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-soft/30 text-primary">
                          <Users className="w-12 h-12" />
                        </div>
                      )}
                    </div>

                    {/* Meta name / role */}
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                          {member.name}
                        </h4>
                        <p className="text-xs text-primary font-medium mt-0.5">
                          {member.position}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 text-primary transition-opacity duration-500" />
                    </div>

                    {/* Bio */}
                    {member.bio && (
                      <p className="text-xs text-muted leading-relaxed line-clamp-3 flex-grow">
                        {member.bio}
                      </p>
                    )}

                    {/* Footer Info button */}
                    <div className="pt-3 border-t border-border/25 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-primary-dark transition-colors duration-500">
                      <span>Lihat Bio Lengkap</span>
                      <span className="w-5 h-5 rounded-full bg-primary-soft/50 group-hover:bg-primary group-hover:text-[#091213] flex items-center justify-center transition-all duration-[600ms]">
                        →
                      </span>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Team Details Popup Modal */}
      <TeamModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        divisionName={activeDivisionName}
      />
    </>
  );
}
