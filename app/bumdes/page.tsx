import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, Truck, Home, Utensils, ShoppingBag, Phone } from "lucide-react"
import BumdesProfileSection from "@/components/sections/bumdes-profile-section"
import UmkmSection from "@/components/sections/umkm-section"

export default function Bumdes() {

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
      <UmkmSection maxItems={0} showViewAll={false} />
    </div>
  )
}