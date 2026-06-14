"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Edit2, Trash2, X, Check, Eye, HelpCircle } from "lucide-react";
import { db } from "@/lib/supabase";
import { Post, Category } from "@/lib/store";

export default function NewsCrud() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Editor States
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
  const [formData, setFormData] = useState<Partial<Post>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    category_id: "",
    status: "draft",
    is_featured: false,
    reading_time: 3
  });

  // Load Initial Data
  const loadPostsAndCategories = async () => {
    setLoading(true);
    try {
      const [allPosts, allCats] = await Promise.all([
        db.getAllPostsRaw(),
        db.getCategories("news")
      ]);
      setPosts(allPosts);
      setCategories(allCats);

      // Default the category selection
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
    loadPostsAndCategories();
  }, []);

  // Watch for quick addition param `?new=true`
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      handleOpenCreate();
    }
  }, [searchParams, categories]);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800&h=500",
      category_id: categories[0]?.id || "",
      status: "draft",
      is_featured: false,
      reading_time: 3
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({ ...post });
    setIsFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-generate slug from title
      if (name === "title" && !editingPost) {
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
    if (!formData.title || !formData.slug || !formData.content) {
      alert("Harap lengkapi semua kolom wajib.");
      return;
    }

    try {
      await db.savePost(formData);
      setIsFormOpen(false);
      loadPostsAndCategories();
    } catch (err: any) {
      alert(`Gagal menyimpan artikel: ${err.message || err}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        const success = await db.deletePost(id);
        if (success) {
          loadPostsAndCategories();
        } else {
          alert("Gagal menghapus artikel.");
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
          <h1 className="text-xl md:text-2xl font-black text-foreground">Kelola Kajian & Cerita</h1>
          <p className="text-xs text-muted">Kelola publikasi riset, berita, and cerita aksi lapangan.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" /> Tulis Artikel
        </button>
      </div>

      {/* Editor slide drawer overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
          <div className="w-full max-w-2xl bg-background border-l border-border h-full flex flex-col p-6 overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-bold text-foreground">
                {editingPost ? "Edit Artikel" : "Tulis Artikel Baru"}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="p-1 hover:bg-border rounded cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs md:text-sm">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Judul Artikel *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Masukkan judul artikel..."
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
                  placeholder="contoh-url-slug"
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
                  <label className="font-bold text-foreground">Status Publikasi</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  >
                    <option value="draft">Draft (Disembunyikan)</option>
                    <option value="published">Published (Ditampilkan)</option>
                    <option value="archived">Archived (Diarsipkan)</option>
                  </select>
                </div>
              </div>

              {/* Featured toggle & Reading Time */}
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
                    Tampilkan di Highlight Hero
                  </label>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Estimasi Waktu Baca (Menit)</label>
                  <input
                    type="number"
                    name="reading_time"
                    value={formData.reading_time || 3}
                    onChange={handleInputChange}
                    min={1}
                    className="w-full px-4 py-1.5 bg-card border border-border rounded-lg text-foreground"
                  />
                </div>
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

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground">Ringkasan Pendek (Excerpt) *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Tulis ringkasan singkat artikel..."
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-foreground"
                  required
                />
              </div>

              {/* Content body Markdown */}
              <div className="space-y-1.5">
                <label className="font-bold text-foreground flex items-center justify-between">
                  <span>Konten Artikel (Markdown Didukung) *</span>
                  <span className="text-[10px] text-primary">💡 Gunakan # untuk header, - untuk list</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={10}
                  placeholder="# Judul Utama&#10;&#10;Teks artikel Anda..."
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground font-mono"
                  required
                />
              </div>

              {/* Save actions */}
              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm cursor-pointer"
              >
                Simpan Artikel
              </button>

            </form>

          </div>
        </div>
      )}

      {/* Articles table grid */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-10 text-muted">Memuat artikel...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10 text-muted">Belum ada artikel. Klik "Tulis Artikel" untuk memulai.</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-primary-soft/30 dark:bg-primary-soft/5 text-foreground border-b border-border font-bold">
                  <th className="p-4">Cover</th>
                  <th className="p-4">Judul Artikel</th>
                  <th className="p-4 hidden md:table-cell">Kategori</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {posts.map(post => {
                  const cat = categories.find(c => c.id === post.category_id);
                  return (
                    <tr key={post.id} className="hover:bg-primary-soft/10 dark:hover:bg-primary-soft/5 transition-colors">
                      <td className="p-4 shrink-0">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-primary-soft/20 border border-border">
                          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="p-4 font-bold text-foreground">
                        <div className="flex flex-col gap-0.5 max-w-sm">
                          <span>{post.title}</span>
                          <span className="text-[10px] text-muted font-normal">/{post.slug}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="px-2 py-0.5 bg-primary-soft/40 dark:bg-primary-soft/10 text-primary-dark dark:text-primary rounded text-[10px] font-bold">
                          {cat?.name || "Riset"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          post.status === "published"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleOpenEdit(post)}
                            className="p-1.5 rounded-lg border border-border hover:bg-primary-soft/30 text-primary cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
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
