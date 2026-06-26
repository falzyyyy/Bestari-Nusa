"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FolderKanban, 
  BookOpen, 
  Users, 
  Mail, 
  ArrowRight, 
  MessageSquare, 
  Clock, 
  Sparkles 
} from "lucide-react";
import { db } from "@/lib/supabase";
import { Program, Post, TeamMember, Inquiry } from "@/lib/store";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    programs: 0,
    posts: 0,
    team: 0,
    inquiries: 0,
    unreadInquiries: 0
  });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [programs, posts, team, inquiries] = await Promise.all([
          db.getAllProgramsRaw(),
          db.getAllPostsRaw(),
          db.getAllTeamMembersRaw(),
          db.getInquiries()
        ]);

        const unread = inquiries.filter(i => i.status === "new").length;

        setStats({
          programs: programs.length,
          posts: posts.length,
          team: team.length,
          inquiries: inquiries.length,
          unreadInquiries: unread
        });

        setRecentInquiries(inquiries.slice(0, 4));
      } catch (e) {
        console.error("Error loading dashboard data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3.5">
        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <span className="text-xs text-muted">Memuat ringkasan statistik dashboard...</span>
      </div>
    );
  }

  const statCards = [
    { label: "Total Program", value: stats.programs, href: "/admin/programs", icon: FolderKanban, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Artikel Berita", value: stats.posts, href: "/admin/news", icon: BookOpen, color: "text-blue-500 bg-blue-500/10" },
    { label: "Tim Pengurus", value: stats.team, href: "/admin/team", icon: Users, color: "text-amber-500 bg-amber-500/10" },
    { label: "Kotak Pesan", value: stats.inquiries, href: "/admin/inquiries", icon: Mail, color: "text-purple-500 bg-purple-500/10" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl border border-primary/20 bg-gradient-to-tr from-primary-soft/30 via-card to-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-foreground flex items-center gap-2">
            Selamat Datang, Admin <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </h1>
          <p className="text-xs text-muted leading-relaxed max-w-xl">
            Di panel Bestari Admin, Anda memiliki wewenang penuh untuk melakukan penambahan, pengubahan, serta penghapusan data secara dinamis.
          </p>
        </div>
        
        {stats.unreadInquiries > 0 && (
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold transition-all shadow-sm shrink-0"
          >
            <span>{stats.unreadInquiries} Pesan Baru</span> <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Stats Summary Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className="p-5 md:p-6 rounded-2xl border border-border bg-card shadow-sm hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 block"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl md:text-3xl font-black text-foreground">
                  {card.value}
                </span>
              </div>
              <h4 className="text-xs font-bold text-muted mt-4 uppercase tracking-wider">
                {card.label}
              </h4>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Message Inbox (Col-span 2) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm md:text-base font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4.5 h-4.5 text-primary" /> Pesan Masuk Terbaru
            </h3>
            <Link 
              href="/admin/inquiries"
              className="text-xs font-bold text-primary hover:underline"
            >
              Semua Pesan
            </Link>
          </div>

          <div className="space-y-3">
            {recentInquiries.length === 0 ? (
              <div className="text-center py-8 text-muted text-xs">
                Belum ada pesan masuk dari formulir kontak.
              </div>
            ) : (
              recentInquiries.map((inq) => (
                <div 
                  key={inq.id}
                  className={`p-4 rounded-xl border transition-all text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                    inq.status === "new" 
                      ? "border-primary/30 bg-primary-soft/10 dark:bg-primary-soft/5" 
                      : "border-border bg-background"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-foreground font-semibold">{inq.name}</strong>
                      <span className="text-[10px] text-muted">({inq.institution || "Personal"})</span>
                    </div>
                    <p className="text-muted leading-relaxed line-clamp-1 max-w-md">
                      {inq.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 shrink-0">
                    <span className="text-[9px] text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      {new Date(inq.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      inq.status === "new" 
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                        : "bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Shortcut Panel */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <h3 className="text-sm md:text-base font-bold text-foreground">
            Aksi Cepat
          </h3>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/admin/news?new=true"
              className="w-full text-center py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              + Tulis Artikel Baru
            </Link>
            <Link
              href="/admin/programs?new=true"
              className="w-full text-center py-2.5 border border-border hover:bg-primary-soft/30 text-foreground rounded-xl text-xs font-bold transition-all"
            >
              + Tambah Program Kerja
            </Link>
            <Link
              href="/admin/team?new=true"
              className="w-full text-center py-2.5 border border-border hover:bg-primary-soft/30 text-foreground rounded-xl text-xs font-bold transition-all"
            >
              + Tambah Anggota Tim
            </Link>
            <Link
              href="/admin/partners?new=true"
              className="w-full text-center py-2.5 border border-border hover:bg-primary-soft/30 text-foreground rounded-xl text-xs font-bold transition-all"
            >
              + Registrasi Partner Baru
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
