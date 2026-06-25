"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/about" },
  { label: "Program", href: "/programs" },
  { label: "Cerita", href: "/news" },
  { label: "Tim", href: "/team" },
  { label: "Hubungi Kami", href: "/contact" }
];

export default function FloatingNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Monitor scroll height to trigger shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 pt-4 md:pt-6 transition-all duration-300">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`mx-auto max-w-5xl rounded-full glass-navbar flex items-center justify-between transition-all duration-300 ${
            isScrolled 
              ? "py-2 px-4 shadow-md bg-glass/95 scale-95 border-primary/30" 
              : "py-3.5 px-6 shadow-sm bg-glass/80"
          }`}
        >
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:rotate-12 transition-transform duration-300">
              B
            </div>
            <span className="font-bold tracking-tight text-foreground text-base md:text-lg">
              Bestari<span className="text-primary">Nusa</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:text-primary ${
                    isActive ? "text-primary-dark font-semibold" : "text-muted hover:bg-primary-soft/30"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-primary-soft rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-4.5 py-1.8 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-sm hover:shadow-glow hover:shadow-primary-soft cursor-pointer"
            >
              Kolaborasi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2.5 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full border border-border bg-card text-foreground cursor-pointer focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md flex flex-col justify-center px-6 md:hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-sm mx-auto space-y-8"
            >
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`block text-2xl font-bold py-2 border-b border-border/40 transition-colors ${
                          isActive ? "text-primary" : "text-muted hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-full text-base font-semibold shadow-md hover:bg-primary-dark cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" /> Mulai Kolaborasi
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
