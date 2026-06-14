import { supabase, isSupabaseConfigured } from "./supabase";

/**
 * Uploads an image file to Supabase Storage or converts it to Base64 (Mock fallback)
 * @param file The image file selected by the user
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File): Promise<string> {
  // Validate file size (max 5MB for optimization)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Ukuran file terlalu besar. Maksimal 5MB.");
  }

  // Check if live Supabase client is configured
  if (isSupabaseConfigured && supabase) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to public bucket named 'media'
    const { error } = await supabase.storage
      .from("media")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      throw new Error(`Gagal mengunggah ke Supabase Storage: ${error.message}`);
    }

    // Retrieve and return the public URL
    const { data } = supabase.storage.from("media").getPublicUrl(filePath);
    return data.publicUrl;
  } else {
    // Mock Mode Fallback: Convert to Base64 Data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Gagal mengonversi file ke format Base64."));
        }
      };
      reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
      reader.readAsDataURL(file);
    });
  }
}
