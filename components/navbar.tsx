"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

const navigation = [
  { name: "BERANDA", href: "/" },
  { name: "PROFIL", href: "/profil" },
  { name: "POTENSI DESA", href: "/potensi-desa" },
  { name: "BUMDES", href: "/bumdes" },
  { name: "PAKET WISATA", href: "/paket-wisata" },
  { name: "BERITA DESA", href: "/berita-desa" },
  { name: "GALERI", href: "/gallery" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/10 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-poppins tracking-wide transition-colors duration-300 text-[#1A3300]">
            Desa Kenteng
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link 
                      href={item.href}
                      className="text-base font-medium font-poppins px-3 py-2 transition-colors duration-300 text-[#1A3300] hover:text-white"
                    >
                      {item.name}
                    </Link>
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
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-300 text-[#1A3300]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-md shadow-xl flex flex-col items-center py-4 animate-fade-in z-50">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="w-full text-center py-3 text-lg font-medium text-[#1A3300] hover:text-white hover:bg-green-600 transition-all duration-200 mx-4 rounded-md"
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