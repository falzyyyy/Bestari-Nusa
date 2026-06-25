import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers";
import BackgroundPatterns from "@/components/public/background-patterns";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Bestari Nusa — Berdaya Lestari Nusantara",
    template: "%s | Bestari Nusa"
  },
  description: "Bestari Nusa adalah komunitas pengembangan SDM muda yang berfokus pada riset sosial, pemberdayaan masyarakat, advokasi sosial, dan keberlanjutan untuk menciptakan peluang berdampak bagi Nusantara.",
  keywords: ["Bestari Nusa", "Berdaya Lestari Nusantara", "Komunitas Sosial", "Riset Sosial", "Community Development", "Pengembangan Pemuda", "Sustainability", "CSR", "Pemberdayaan Masyarakat"],
  authors: [{ name: "Bestari Nusa" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bestarinusa.org",
    siteName: "Bestari Nusa",
    title: "Bestari Nusa — Berdaya Lestari Nusantara",
    description: "Komunitas kolaborasi pemuda untuk perubahan sosial berkelanjutan berbasis riset, aksi, dan keberlanjutan.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bestari Nusa — Berdaya Lestari Nusantara"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bestari Nusa — Berdaya Lestari Nusantara",
    description: "Komunitas kolaborasi pemuda untuk perubahan sosial berkelanjutan berbasis riset, aksi, dan keberlanjutan."
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col relative">
        <Providers>
          <BackgroundPatterns />
          <Toaster richColors closeButton position="top-right" theme="dark" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
