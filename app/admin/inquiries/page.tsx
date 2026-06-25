"use client";

import React, { useEffect, useState } from "react";
import { Mail, Trash2, Check, Clock, User, Phone, MapPin, Sparkles, Filter } from "lucide-react";
import { db } from "@/lib/supabase";
import { Inquiry } from "@/lib/store";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/confirm-dialog";

export default function InquiriesCrud() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  
  // Internal notes draft state
  const [notesDraft, setNotesDraft] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {}
  });

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const allInquiries = await db.getInquiries();
      setInquiries(allInquiries);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleSelectInquiry = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setNotesDraft(inq.internal_notes || "");
    
    // Automatically mark as "read" if it was "new"
    if (inq.status === "new") {
      handleStatusChange(inq.id, "read");
    }
  };

  const handleStatusChange = async (id: string, status: Inquiry["status"]) => {
    try {
      const success = await db.updateInquiryStatus(id, status);
      if (success) {
        // Update local state list
        setInquiries(prev => 
          prev.map(i => i.id === id ? { ...i, status } : i)
        );
        // Update selected state if active
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setNotesSaving(true);
    try {
      const success = await db.updateInquiryStatus(
        selectedInquiry.id, 
        selectedInquiry.status, 
        notesDraft
      );
      if (success) {
        setInquiries(prev => 
          prev.map(i => i.id === selectedInquiry.id ? { ...i, internal_notes: notesDraft } : i)
        );
        setSelectedInquiry(prev => prev ? { ...prev, internal_notes: notesDraft } : null);
        toast.success("Catatan internal berhasil disimpan!");
      }
    } catch (e) {
      toast.error("Gagal menyimpan catatan internal.");
      console.error(e);
    } finally {
      setNotesSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Hapus Pesan Masuk",
      message: "Apakah Anda yakin ingin menghapus pesan masuk ini dari database? Tindakan ini tidak dapat dibatalkan.",
      onConfirm: () => handleDeleteConfirmed(id)
    });
  };

  const handleDeleteConfirmed = async (id: string) => {
    try {
      const success = await db.deleteInquiry(id);
      if (success) {
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null);
        }
        loadInquiries();
        toast.success("Pesan berhasil dihapus.");
      } else {
        toast.error("Gagal menghapus pesan.");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan saat menghapus pesan.");
      console.error(e);
    }
  };

  // Filter list of messages
  const filteredInquiries = inquiries.filter(inq => {
    if (activeFilter === "all") return true;
    if (activeFilter === "new") return inq.status === "new";
    return inq.inquiry_type === activeFilter;
  });

  const getInquiryTypeLabel = (type: Inquiry["inquiry_type"]) => {
    switch (type) {
      case "general": return "Pertanyaan Umum";
      case "collaboration": return "Kolaborasi Kemitraan";
      case "csr": return "Kerja Sama CSR";
      case "media": return "Liputan Media";
      case "volunteer": return "Daftar Relawan";
      case "research": return "Riset & Social Mapping";
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-black text-foreground">Kotak Masuk Pesan</h1>
        <p className="text-xs text-muted">Pantau data pengajuan kolaborasi, pendaftaran relawan, and CSR dari website.</p>
      </div>

      {/* Filter and Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Messages List (Col-span 5 or 6) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Filters Bar */}
          <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.8 font-bold text-foreground">
              <Filter className="w-4 h-4 text-primary" /> Filter Tampilan:
            </div>
            
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground focus:outline-none"
            >
              <option value="all">Semua Pesan</option>
              <option value="new">Pesan Baru</option>
              <option value="general">Pertanyaan Umum</option>
              <option value="collaboration">Kemitraan</option>
              <option value="csr">Kerja Sama CSR</option>
              <option value="volunteer">Pendaftaran Relawan</option>
              <option value="research">Riset & Mapping</option>
            </select>
          </div>

          {/* Messages list container */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm divide-y divide-border/60 max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="text-center py-10 text-muted text-xs">Memuat pesan...</div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-10 text-muted text-xs">Tidak ada pesan masuk.</div>
            ) : (
              filteredInquiries.map(inq => (
                <button
                  key={inq.id}
                  onClick={() => handleSelectInquiry(inq)}
                  className={`w-full p-4 text-left transition-colors flex flex-col gap-1.5 focus:outline-none cursor-pointer ${
                    selectedInquiry?.id === inq.id
                      ? "bg-primary-soft/35 dark:bg-primary-soft/10"
                      : inq.status === "new"
                      ? "bg-primary-soft/15 dark:bg-primary-soft/5"
                      : "hover:bg-primary-soft/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-foreground truncate max-w-[150px]">{inq.name}</span>
                    <span className="text-[9px] text-muted shrink-0 font-mono">
                      {new Date(inq.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  
                  <p className="text-[10px] text-primary font-semibold truncate">
                    {getInquiryTypeLabel(inq.inquiry_type)}
                  </p>

                  <p className="text-xs text-muted leading-relaxed line-clamp-1">
                    {inq.message}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                      inq.status === "new"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                        : inq.status === "replied"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

        </div>

        {/* Right Column: Message Detail & Notes Panel (Col-span 7) */}
        <div className="lg:col-span-7">
          {selectedInquiry ? (
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6 text-xs md:text-sm">
              
              {/* Header stats & Deletes */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-foreground">{selectedInquiry.name}</h3>
                  <p className="text-[10px] text-muted">Institusi: {selectedInquiry.institution || "-"}</p>
                </div>
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="p-2 border border-border hover:bg-red-950/20 text-red-400 rounded-lg cursor-pointer"
                  title="Hapus Pesan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Contacts Row parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-background border border-border p-4 rounded-xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted text-xs">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>Email: <strong className="text-foreground">{selectedInquiry.email}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted text-xs">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>Telepon: <strong className="text-foreground">{selectedInquiry.phone || "-"}</strong></span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted text-xs">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Dikirim: <strong className="text-foreground">{new Date(selectedInquiry.created_at).toLocaleString('id-ID')}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted text-xs">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Tipe: <strong className="text-foreground">{getInquiryTypeLabel(selectedInquiry.inquiry_type)}</strong></span>
                  </div>
                </div>
              </div>

              {/* Message Content Body */}
              <div className="space-y-2">
                <h4 className="font-bold text-foreground">Isi Pesan:</h4>
                <div className="p-4 bg-background border border-border rounded-xl text-xs md:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Inquiry Processing Status changer */}
              <div className="space-y-2">
                <h4 className="font-bold text-foreground">Status Tindak Lanjut:</h4>
                <div className="flex flex-wrap items-center gap-2">
                  {["read", "in_progress", "replied", "closed", "spam"].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedInquiry.id, status as any)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        selectedInquiry.status === status
                          ? "bg-primary text-white shadow-sm border border-primary"
                          : "border border-border bg-card text-muted hover:text-foreground"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes editor */}
              <div className="space-y-3 pt-4 border-t border-border/60">
                <h4 className="font-bold text-foreground flex items-center justify-between">
                  <span>Catatan Internal Admin (Hanya Dilihat Pengurus)</span>
                </h4>
                
                <textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  rows={3}
                  placeholder="Tuliskan catatan, misal: Sudah dihubungi via WA hari Selasa, diskusi dijadwalkan..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground"
                />

                <button
                  onClick={handleSaveNotes}
                  disabled={notesSaving}
                  className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:bg-primary/50"
                >
                  {notesSaving ? "Menyimpan Catatan..." : "Simpan Catatan Internal"}
                </button>
              </div>

            </div>
          ) : (
            <div className="p-12 rounded-2xl border border-dashed border-border bg-card text-center text-muted text-xs md:text-sm">
              <Mail className="w-10 h-10 text-muted mx-auto mb-2.5 animate-pulse" />
              <span>Silakan pilih salah satu pesan di daftar sebelah kiri untuk memproses detail isi pesan dan catatan internal.</span>
            </div>
          )}
        </div>

      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
      />

    </div>
  );
}
