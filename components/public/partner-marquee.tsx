"use client";

import React from "react";
import { Partner } from "@/lib/store";

interface PartnerMarqueeProps {
  partners: Partner[];
}

export default function PartnerMarquee({ partners }: PartnerMarqueeProps) {
  if (partners.length === 0) return null;

  // Duplicate list to achieve continuous loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="w-full overflow-hidden relative py-6">
      {/* Side fades for visual blending */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused] py-2">
        {duplicatedPartners.map((partner, idx) => (
          <div
            key={`${partner.id}-${idx}`}
            className="mx-8 md:mx-12 flex items-center justify-center p-4 bg-card rounded-xl border border-border/40 hover:border-primary/30 transition-colors shadow-sm w-36 h-20 shrink-0"
          >
            {/* Logo image or descriptive text representation if logo not available */}
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 max-w-full object-contain filter grayscale dark:invert hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <span className="text-sm font-semibold text-muted text-center leading-tight">
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
