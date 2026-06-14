"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Edit2, Trash2, X, Sparkles, HelpCircle } from "lucide-react";
import { db } from "@/lib/supabase";
import { Program, Category } from "@/lib/store";

export default function ProgramsCrud() {
  const searchParams = useSearchParams();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Editor States
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [objectivesText, setObjectivesText] = useState("");
  const [metricsText, setMetricsText] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { uploadImage } = await import("@/lib/upload");
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, cover_image: url }));
    } catch (err: any) {
      alert(err.message || "Gagal mengunggah gambar");
    } finally {
      setUploading(false);
    }
  };
  


  const [formData, setFormData] = useState<Partial<Program>>({
    title: "",
    slug: "",
    summary: "",
    description: "",
    category_id: "",
    status: "upcoming",
    location: "",
    start_date: "",
    end_date: "",
    cover_image: "",
    target_beneficiaries: "",
    approach: "",
    impact_summary: "",
    registration_url: "",
    collaboration_cta: "",
    is_featured: false,
    order_index: 1
  });

  const loadProgramsAndCategories = async () => {
    setLoading(true);
    try {
      const [allProgs, allCats] = await Promise.all([
        db.getAllProgramsRaw(),
        db.getCategories("program")
      ]);
      setPrograms(allProgs);
      setCategories(allCats);
      if (allCats.length > 0) {
        setFormData(prev => ({ ...prev, category_id: allCats[0].id }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgramsAndCategories();
  }, []);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      handleOpenCreate();
    }
  }, [searchParams, categories]);

  const handleOpenCreate = () => {
    setEditingProgram(null);
    setObjectivesText("");
    setMetricsText("");
    setFormData({
      title: "",
      slug: "",
      summary: "",
      description: "",
      category_id: categories[0]?.id || "",
      status: "upcoming",
      location: "Palembang, Sumsel",
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date().toISOString().split("T")[0],
      cover_image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=500",
      target_beneficiaries: "Masyarakat lokal",
      approach: "Pemberdayaan partisipatif",
      impact_summary: "Kemandirian ekonomi berkelanjutan",
      registration_url: "https://google.com",
      collaboration_cta: "Daftar Sekarang",
      is_featured: false,
      order_index: programs.length + 1
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (prog: Program) => {
    setEditingProgram(prog);
    setFormData({ ...prog });
    
    // Map list of objectives
    setObjectivesText(prog.objectives ? prog.objectives.join("\n") : "");
    
    // Map list of metrics
    setMetricsText(
      prog.impact_metrics 
        ? prog.impact_metrics.map(m => `${m.label}:${m.value}`).join("\n") 
        : ""
    );
    
    setIsFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && !editingProgram) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      }
      return updated;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.summary) {
      alert("Harap lengkapi semua kolom wajib.");
      return;
    }

    // Parse objectives from lines
    const parsedObjectives = objectivesText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Parse metrics from key-value lines
    const parsedMetrics = metricsText
      .split("\n")
      .map(line => {
        const parts = line.split(":");
        return {
          label: parts[0]?.trim() || "",
          value: parts[1]?.trim() || ""
        };
      })
      .filter(m => m.label.length > 0);

    const submitData = {
      ...formData,
      objectives: parsedObjectives,
      impact_metrics: parsedMetrics
    };

    try {
      await db.saveProgram(submitData);
      setIsFormOpen(false);
      loadProgramsAndCategories();
    } catch (err: any) {
      alert(`Gagal menyimpan program: ${err.message || err}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus program ini?")) {
      try {
        const success = await db.deleteProgram(id);
        if (success) {
          loadProgramsAndCategories();
        } else {
          alert("Gagal menghapus program.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-foreground">Kelola Program Kerja</h1>
          <p className="text-xs text-muted">Kelola inisiatif pemberdayaan sosial, inkubasi, and aksi lingkungan.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" /> Tambah Program
        </button>
      </div>

      {/* Editor Drawer Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
          <div className="w-full max-w-2xl bg-background border-l border-border h-full flex flex-col p-6 overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-bold text-foreground">
                {editingProgram ? "Edit Program Kerja" : "Tambah Program Kerja"}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="p-1 hover:bg-border rounded cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs md:text-sm">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Nama Program *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama program..."
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  required
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">URL Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="contoh-program-slug"
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  required
                />
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Kategori *</label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Status Program</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  >
                    <option value="upcoming">Akan Datang</option>
                    <option value="ongoing">Sedang Berjalan</option>
                    <option value="completed">Selesai</option>
                    <option value="archived">Diarsipkan (Sembunyi)</option>
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Mulai Pelaksanaan</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date ? formData.start_date.substring(0, 10) : ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-card border border-border rounded-xl text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Selesai Pelaksanaan</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date ? formData.end_date.substring(0, 10) : ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-card border border-border rounded-xl text-foreground"
                  />
                </div>
              </div>

              {/* Featured toggle & order index */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center bg-primary-soft/20 dark:bg-primary-soft/5 p-4 rounded-2xl border border-border">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleCheckboxChange}
                    className="w-4.5 h-4.5 accent-primary"
                  />
                  <label htmlFor="is_featured" className="font-semibold text-foreground cursor-pointer">
                    Tampilkan di Highlight Home
                  </label>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Urutan Tampilan (Order Index)</label>
                  <input
                    type="number"
                    name="order_index"
                    value={formData.order_index || 1}
                    onChange={handleInputChange}
                    min={1}
                    className="w-full px-4 py-1.5 bg-card border border-border rounded-lg text-foreground"
                  />
                </div>
              </div>

              {/* Parameters: Location, Cover, CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Lokasi *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Palembang, Sumsel"
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Tujuan CTA Kemitraan</label>
                  <input
                    type="text"
                    name="collaboration_cta"
                    value={formData.collaboration_cta}
                    onChange={handleInputChange}
                    placeholder="Daftar Sekarang / Kontak Kami"
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  />
                </div>
              </div>

              {/* Registration and Cover image URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Link Registrasi (Optional)</label>
                  <input
                    type="text"
                    name="registration_url"
                    value={formData.registration_url}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground flex items-center justify-between">
                    <span>URL Gambar Cover *</span>
                    {uploading && <span className="text-[10px] text-primary animate-pulse">Mengunggah...</span>}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="cover_image"
                      value={formData.cover_image}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-grow px-4 py-2.5 bg-card border border-border rounded-xl text-foreground text-xs"
                      required
                    />
                    <label className="shrink-0 px-3 py-2.5 bg-primary-soft/40 hover:bg-primary-soft/60 text-primary-dark rounded-xl text-xs font-bold border border-border cursor-pointer flex items-center justify-center">
                      <span>Pilih File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Target beneficiaries and Approach */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Penerima Manfaat</label>
                  <input
                    type="text"
                    name="target_beneficiaries"
                    value={formData.target_beneficiaries}
                    onChange={handleInputChange}
                    placeholder="Pemuda 20-25 tahun"
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Pendekatan Metodologi</label>
                  <input
                    type="text"
                    name="approach"
                    value={formData.approach}
                    onChange={handleInputChange}
                    placeholder="PRA / Design Thinking"
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Ringkasan Pendek (Summary) *</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Tulis deskripsi pendek program..."
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Deskripsi Lengkap *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tulis deskripsi detail program..."
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground"
                  required
                />
              </div>

              {/* Objectives */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground flex items-center justify-between">
                  <span>Tujuan & Sasaran (Satu Per Baris)</span>
                  <span className="text-[10px] text-muted">Tekan Enter untuk menambah poin</span>
                </label>
                <textarea
                  value={objectivesText}
                  onChange={(e) => setObjectivesText(e.target.value)}
                  rows={3}
                  placeholder="Poin tujuan 1&#10;Poin tujuan 2"
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground font-mono"
                />
              </div>

              {/* Impact metrics & Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground flex items-center justify-between">
                    <span>Indikator Dampak (Format: Label:Nilai)</span>
                    <span className="text-[10px] text-muted">Contoh: Penerima Manfaat:40 Orang</span>
                  </label>
                  <textarea
                    value={metricsText}
                    onChange={(e) => setMetricsText(e.target.value)}
                    rows={3}
                    placeholder="Penerima Manfaat:40 Orang&#10;Mentor:8 Orang"
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Ringkasan Dampak Nyata</label>
                  <textarea
                    name="impact_summary"
                    value={formData.impact_summary}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Contoh: Terciptanya 5 rancangan inisiatif desa..."
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  />
                </div>
              </div>

              {/* Submit actions */}
              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm cursor-pointer"
              >
                Simpan Program Kerja
              </button>

            </form>

          </div>
        </div>
      )}

      {/* Programs List Table Grid */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-10 text-muted">Memuat program kerja...</div>
        ) : programs.length === 0 ? (
          <div className="text-center py-10 text-muted">Belum ada program. Klik "Tambah Program" untuk memulai.</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-primary-soft/30 dark:bg-primary-soft/5 text-foreground border-b border-border font-bold">
                  <th className="p-4">Cover</th>
                  <th className="p-4">Nama Program</th>
                  <th className="p-4 hidden md:table-cell">Kategori</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center hidden sm:table-cell">Urutan</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {programs.map(prog => {
                  const cat = categories.find(c => c.id === prog.category_id);
                  return (
                    <tr key={prog.id} className="hover:bg-primary-soft/10 dark:hover:bg-primary-soft/5 transition-colors">
                      <td className="p-4 shrink-0">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-primary-soft/20 border border-border">
                          <img src={prog.cover_image} alt={prog.title} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="p-4 font-bold text-foreground">
                        <div className="flex flex-col gap-0.5 max-w-sm">
                          <span>{prog.title}</span>
                          <span className="text-[10px] text-muted font-normal">/{prog.slug}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="px-2 py-0.5 bg-primary-soft/40 dark:bg-primary-soft/10 text-primary-dark dark:text-primary rounded text-[10px] font-bold">
                          {cat?.name || "Program"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          prog.status === "ongoing"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : prog.status === "upcoming"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                            : "bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                        }`}>
                          {prog.status}
                        </span>
                      </td>
                      <td className="p-4 text-center font-semibold text-foreground hidden sm:table-cell">
                        {prog.order_index}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleOpenEdit(prog)}
                            className="p-1.5 rounded-lg border border-border hover:bg-primary-soft/30 text-primary cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(prog.id)}
                            className="p-1.5 rounded-lg border border-border hover:bg-red-950/20 text-red-400 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
