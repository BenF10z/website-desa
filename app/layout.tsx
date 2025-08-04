import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Desa Kenteng - Desa Wisata di Dataran Tinggi",
  description: "Website resmi Desa Kenteng - desa yang kaya akan potensi alam, budaya, dan kearifan lokal",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Hapus padding-top global pada <main>
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
