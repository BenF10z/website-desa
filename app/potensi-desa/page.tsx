"use client";

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PotensiDesa() {
  interface PotensiItem {
  id: number;
  title: string;
  image_url: string;
  description: string;
}
  const [potensi, setPotensi] = useState<PotensiItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPotensi() {
      const res = await fetch("/api/potensi-desa")
      const data = await res.json()
      setPotensi(data)
      setLoading(false)
    }
    fetchPotensi()
  }, [])

  if (loading) {
    return <div className="text-center py-16">Memuat data...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Potensi Desa Kenteng</h1>
          <p className="text-xl text-green-100">Kekayaan alam dan sumber daya yang melimpah</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {potensi.map((item, index) => (
              <Card key={item.id} className="border-green-200 overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image_url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {/* You may want to map category to icon */}
                    <CardTitle className="text-xl text-green-800">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  )
}
