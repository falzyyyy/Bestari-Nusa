"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Think.", "Act.", "Sustain."];

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [hasSeenLoader, setHasSeenLoader] = useState(false);

  useEffect(() => {
    // Check session storage to ensure the user only sees this once per session
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("bestari-loader-seen");
      if (seen === "true") {
        setIsVisible(false);
        setHasSeenLoader(true);
        return;
      }
    }

    // Word rotation loop
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev === WORDS.length - 1) {
          clearInterval(wordInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    // Hide loader after animation completion
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("bestari-loader-seen", "true");
      }
    }, 1800);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (hasSeenLoader) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F1A14] text-[#FFF6DE]"
        >
          {/* Animated background soft grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(167,199,125,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,199,125,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Central Logo and taglines */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#A7C77D] flex items-center justify-center text-[#0F1A14] font-black text-lg shadow-md">
                B
              </div>
              <span className="text-xl font-bold tracking-widest uppercase text-white">
                Bestari Nusa
              </span>
            </motion.div>

            {/* Word state cycle (Think. Act. Sustain) */}
            <div className="h-8 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-lg md:text-xl font-medium tracking-wide text-[#A7C77D]/95"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Growing matcha seed particles animation */}
            <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute h-full bg-[#A7C77D] shadow-[0_0_12px_#A7C77D]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
