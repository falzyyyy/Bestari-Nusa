"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Edit2, Trash2, X, Users, Sparkles } from "lucide-react";
import { db } from "@/lib/supabase";
import { TeamMember, Division } from "@/lib/store";

export default function TeamCrud() {
  const searchParams = useSearchParams();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Editor States
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { uploadImage } = await import("@/lib/upload");
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, photo: url }));
    } catch (err: any) {
      alert(err.message || "Gagal mengunggah gambar");
    } finally {
      setUploading(false);
    }
  };
  
  // Custom states for social link inputs
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    slug: "",
    position: "",
    division_id: "",
    photo: "",
    bio: "",
    email: "",
    order_index: 1,
    is_featured: false,
    is_active: true
  });

  const loadMembersAndDivisions = async () => {
    setLoading(true);
    try {
      const [allMembers, allDivs] = await Promise.all([
        db.getAllTeamMembersRaw(),
        db.getDivisions()
      ]);
      setMembers(allMembers);
      setDivisions(allDivs);
      if (allDivs.length > 0) {
        setFormData(prev => ({ ...prev, division_id: allDivs[0].id }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembersAndDivisions();
  }, []);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      handleOpenCreate();
    }
  }, [searchParams, divisions]);

  const handleOpenCreate = () => {
    setEditingMember(null);
    setLinkedinUrl("");
    setInstagramUrl("");
    setTwitterUrl("");
    setFormData({
      name: "",
      slug: "",
      position: "",
      division_id: divisions[0]?.id || "",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300",
      bio: "",
      email: "",
      order_index: members.length + 1,
      is_featured: false,
      is_active: true
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({ ...member });
    setLinkedinUrl(member.social_links?.linkedin || "");
    setInstagramUrl(member.social_links?.instagram || "");
    setTwitterUrl(member.social_links?.twitter || "");
    setIsFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "name" && !editingMember) {
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
    if (!formData.name || !formData.position) {
      alert("Harap lengkapi semua kolom wajib.");
      return;
    }

    const submitData = {
      ...formData,
      social_links: {
        linkedin: linkedinUrl.trim() || undefined,
        instagram: instagramUrl.trim() || undefined,
        twitter: twitterUrl.trim() || undefined
      }
    };

    try {
      await db.saveTeamMember(submitData);
      setIsFormOpen(false);
      loadMembersAndDivisions();
    } catch (err: any) {
      alert(`Gagal menyimpan anggota: ${err.message || err}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) {
      try {
        const success = await db.deleteTeamMember(id);
        if (success) {
          loadMembersAndDivisions();
        } else {
          alert("Gagal menghapus anggota.");
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
          <h1 className="text-xl md:text-2xl font-black text-foreground">Kelola Tim Pengurus</h1>
          <p className="text-xs text-muted">Kelola struktur kepengurusan, dewan penasihat, and fasilitator program.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" /> Tambah Anggota
        </button>
      </div>

      {/* Editor Drawer Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
          <div className="w-full max-w-xl bg-background border-l border-border h-full flex flex-col p-6 overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-bold text-foreground">
                {editingMember ? "Edit Anggota Tim" : "Tambah Anggota Tim"}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="p-1 hover:bg-border rounded cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs md:text-sm">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Nama Lengkap *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama anggota..."
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  required
                />
              </div>

              {/* Position */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Jabatan / Peran *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Contoh: Executive Director / Project Officer"
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  required
                />
              </div>

              {/* Division */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Divisi Organisasi *</label>
                <select
                  name="division_id"
                  value={formData.division_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                >
                  {divisions.map(div => (
                    <option key={div.id} value={div.id}>{div.name}</option>
                  ))}
                </select>
              </div>

              {/* Photo & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground flex items-center justify-between">
                    <span>Foto Profil *</span>
                    {uploading && <span className="text-[10px] text-primary animate-pulse">Mengunggah...</span>}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="photo"
                      value={formData.photo}
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
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Alamat Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nama@bestarinusa.org"
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

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Bio Singkat Anggota</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={2.5}
                  placeholder="Tulis biografi singkat kompetensi anggota..."
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                />
              </div>

              {/* Social Links */}
              <div className="space-y-3 p-4 bg-background border border-border rounded-2xl">
                <h4 className="font-bold text-foreground">Media Sosial Anggota</h4>
                
                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-1.5 bg-card border border-border rounded-lg text-foreground font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted">Instagram Profile URL</label>
                    <input
                      type="text"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="https://instagram.com/..."
                      className="w-full px-3 py-1.5 bg-card border border-border rounded-lg text-foreground font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted">Twitter/X URL</label>
                    <input
                      type="text"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      placeholder="https://x.com/..."
                      className="w-full px-3 py-1.5 bg-card border border-border rounded-lg text-foreground font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm cursor-pointer"
              >
                Simpan Anggota Tim
              </button>

            </form>

          </div>
        </div>
      )}

      {/* Team members list table grid */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-10 text-muted">Memuat anggota pengurus...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-10 text-muted">Belum ada anggota. Klik "Tambah Anggota" untuk memulai.</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-primary-soft/30 dark:bg-primary-soft/5 text-foreground border-b border-border font-bold">
                  <th className="p-4">Foto</th>
                  <th className="p-4">Nama Lengkap</th>
                  <th className="p-4">Jabatan</th>
                  <th className="p-4">Divisi</th>
                  <th className="p-4 text-center">Urutan</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {members.map(member => {
                  const div = divisions.find(d => d.id === member.division_id);
                  return (
                    <tr key={member.id} className="hover:bg-primary-soft/10 dark:hover:bg-primary-soft/5 transition-colors">
                      <td className="p-4 shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-soft/20 border border-border">
                          {member.photo ? (
                            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary-soft text-primary">
                              <Users className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-foreground">
                        {member.name}
                      </td>
                      <td className="p-4 text-muted">
                        {member.position}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-primary-soft/40 dark:bg-primary-soft/10 text-primary-dark dark:text-primary rounded text-[10px] font-bold">
                          {div?.name || "Lembaga"}
                        </span>
                      </td>
                      <td className="p-4 text-center font-semibold text-foreground">
                        {member.order_index}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          member.is_active
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                        }`}>
                          {member.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleOpenEdit(member)}
                            className="p-1.5 rounded-lg border border-border hover:bg-primary-soft/30 text-primary cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
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
