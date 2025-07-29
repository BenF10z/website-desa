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

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent">
      <div className="max-w-screen-2xl mx-auto px-8 py-6 flex justify-between items-center overflow-hidden">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Replace with your logo image if needed */}
          <span className="text-2xl font-bold text-green-600 font-poppins tracking-wide">Desa Kenteng</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-8">
            {navigation.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild className="text-black text-xl font-normal font-poppins px-2 py-1 hover:text-green-600 transition-colors">
                  <Link href={item.href}>{item.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
