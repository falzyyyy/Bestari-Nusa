"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Edit2, Trash2, X, Handshake, Sparkles } from "lucide-react";
import { db } from "@/lib/supabase";
import { Partner } from "@/lib/store";

export default function PartnersCrud() {
  const searchParams = useSearchParams();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Editor States
  const [editingPartner, setEditingPartner] = useState<Partial<Partner> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { uploadImage } = await import("@/lib/upload");
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, logo: url }));
    } catch (err: any) {
      alert(err.message || "Gagal mengunggah gambar");
    } finally {
      setUploading(false);
    }
  };

  const [formData, setFormData] = useState<Partial<Partner>>({
    name: "",
    slug: "",
    logo: "",
    website_url: "",
    partnership_type: "CSR",
    year: new Date().getFullYear(),
    is_featured: false,
    order_index: 1,
    is_active: true
  });

  const loadPartners = async () => {
    setLoading(true);
    try {
      const allPartners = await db.getAllPartnersRaw();
      setPartners(allPartners);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      handleOpenCreate();
    }
  }, [searchParams]);

  const handleOpenCreate = () => {
    setEditingPartner(null);
    setFormData({
      name: "",
      slug: "",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150&h=80",
      website_url: "https://google.com",
      partnership_type: "CSR",
      year: new Date().getFullYear(),
      is_featured: false,
      order_index: partners.length + 1,
      is_active: true
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({ ...partner });
    setIsFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "name" && !editingPartner) {
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
    if (!formData.name) {
      alert("Harap lengkapi semua kolom wajib.");
      return;
    }

    try {
      await db.savePartner(formData);
      setIsFormOpen(false);
      loadPartners();
    } catch (err: any) {
      alert(`Gagal menyimpan partner: ${err.message || err}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus partner ini?")) {
      try {
        const success = await db.deletePartner(id);
        if (success) {
          loadPartners();
        } else {
          alert("Gagal menghapus partner.");
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
          <h1 className="text-xl md:text-2xl font-black text-foreground">Kelola Partner & Mitra</h1>
          <p className="text-xs text-muted">Daftarkan institusi donor, organisasi CSR, komunitas, and partner akademik.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" /> Tambah Partner
        </button>
      </div>

      {/* Editor Drawer Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
          <div className="w-full max-w-xl bg-background border-l border-border h-full flex flex-col p-6 overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-bold text-foreground">
                {editingPartner ? "Edit Partner" : "Tambah Partner"}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="p-1 hover:bg-border rounded cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs md:text-sm">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Nama Partner *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama partner..."
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  required
                />
              </div>

              {/* URL Website */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Link Website Partner</label>
                <input
                  type="text"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground flex items-center justify-between">
                  <span>Logo Mitra *</span>
                  {uploading && <span className="text-[10px] text-primary animate-pulse">Mengunggah...</span>}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="logo"
                    value={formData.logo}
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

              {/* Type and Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Tipe Kemitraan *</label>
                  <select
                    name="partnership_type"
                    value={formData.partnership_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  >
                    <option value="CSR">Corporate CSR Partner</option>
                    <option value="NGO">LSM / Yayasan (NGO)</option>
                    <option value="Academic">Akademik / Kampus</option>
                    <option value="Government">Pemerintah Daerah</option>
                    <option value="Community">Komunitas Lokal</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Tahun Kerja Sama *</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min={2020}
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  />
                </div>
              </div>

              {/* Toggles: Featured, Active, Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-primary-soft/20 dark:bg-primary-soft/5 rounded-2xl border border-border">
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
                    Featured
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleCheckboxChange}
                    className="w-4.5 h-4.5 accent-primary"
                  />
                  <label htmlFor="is_active" className="font-semibold text-foreground cursor-pointer">
                    Aktif
                  </label>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[10px] text-muted">Order Index</label>
                  <input
                    type="number"
                    name="order_index"
                    value={formData.order_index || 1}
                    onChange={handleInputChange}
                    min={1}
                    className="w-full px-2 py-0.5 bg-card border border-border rounded text-foreground"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm cursor-pointer"
              >
                Simpan Partner
              </button>

            </form>

          </div>
        </div>
      )}

      {/* Partners list table grid */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-10 text-muted">Memuat partner...</div>
        ) : partners.length === 0 ? (
          <div className="text-center py-10 text-muted">Belum ada partner terdaftar. Klik "Tambah Partner".</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-primary-soft/30 dark:bg-primary-soft/5 text-foreground border-b border-border font-bold">
                  <th className="p-4">Logo</th>
                  <th className="p-4">Nama Partner</th>
                  <th className="p-4">Jenis Kemitraan</th>
                  <th className="p-4 text-center">Tahun</th>
                  <th className="p-4 text-center">Urutan</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {partners.map(partner => (
                  <tr key={partner.id} className="hover:bg-primary-soft/10 dark:hover:bg-primary-soft/5 transition-colors">
                    <td className="p-4 shrink-0">
                      <div className="w-14 h-8 rounded bg-primary-soft/20 border border-border flex items-center justify-center p-1.5">
                        {partner.logo ? (
                          <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain filter grayscale dark:invert" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary">
                            <Handshake className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-foreground">
                      <div className="flex flex-col gap-0.5">
                        <span>{partner.name}</span>
                        {partner.website_url && (
                          <a href={partner.website_url} target="_blank" rel="noreferrer" className="text-[10px] text-primary hover:underline font-mono">
                            {partner.website_url}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 bg-primary-soft/40 dark:bg-primary-soft/10 text-primary-dark dark:text-primary rounded text-[10px] font-bold">
                        {partner.partnership_type}
                      </span>
                    </td>
                    <td className="p-4 text-center text-muted font-mono">
                      {partner.year}
                    </td>
                    <td className="p-4 text-center font-semibold text-foreground">
                      {partner.order_index}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        partner.is_active
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                      }`}>
                        {partner.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenEdit(partner)}
                          className="p-1.5 rounded-lg border border-border hover:bg-primary-soft/30 text-primary cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="p-1.5 rounded-lg border border-border hover:bg-red-950/20 text-red-400 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
