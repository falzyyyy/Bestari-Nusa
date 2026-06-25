"use client";

import React from "react";

export default function BackgroundPatterns() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
      
      {/* 1. Dotted Blueprint Research Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(8,142,146,0.045)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(0,175,180,0.025)_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* 2. Topographic Contour Line Wave 1 (Upper Left Section) */}
      <svg className="absolute top-[8%] left-[-15%] w-[130%] h-[700px] text-primary/10 dark:text-primary/5 select-none" viewBox="0 0 1440 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 150 C300 30, 550 480, 950 350 C1250 260, 1350 520, 1650 400" stroke="currentColor" strokeWidth="1.2" />
        <path d="M-100 200 C300 80, 550 530, 950 400 C1250 310, 1350 570, 1650 450" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
        <path d="M-100 250 C300 130, 550 580, 950 450 C1250 360, 1350 620, 1650 500" stroke="currentColor" strokeWidth="1.2" />
        <path d="M-100 300 C300 180, 550 630, 950 500 C1250 410, 1350 670, 1650 550" stroke="currentColor" strokeWidth="0.8" />
        <path d="M-100 350 C300 230, 550 680, 950 550 C1250 460, 1350 720, 1650 600" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
      </svg>

      {/* 3. Topographic Contour Line Wave 2 (Middle Right Section) */}
      <svg className="absolute top-[42%] right-[-15%] w-[130%] h-[700px] text-primary/10 dark:text-primary/5 select-none" viewBox="0 0 1440 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1650 120 C1250 20, 1000 480, 600 350 C300 250, 150 520, -150 400" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1650 170 C1250 70, 1000 530, 600 400 C300 300, 150 570, -150 450" stroke="currentColor" strokeWidth="0.8" strokeDasharray="5 5" />
        <path d="M1650 220 C1250 120, 1000 580, 600 450 C300 350, 150 620, -150 500" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1650 270 C1250 170, 1000 630, 600 500 C300 400, 150 670, -150 550" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      {/* 4. Topographic Contour Line Wave 3 (Lower Left Section) */}
      <svg className="absolute bottom-[5%] left-[-10%] w-[120%] h-[600px] text-primary/10 dark:text-primary/5 select-none" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 100 C250 40, 500 420, 850 300 C1150 220, 1250 480, 1550 360" stroke="currentColor" strokeWidth="1.0" />
        <path d="M-100 150 C250 90, 500 470, 850 350 C1150 270, 1250 530, 1550 410" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" />
        <path d="M-100 200 C250 140, 500 520, 850 400 C1150 320, 1250 580, 1550 460" stroke="currentColor" strokeWidth="1.0" />
      </svg>

      {/* 5. Geographic Research Coordinates & Brand Watermark Text */}
      <div className="absolute top-[18%] left-[6%] text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary/20 dark:text-primary/10 select-none">
        LOC.SUMATRA // 2.9909° S, 104.7566° E
      </div>
      <div className="absolute top-[55%] right-[6%] text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary/20 dark:text-primary/10 select-none">
        EVIDENCE-BASED SOCIAL MAPPING
      </div>
      <div className="absolute bottom-[18%] left-[8%] text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary/20 dark:text-primary/10 select-none">
        BESTARI NUSA // EST. 2026
      </div>
    </div>
  );
}
