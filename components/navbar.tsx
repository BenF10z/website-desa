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
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault()
    setOpenDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    )
  }

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
                      <NavigationMenuContent className="left-1/2 transform -translate-x-1/2">
                        <div className="w-auto p-2 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg shadow-lg">
                          <div className="flex flex-row gap-2 items-center">
                            {item.dropdown.map((subItem, index) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="group flex items-center px-4 py-3 text-sm font-medium text-[#143051] hover:text-[#6e7869] hover:bg-gray-50/80 rounded-md transition-all duration-200 ease-in-out whitespace-nowrap"
                              >
                                <div className="flex items-center">
                                  <div className="w-1.5 h-1.5 bg-[#6e7869] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                                    {subItem.name}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100 z-50">
          <div className="px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <div key={item.name} className="space-y-1">
                {item.dropdown ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-[#143051] hover:text-[#6e7869] hover:bg-gray-50 rounded-lg transition-all duration-200"
                      onClick={(e) => toggleDropdown(item.name, e)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openDropdowns.includes(item.name) ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {/* Mobile Dropdown - Conditionally rendered */}
                    <div 
                      className={`ml-4 space-y-1 border-l-2 border-gray-100 pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
                        openDropdowns.includes(item.name) 
                          ? 'max-h-96 opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-[#143051] hover:text-[#6e7869] hover:bg-gray-50 rounded-md transition-all duration-200"
                          onClick={() => setMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-[#143051] hover:text-[#6e7869] hover:bg-gray-50 rounded-lg transition-all duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}