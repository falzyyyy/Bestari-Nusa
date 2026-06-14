import React from "react";
import FloatingNavbar from "@/components/public/floating-navbar";
import Footer from "@/components/public/footer";
import LoadingScreen from "@/components/public/loading-screen";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <LoadingScreen />
      <FloatingNavbar />
      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
