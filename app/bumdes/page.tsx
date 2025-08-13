import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, Truck, Home, Utensils, ShoppingBag, Phone } from "lucide-react"
import BumdesProfileSection from "@/components/sections/bumdes-profile-section"
import UmkmSection from "@/components/sections/umkm-section"

export default function Bumdes() {
  const layanan = [
    {
      icon: Store,
      title: "Toko Serba Ada",
      description: "Menyediakan kebutuhan sehari-hari masyarakat dengan harga terjangkau dan kualitas terbaik.",
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      icon: Truck,
      title: "Jasa Transportasi",
      description: "Layanan transportasi untuk wisatawan dan kebutuhan masyarakat desa.",
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      icon: Home,
      title: "Homestay",
      description: "Penginapan nyaman dengan suasana pedesaan yang asri dan pelayanan ramah.",
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      icon: Utensils,
      title: "Warung Makan",
      description: "Menyajikan makanan khas daerah dengan bahan-bahan segar dari hasil pertanian lokal.",
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      icon: ShoppingBag,
      title: "Produk Olahan",
      description: "Mengolah hasil pertanian menjadi produk bernilai tambah seperti keripik, dodol, dan sirup.",
      image: "/placeholder.svg?height=250&width=350",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full h-[276px] z-10">
        <div className="absolute inset-0 bg-[#7e8e7e]" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi'] text-center">
            BUMDes
          </h1>
        </div>
      </section>

      {/* Profile Section */}
      <BumdesProfileSection />

      {/* UMKM Section */}
      <UmkmSection />
    </div>
  )
}
