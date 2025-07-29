import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, Camera, Mountain, Utensils } from "lucide-react"

export default function PaketWisata() {
  const paketWisata = [
    {
      id: 1,
      title: "Paket Wisata Alam 1 Hari",
      description: "Jelajahi keindahan alam Desa Kenteng dalam satu hari penuh petualangan",
      price: "Rp 150.000",
      duration: "8 jam",
      capacity: "2-15 orang",
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=400",
      highlights: [
        "Trekking ke puncak bukit",
        "Foto di sawah terasering",
        "Makan siang tradisional",
        "Kunjungi mata air",
      ],
      includes: ["Pemandu wisata", "Makan siang", "Transportasi lokal", "Dokumentasi"],
    },
    {
      id: 2,
      title: "Paket Wisata Budaya 2 Hari 1 Malam",
      description: "Mendalami budaya dan tradisi masyarakat Desa Kenteng",
      price: "Rp 350.000",
      duration: "2 hari 1 malam",
      capacity: "4-20 orang",
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Menginap di homestay", "Belajar membatik", "Memasak makanan tradisional", "Pertunjukan seni"],
      includes: ["Homestay", "3x makan", "Workshop budaya", "Pemandu", "Sertifikat"],
    },
    {
      id: 3,
      title: "Paket Wisata Petualangan 3 Hari 2 Malam",
      description: "Petualangan lengkap untuk para pencinta alam dan tantangan",
      price: "Rp 650.000",
      duration: "3 hari 2 malam",
      capacity: "6-12 orang",
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Camping di pegunungan", "River tubing", "Rock climbing", "Sunrise hunting"],
      includes: ["Peralatan camping", "Semua makan", "Instruktur", "Asuransi", "Sertifikat"],
    },
    {
      id: 4,
      title: "Paket Wisata Keluarga",
      description: "Paket wisata santai yang cocok untuk seluruh anggota keluarga",
      price: "Rp 200.000",
      duration: "6 jam",
      capacity: "4-25 orang",
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Berkebun organik", "Memberi makan ikan", "Bermain tradisional", "Piknik keluarga"],
      includes: ["Snack sehat", "Aktivitas anak", "Pemandu ramah", "Foto keluarga"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Paket Wisata Desa Kenteng</h1>
          <p className="text-xl text-green-100">Pilih petualangan yang sesuai dengan keinginan Anda</p>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Paket Wisata Tersedia</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kami menawarkan berbagai paket wisata yang dirancang khusus untuk memberikan pengalaman tak terlupakan di
              Desa Kenteng. Setiap paket dilengkapi dengan pemandu berpengalaman dan fasilitas terbaik.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {paketWisata.map((paket) => (
              <Card key={paket.id} className="border-green-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image src={paket.image || "/placeholder.svg"} alt={paket.title} fill className="object-cover" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      {paket.rating}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-green-800 mb-2">{paket.title}</CardTitle>
                      <CardDescription className="text-gray-600">{paket.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{paket.price}</div>
                      <div className="text-sm text-gray-500">per orang</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {paket.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {paket.capacity}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">Highlight:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {paket.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-green-800 mb-2">Termasuk:</h4>
                    <div className="flex flex-wrap gap-2">
                      {paket.includes.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-green-300 text-green-700">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">Pesan Sekarang</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Informasi Penting</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Camera className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">Dokumentasi</h4>
                <p className="text-gray-600 text-sm">
                  Setiap paket wisata sudah termasuk dokumentasi foto profesional untuk kenangan indah Anda.
                </p>
              </div>
              <div className="text-center">
                <Mountain className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">Pemandu Berpengalaman</h4>
                <p className="text-gray-600 text-sm">
                  Dipandu oleh warga lokal yang berpengalaman dan menguasai seluk-beluk desa.
                </p>
              </div>
              <div className="text-center">
                <Utensils className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">Makanan Lokal</h4>
                <p className="text-gray-600 text-sm">
                  Nikmati cita rasa autentik makanan tradisional yang dibuat dari bahan-bahan segar lokal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
