"use client";

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Hide navbar and footer on admin and login pages
  const hideNavAndFooter = pathname === "/admin" || pathname === "/login" || pathname.startsWith("/admin/");

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {!hideNavAndFooter && <Navbar />}
          <main className={hideNavAndFooter ? "" : "min-h-screen"}>
            {children}
          </main>
          {!hideNavAndFooter && <Footer />}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}