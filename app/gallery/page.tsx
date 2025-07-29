"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("semua")

  const categories = [
    { id: "semua", name: "Semua" },
    { id: "alam", name: "Alam" },
    { id: "budaya", name: "Budaya" },
    { id: "pertanian", name: "Pertanian" },
    { id: "wisata", name: "Wisata" },
    { id: "masyarakat", name: "Masyarakat" },
  ]

  const galleryImages = [
    {
      id: 1,
      src: "/images/village-landscape.jpg",
      alt: "Pemandangan sawah terasering Desa Kenteng",
      category: "alam",
      title: "Sawah Terasering",
      description: "Hamparan sawah hijau yang membentang luas dengan latar belakang pegunungan",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Rumah tradisional dengan atap merah",
      category: "budaya",
      title: "Rumah Tradisional",
      description: "Arsitektur rumah tradisional yang masih terjaga dengan baik",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Petani bekerja di sawah",
      category: "pertanian",
      title: "Aktivitas Pertanian",
      description: "Petani lokal sedang bekerja di sawah dengan metode tradisional",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Jalur pendakian gunung",
      category: "wisata",
      title: "Jalur Hiking",
      description: "Jalur pendakian yang menantang dengan pemandangan spektakuler",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Festival budaya desa",
      category: "budaya",
      title: "Festival Budaya",
      description: "Pertunjukan tari tradisional dalam festival tahunan desa",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Mata air alami",
      category: "alam",
      title: "Mata Air Jernih",
      description: "Sumber mata air alami yang jernih dan segar",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Kebun sayuran organik",
      category: "pertanian",
      title: "Kebun Organik",
      description: "Kebun sayuran organik yang dikelola masyarakat desa",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Pertemuan masyarakat desa",
      category: "masyarakat",
      title: "Gotong Royong",
      description: "Kegiatan gotong royong masyarakat dalam membangun desa",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Sunrise dari puncak gunung",
      category: "alam",
      title: "Sunrise Hunting",
      description: "Pemandangan matahari terbit dari puncak bukit tertinggi",
    },
    {
      id: 10,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Persiapan makanan tradisional",
      category: "budaya",
      title: "Kuliner Tradisional",
      description: "Proses pembuatan makanan khas desa dengan resep turun temurun",
    },
    {
      id: 11,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Wisatawan menikmati tur desa",
      category: "wisata",
      title: "Tur Desa",
      description: "Wisatawan sedang menikmati paket wisata desa",
    },
    {
      id: 12,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Anak-anak bermain permainan tradisional",
      category: "masyarakat",
      title: "Permainan Tradisional",
      description: "Anak-anak desa bermain permainan tradisional di halaman",
    },
  ]

  const filteredImages =
    selectedCategory === "semua" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery Desa Kenteng</h1>
          <p className="text-xl text-green-100">Koleksi foto keindahan dan kehidupan di Desa Kenteng</p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={
                  selectedCategory === category.id
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-green-300 text-green-700 hover:bg-green-50"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card
                key={image.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-green-200"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative h-64">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600 text-white text-xs">
                      {categories.find((cat) => cat.id === image.category)?.name}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-green-800 mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            <div className="relative">
              <Image
                src={filteredImages[selectedImage].src || "/placeholder.svg"}
                alt={filteredImages[selectedImage].alt}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                <h3 className="text-lg font-semibold mb-1">{filteredImages[selectedImage].title}</h3>
                <p className="text-sm text-gray-300">{filteredImages[selectedImage].description}</p>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1)}
              >
                Sebelumnya
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                onClick={() => setSelectedImage(selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0)}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
