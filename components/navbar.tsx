"use client"


import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navigation = [
  { name: "BERANDA", href: "/" },
  { name: "PROFIL", href: "/profil" },
  { name: "POTENSI DESA", href: "/potensi-desa" },
  { name: "BUMDES", href: "/bumdes" },
  { name: "PAKET WISATA", href: "/paket-wisata" },
  { name: "GALERI", href: "/gallery" },
]

import { useState } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Replace with your logo image if needed */}
          <span className="text-2xl font-bold text-green-600 font-poppins tracking-wide">Desa Kenteng</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild className="text-black text-base font-medium font-poppins px-2 py-1 hover:text-white transition-colors">
                    <Link href={item.href}>{item.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Open menu"
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-700">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 shadow-lg backdrop-blur flex flex-col items-center py-4 animate-fade-in z-50">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="w-full text-center py-2 text-lg font-medium text-green-700 hover:bg-green-50 transition"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
