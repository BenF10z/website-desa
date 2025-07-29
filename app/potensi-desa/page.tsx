import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Mountain, Droplets, Wheat, Fish, TreePine } from "lucide-react"

export default function PotensiDesa() {
  const potensi = [
    {
      icon: Wheat,
      title: "Pertanian Organik",
      description:
        "Lahan pertanian seluas 800 hektar dengan sistem organik yang menghasilkan padi, jagung, dan sayuran berkualitas tinggi.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Mountain,
      title: "Wisata Alam",
      description:
        "Pemandangan pegunungan yang indah, udara sejuk, dan jalur hiking yang menantang untuk para petualang.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Droplets,
      title: "Sumber Air Bersih",
      description:
        "Mata air alami yang jernih dan melimpah, menjadi sumber kehidupan bagi seluruh desa dan sekitarnya.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: TreePine,
      title: "Hutan Konservasi",
      description: "Hutan lindung seluas 300 hektar yang menjadi habitat berbagai flora dan fauna endemik.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Fish,
      title: "Budidaya Ikan",
      description: "Kolam ikan air tawar yang menghasilkan ikan nila, lele, dan ikan mas dengan kualitas terbaik.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Leaf,
      title: "Tanaman Herbal",
      description: "Berbagai tanaman obat tradisional seperti jahe, kunyit, dan temulawak yang tumbuh subur.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Kekayaan Sumber Daya Alam</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Desa Kenteng dikaruniai berbagai potensi alam yang luar biasa. Dari pertanian organik hingga wisata alam,
              semuanya tersedia untuk mendukung kesejahteraan masyarakat dan pengembangan ekonomi desa.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {potensi.map((item, index) => (
              <Card key={index} className="border-green-200 overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <item.icon className="w-8 h-8 text-green-600" />
                    <CardTitle className="text-xl text-green-800">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Keunggulan Kompetitif</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-green-800 mb-2">Ramah Lingkungan</h4>
                <p className="text-gray-600">
                  Semua kegiatan ekonomi dilakukan dengan prinsip berkelanjutan dan ramah lingkungan.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-green-800 mb-2">Lokasi Strategis</h4>
                <p className="text-gray-600">
                  Terletak di jalur wisata pegunungan dengan akses transportasi yang mudah.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-green-800 mb-2">Sumber Daya Melimpah</h4>
                <p className="text-gray-600">
                  Air bersih, tanah subur, dan iklim yang mendukung berbagai aktivitas ekonomi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
