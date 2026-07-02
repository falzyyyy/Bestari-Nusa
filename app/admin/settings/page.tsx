"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/supabase";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, 
  Home, 
  Info, 
  Phone, 
  Loader2, 
  Plus, 
  Trash2, 
  Sparkles 
} from "lucide-react";

type ActiveTab = "home" | "about" | "contact";

export default function PagesSettings() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Home Page State
  const [homeData, setHomeData] = useState({
    hero_badge: "",
    hero_title: "",
    hero_description: "",
    about_title: "",
    about_description: ""
  });

  // About Page State
  const [aboutData, setAboutData] = useState({
    header_title: "",
    header_description: "",
    about_title: "",
    about_description_id: "",
    about_description_id_2: "",
    visi: "",
    visi_en: "",
    misi: [] as string[]
  });

  // Contact Page State
  const [contactData, setContactData] = useState({
    title: "",
    description: "",
    address: "",
    email: "",
    phone: ""
  });

  // Load all settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        const [home, about, contact] = await Promise.all([
          db.getSiteSetting("page_home"),
          db.getSiteSetting("page_about"),
          db.getSiteSetting("page_contact")
        ]);

        if (home) setHomeData(home);
        if (about) setAboutData(about);
        if (contact) setContactData(contact);
      } catch (err: any) {
        toast.error("Gagal memuat pengaturan halaman: " + (err.message || err));
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Handle Home Input Changes
  const handleHomeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHomeData(prev => ({ ...prev, [name]: value }));
  };

  // Handle About Input Changes
  const handleAboutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData(prev => ({ ...prev, [name]: value }));
  };

  // Handle About Misi Changes
  const handleMisiChange = (index: number, value: string) => {
    const newMisi = [...aboutData.misi];
    newMisi[index] = value;
    setAboutData(prev => ({ ...prev, misi: newMisi }));
  };

  const handleAddMisi = () => {
    setAboutData(prev => ({ ...prev, misi: [...prev.misi, ""] }));
  };

  const handleRemoveMisi = (index: number) => {
    const newMisi = aboutData.misi.filter((_, i) => i !== index);
    setAboutData(prev => ({ ...prev, misi: newMisi }));
  };

  // Handle Contact Input Changes
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  // Save Settings
  const handleSave = async (tab: ActiveTab) => {
    setSaving(true);
    try {
      if (tab === "home") {
        await db.saveSiteSetting("page_home", homeData);
        toast.success("Konten Beranda berhasil disimpan!");
      } else if (tab === "about") {
        await db.saveSiteSetting("page_about", aboutData);
        toast.success("Konten Tentang Kami berhasil disimpan!");
      } else if (tab === "contact") {
        await db.saveSiteSetting("page_contact", contactData);
        toast.success("Konten Hubungi Kami berhasil disimpan!");
      }
    } catch (err: any) {
      toast.error("Gagal menyimpan data: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3.5">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <span className="text-xs text-muted">Memuat pengaturan konten halaman...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-foreground">Kelola Konten Halaman</h1>
          <p className="text-xs text-muted">Ubah konten teks utama pada halaman Beranda, Tentang, dan Hubungi Kami secara dinamis.</p>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex border-b border-border gap-2">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "home"
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <Home className="w-4 h-4" /> Beranda
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "about"
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <Info className="w-4 h-4" /> Tentang Kami
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "contact"
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <Phone className="w-4 h-4" /> Hubungi Kami
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-sm md:text-base font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Kustomisasi Halaman Beranda
                </h3>
              </div>

              <div className="space-y-4 text-xs md:text-sm">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Hero Badge Text</label>
                  <input
                    type="text"
                    name="hero_badge"
                    value={homeData.hero_badge}
                    onChange={handleHomeChange}
                    placeholder="Masukkan teks kecil di atas judul hero..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Hero Title (Judul Utama)</label>
                  <textarea
                    name="hero_title"
                    value={homeData.hero_title}
                    onChange={handleHomeChange}
                    rows={2.5}
                    placeholder="Masukkan judul utama hero..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Hero Subtitle (Deskripsi Hero)</label>
                  <textarea
                    name="hero_description"
                    value={homeData.hero_description}
                    onChange={handleHomeChange}
                    rows={3.5}
                    placeholder="Masukkan deskripsi pelengkap hero..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                  />
                </div>

                <div className="border-t border-border pt-4 mt-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Tentang Kami Preview - Judul</label>
                    <input
                      type="text"
                      name="about_title"
                      value={homeData.about_title}
                      onChange={handleHomeChange}
                      placeholder="Masukkan judul sekilas tentang kami..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Tentang Kami Preview - Deskripsi</label>
                    <textarea
                      name="about_description"
                      value={homeData.about_description}
                      onChange={handleHomeChange}
                      rows={4}
                      placeholder="Masukkan deskripsi ringkasan tentang kami di halaman utama..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <button
                  onClick={() => handleSave("home")}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Simpan Konten Beranda
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-sm md:text-base font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Kustomisasi Halaman Tentang Kami
                </h3>
              </div>

              <div className="space-y-4 text-xs md:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Header Title (Judul Banner)</label>
                    <input
                      type="text"
                      name="header_title"
                      value={aboutData.header_title}
                      onChange={handleAboutChange}
                      placeholder="Masukkan judul banner atas..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Sejarah Title (Judul Sejarah)</label>
                    <input
                      type="text"
                      name="about_title"
                      value={aboutData.about_title}
                      onChange={handleAboutChange}
                      placeholder="Masukkan judul bagian filosofi/sejarah..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Header Subtitle (Deskripsi Banner)</label>
                  <textarea
                    name="header_description"
                    value={aboutData.header_description}
                    onChange={handleAboutChange}
                    rows={3}
                    placeholder="Masukkan deskripsi panjang di bawah judul banner..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Sejarah Paragraf 1 (Bahasa Indonesia/EN)</label>
                    <textarea
                      name="about_description_id"
                      value={aboutData.about_description_id}
                      onChange={handleAboutChange}
                      rows={5}
                      placeholder="Tulis deskripsi filosofi paragraf pertama..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Sejarah Paragraf 2 (Bahasa Indonesia/EN)</label>
                    <textarea
                      name="about_description_id_2"
                      value={aboutData.about_description_id_2}
                      onChange={handleAboutChange}
                      rows={5}
                      placeholder="Tulis deskripsi filosofi paragraf kedua..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Visi Yayasan (Indonesia)</label>
                    <textarea
                      name="visi"
                      value={aboutData.visi}
                      onChange={handleAboutChange}
                      rows={2.5}
                      placeholder="Masukkan rumusan visi yayasan..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Visi Yayasan (Inggris)</label>
                    <textarea
                      name="visi_en"
                      value={aboutData.visi_en}
                      onChange={handleAboutChange}
                      rows={2.5}
                      placeholder="Enter the foundation's vision statement..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                    />
                  </div>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-foreground">Misi Yayasan (Daftar Poin)</label>
                    <button
                      type="button"
                      onClick={handleAddMisi}
                      className="flex items-center gap-1 px-3 py-1 bg-primary-soft/50 text-primary-dark hover:bg-primary-soft text-xs font-bold rounded-lg border border-border"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Poin
                    </button>
                  </div>

                  <div className="space-y-2">
                    {aboutData.misi.map((m, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <span className="text-xs font-bold text-muted w-6 shrink-0 text-center">{idx + 1}.</span>
                        <input
                          type="text"
                          value={m}
                          onChange={(e) => handleMisiChange(idx, e.target.value)}
                          placeholder={`Misi poin ke-${idx + 1}...`}
                          className="flex-grow px-4 py-2 bg-background border border-border rounded-xl text-foreground text-xs md:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveMisi(idx)}
                          className="p-2 border border-border bg-red-950/10 hover:bg-red-950/20 text-red-400 rounded-xl"
                          title="Hapus Misi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {aboutData.misi.length === 0 && (
                      <p className="text-xs text-muted italic py-2 text-center">Belum ada poin misi. Tambahkan satu untuk memulai.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <button
                  onClick={() => handleSave("about")}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Simpan Konten Tentang
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-sm md:text-base font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Kustomisasi Halaman Hubungi Kami
                </h3>
              </div>

              <div className="space-y-4 text-xs md:text-sm">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Contact Page Title (Judul Banner)</label>
                  <input
                    type="text"
                    name="title"
                    value={contactData.title}
                    onChange={handleContactChange}
                    placeholder="Masukkan judul banner hubungi..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Contact Page Subtitle (Deskripsi Banner)</label>
                  <textarea
                    name="description"
                    value={contactData.description}
                    onChange={handleContactChange}
                    rows={3}
                    placeholder="Masukkan deskripsi banner hubungi kami..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5 border-t border-border pt-4">
                  <label className="font-bold text-foreground">Alamat Sekretariat Lengkap</label>
                  <textarea
                    name="address"
                    value={contactData.address}
                    onChange={handleContactChange}
                    rows={2.5}
                    placeholder="Contoh: Jl. Merdeka No. 45, Palembang..."
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Alamat Email Resmi</label>
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleContactChange}
                      placeholder="info@bestarinusa.org"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground">Nomor WhatsApp Kerja Sama</label>
                    <input
                      type="text"
                      name="phone"
                      value={contactData.phone}
                      onChange={handleContactChange}
                      placeholder="+62 821-xxxx-xxxx"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <button
                  onClick={() => handleSave("contact")}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Simpan Konten Hubungi Kami
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
