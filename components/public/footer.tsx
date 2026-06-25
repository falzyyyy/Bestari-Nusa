import Link from "next/link";
import { Mail, MessageCircle, MapPin, Heart } from "lucide-react";
import { Instagram } from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-[#091213] dark:bg-[#050B0C] text-[#E7ECEC]/90 border-t border-[#00AFB4]/15 py-12 md:py-16 mt-auto font-sans relative overflow-hidden">
      
      {/* Decorative subtle background glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 relative z-10">
        
        {/* Brand & Mission column */}
        <div className="space-y-4 md:col-span-1.5">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[#091213] font-bold text-sm shadow-sm group-hover:rotate-12 transition-transform duration-300">
              B
            </div>
            <span className="font-bold tracking-tight text-white text-lg">
              Bestari<span className="text-[#00AFB4]">Nusa</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-[#8FA4A6] max-w-sm">
            Berdaya Lestari Nusantara. Wadah generasi muda untuk mengubah riset sosial menjadi aksi nyata, dan aksi menjadi dampak berkelanjutan bagi nusantara.
          </p>
          <div className="flex items-center gap-3.5 pt-2">
            <a 
              href="mailto:halo@bestarinusa.org" 
              className="p-2.5 rounded-full bg-white/5 hover:bg-primary/20 text-[#00AFB4] hover:text-white transition-all duration-300 border border-white/5"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-white/5 hover:bg-primary/20 text-[#00AFB4] hover:text-white transition-all duration-300 border border-white/5"
              aria-label="Visit Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/628123456789" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-white/5 hover:bg-primary/20 text-[#00AFB4] hover:text-white transition-all duration-300 border border-white/5"
              aria-label="Contact WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-white border-l-2 border-[#00AFB4] pl-2.5">
            Navigasi Cepat
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-[#8FA4A6] hover:text-white transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[#8FA4A6] hover:text-white transition-colors">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/programs" className="text-[#8FA4A6] hover:text-white transition-colors">
                Program Kerja
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-[#8FA4A6] hover:text-white transition-colors">
                Kajian & Cerita
              </Link>
            </li>
            <li>
              <Link href="/team" className="text-[#8FA4A6] hover:text-white transition-colors">
                Pengurus
              </Link>
            </li>
          </ul>
        </div>

        {/* Focus Areas Column */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-white border-l-2 border-[#00AFB4] pl-2.5">
            Fokus Gerakan
          </h4>
          <ul className="space-y-2.5 text-sm text-[#8FA4A6]">
            <li>Pengembangan Pemuda</li>
            <li>Riset Aksi Partisipatif</li>
            <li>Community Development</li>
            <li>Keberlanjutan Ekologi</li>
            <li>Kolaborasi CSR</li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-white border-l-2 border-[#00AFB4] pl-2.5">
            Sekretariat
          </h4>
          <div className="space-y-3.5 text-sm">
            <div className="flex items-start gap-2.5 text-[#8FA4A6]">
              <MapPin className="w-5 h-5 text-[#00AFB4] shrink-0 mt-0.5" />
              <span>Jl. Merdeka No. 45, Bukit Kecil, Palembang, Sumatera Selatan 30113</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#8FA4A6]">
              <Mail className="w-4 h-4 text-[#00AFB4]" />
              <span>info@bestarinusa.org</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-[#8FA4A6] gap-4">
        <span>
          © {new Date().getFullYear()} Bestari Nusa. Hak Cipta Dilindungi.
        </span>
        <span className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-[#00AFB4] fill-current" /> for Berdaya Lestari Nusantara.
        </span>
      </div>
    </footer>
  );
}
