"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FolderKanban, 
  BookOpen, 
  Users, 
  Handshake, 
  Mail, 
  LogOut, 
  Sparkles,
  Menu,
  X,
  FileCode2
} from "lucide-react";
import { MockDb } from "@/lib/store";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const ADMIN_MENU_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Kelola Program", href: "/admin/programs", icon: FolderKanban },
  { label: "Kelola Berita", href: "/admin/news", icon: BookOpen },
  { label: "Kelola Tim", href: "/admin/team", icon: Users },
  { label: "Kelola Partner", href: "/admin/partners", icon: Handshake },
  { label: "Pesan Masuk", href: "/admin/inquiries", icon: Mail }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dbMode, setDbMode] = useState("Mock Offline");

  // Auto-close sidebar on page navigation (Mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Check database mode
    if (isSupabaseConfigured) {
      setDbMode("Supabase Live");
    }

    // Client-side authentication guard
    const checkAuth = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login");
        } else {
          setAuthorized(true);
        }
      } else {
        const isLogged = MockDb.checkSession();
        if (!isLogged) {
          router.push("/login");
        } else {
          setAuthorized(true);
        }
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    MockDb.logout();
    router.push("/login");
  };

  if (!authorized) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground gap-3.5">
        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <span className="text-xs font-semibold text-muted">Memeriksa hak akses portal admin...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-300">
      
      {/* Sidebar Backdrop Overlay on Mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* 1. SIDEBAR CONTAINER */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-30 w-64 bg-[#0F1E20] text-[#E7ECEC]/90 border-r border-[#088E92]/20 p-5 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Logo brand */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[#091213] font-black text-xs">
                B
              </div>
              <span className="font-extrabold tracking-tight text-white text-base">
                Bestari<span className="text-[#00AFB4]">Admin</span>
              </span>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-white hover:bg-white/10 rounded md:hidden cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* DB connection badge */}
          <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-primary flex items-center gap-1.8 w-full justify-center">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> {dbMode}
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {ADMIN_MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                    isActive 
                      ? "bg-primary text-[#091213] shadow-md" 
                      : "hover:bg-white/5 text-[#8FA4A6] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer controls & Logout */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Keluar Portal</span>
          </button>
          
          <div className="text-[10px] text-muted text-center pt-2">
            Bestari Nusa Admin v1.0
          </div>
        </div>

      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 md:pl-64 min-h-screen flex flex-col min-w-0 overflow-hidden transition-all duration-300">
        
        {/* Admin Header */}
        <header className="sticky top-0 z-20 w-full glass-navbar py-3 px-4 sm:px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3.5">
            {/* Sidebar toggle button (Mobile) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.8 border border-border bg-card rounded-lg md:hidden cursor-pointer"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
            <h2 className="text-sm md:text-base font-bold text-foreground capitalize">
              {pathname.split("/").slice(-1)[0]} Management
            </h2>
          </div>

          <div className="flex items-center gap-3.5">
            <ThemeToggle />
            <Link 
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:bg-primary-soft/30 text-xs font-semibold"
            >
              Lihat Website <FileCode2 className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-grow p-4 sm:p-6 md:p-8 bg-background min-w-0 overflow-x-hidden">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
