"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import { ChevronDown } from "lucide-react"

const navigation = [
  { name: "BERANDA", href: "/" },
  { 
    name: "PROFIL DESA", 
    href: "/profil",
    dropdown: [
      { name: "Sejarah Desa", href: "/profil/sejarah" },
      { name: "Visi & Misi", href: "/profil/visi-misi" },
      { name: "Struktur Organisasi", href: "/profil/struktur" },
      { name: "Pemerintahan", href: "/profil/pemerintahan" },
    ]
  },
  // { 
  //   name: "POTENSI DESA", 
  //   href: "/potensi-desa",
  //   dropdown: [
  //     { name: "Pertanian", href: "/potensi-desa?kategori=pertanian" },
  //     { name: "Wisata", href: "/potensi-desa?kategori=wisata" },
  //     { name: "Sumber Daya Alam", href: "/potensi-desa?kategori=sumber_daya" },
  //     { name: "Industri", href: "/potensi-desa?kategori=industri" },
  //     { name: "Budaya", href: "/potensi-desa?kategori=budaya" },
  //     { name: "Ekonomi", href: "/potensi-desa?kategori=ekonomi" },
  //   ]
  // },
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
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo_kenteng.png"
            alt="Logo Desa Kenteng"
            width={170}
            height={170}
            className="transition-opacity duration-300 hover:opacity-80"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.dropdown ? (
                    <>
                      <NavigationMenuTrigger className="text-base font-medium font-poppins px-3 py-2 transition-colors duration-300 text-[#1A3300] hover:text-white !bg-transparent hover:!bg-transparent data-[state=open]:!bg-transparent data-[state=open]:text-[#1A3300] focus:!bg-transparent focus:text-[#1A3300] h-auto rounded-none border-none shadow-none">
                        <Link href={item.href} className="hover:text-white transition-colors duration-300">
                          {item.name}
                        </Link>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none text-[#1A3300] hover:text-green-600">
                                {subItem.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link 
                        href={item.href}
                        className="text-base font-medium font-poppins px-3 py-2 transition-colors duration-300 text-[#1A3300] hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  )}
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
            <div key={item.name} className="w-full">
              <Link
                href={item.href}
                className="w-full text-center py-3 text-lg font-medium text-[#1A3300] hover:text-white hover:bg-green-600 transition-all duration-200 mx-4 rounded-md flex items-center justify-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
                {item.dropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
              {/* Mobile Dropdown */}
              {item.dropdown && (
                <div className="bg-white/80 mx-4 rounded-md mt-1 overflow-hidden">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block py-2 px-4 text-sm text-[#1A3300] hover:bg-green-100 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}