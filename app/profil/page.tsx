import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, Calendar, Award } from "lucide-react"

export default function Profil() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Profil Desa Kenteng</h1>
          <p className="text-xl text-green-100">Mengenal lebih dekat sejarah, visi, dan misi desa kami</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">Sejarah Desa Kenteng</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Desa Kenteng didirikan pada tahun 1945 oleh para pendatang yang mencari tanah subur untuk bercocok
                tanam. Nama "Kenteng" berasal dari bahasa Jawa yang berarti "tempat yang tenang dan damai".
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Seiring berjalannya waktu, desa ini berkembang menjadi pusat pertanian organik dan wisata alam yang
                menarik banyak pengunjung dari berbagai daerah.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dengan luas wilayah 15 km² dan ketinggian 800 meter di atas permukaan laut, Desa Kenteng memiliki iklim
                yang sejuk dan tanah yang subur, cocok untuk berbagai jenis tanaman.
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Sejarah Desa Kenteng"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center border-green-200">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold text-green-800">2,500</CardTitle>
                <CardDescription>Jumlah Penduduk</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold text-green-800">15 km²</CardTitle>
                <CardDescription>Luas Wilayah</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <Calendar className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold text-green-800">1945</CardTitle>
                <CardDescription>Tahun Berdiri</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <Award className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold text-green-800">800m</CardTitle>
                <CardDescription>Ketinggian (mdpl)</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Vision & Mission */}
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800">Visi Desa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  "Menjadi desa wisata yang berkelanjutan, mandiri, dan sejahtera dengan tetap melestarikan nilai-nilai
                  budaya lokal dan kelestarian lingkungan."
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800">Misi Desa</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2">
                  <li>• Mengembangkan potensi wisata alam dan budaya</li>
                  <li>• Meningkatkan kesejahteraan masyarakat</li>
                  <li>• Melestarikan lingkungan hidup</li>
                  <li>• Memberdayakan ekonomi kreatif lokal</li>
                  <li>• Mempertahankan nilai-nilai gotong royong</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
