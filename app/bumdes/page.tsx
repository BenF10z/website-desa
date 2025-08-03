import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, Truck, Home, Utensils, ShoppingBag, Phone } from "lucide-react"

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BUMDes Kenteng Makmur</h1>
          <p className="text-xl text-green-100">Badan Usaha Milik Desa untuk Kesejahteraan Bersama</p>
        </div>
      </section>

      {/* About BUMDes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">Tentang BUMDes Kenteng Makmur</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                BUMDes Kenteng Makmur didirikan pada tahun 2018 sebagai wadah untuk mengembangkan potensi ekonomi desa
                dan meningkatkan kesejahteraan masyarakat. Dengan modal awal dari dana desa dan partisipasi masyarakat,
                BUMDes ini telah berkembang menjadi motor penggerak ekonomi desa.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Saat ini, BUMDes Kenteng Makmur mengelola berbagai unit usaha yang meliputi perdagangan, jasa, dan
                industri pengolahan hasil pertanian. Semua keuntungan yang diperoleh dikembalikan untuk pembangunan desa
                dan kesejahteraan masyarakat.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-600">Unit Usaha</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Karyawan</div>
                </div>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="BUMDes Kenteng Makmur"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-green-800 text-center mb-12">Unit Usaha BUMDes</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {layanan.map((item, index) => (
                <Card key={index} className="border-green-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <item.icon className="w-6 h-6 text-green-600" />
                      <CardTitle className="text-lg text-green-800">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Hubungi BUMDes Kenteng Makmur</h3>
              <p className="text-gray-600">Untuk informasi lebih lanjut tentang produk dan layanan kami</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-green-800 mb-4">Informasi Kontak</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-600">+62 xxx-xxxx-xxxx</span>
                  </div>
                  <div className="flex items-center">
                    <Store className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-600">Jl. Raya Desa Kenteng No. 123</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-green-800 mb-4">Jam Operasional</h4>
                <div className="space-y-2 text-gray-600">
                  <div>Senin - Jumat: 08.00 - 17.00</div>
                  <div>Sabtu: 08.00 - 15.00</div>
                  <div>Minggu: Tutup</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button className="bg-green-600 hover:bg-green-700">Hubungi Kami Sekarang</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
