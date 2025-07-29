import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Leaf, Camera } from "lucide-react"

export default function Beranda() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/village-landscape.jpg"
            alt="Pemandangan Desa Kenteng dengan sawah hijau dan pegunungan"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Selamat Datang di
            <span className="block text-green-400">Desa Kenteng</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Desa yang kaya akan potensi alam, budaya, dan kearifan lokal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/profil">Jelajahi Desa</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
            >
              <Link href="/paket-wisata">Paket Wisata</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section 1: Gambar kiri, teks kanan */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/images/village-landscape.jpg"
                alt="Kenteng Village Landscape"
                width={600}
                height={400}
                className="rounded-2xl object-cover w-full h-auto max-h-[400px]"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="uppercase text-green-700 text-sm font-bold tracking-[0.2em]">about</div>
                <div className="text-3xl md:text-4xl font-bold text-green-800 tracking-wide">About Kenteng Village</div>
              </div>
              <div className="text-gray-700 text-base leading-relaxed">
                Tucked away in the misty highlands of Central Java, Kenteng is more than just a village — it’s a heartbeat. A place where mornings begin with the smell of firewood and the sound of roosters echoing through the valley. Where children run barefoot through rice fields, and elders share stories under the shade of banana trees.<br/><br/>
                Here, time doesn’t rush — it gently flows.<br/>
                You’ll hear laughter bubbling from bamboo kitchens. See weathered hands crafting baskets from memory, not manuals. Taste dishes that carry generations of tradition in every bite. Feel the rhythm of a village that moves not by clock, but by connection.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 2: Teks kiri, gambar kanan */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/images/village-landscape.jpg"
                alt="Kenteng Village Activities"
                width={600}
                height={400}
                className="rounded-2xl object-cover w-full h-auto max-h-[400px]"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="uppercase text-green-700 text-sm font-bold tracking-[0.2em]">kearifan lokal</div>
                <div className="text-3xl md:text-4xl font-bold text-green-800 tracking-wide">Tradisi & Kehidupan</div>
              </div>
              <div className="text-gray-700 text-base leading-relaxed">
                Di Kenteng, tradisi dan kehidupan berjalan beriringan. Setiap sudut desa menyimpan cerita, mulai dari upacara adat hingga kegiatan sehari-hari yang sarat makna. Masyarakatnya hidup dalam harmoni dengan alam, menjaga warisan leluhur dan menyambut perubahan dengan tangan terbuka.<br/><br/>
                Kunjungi Kenteng dan rasakan sendiri kehangatan, keramahan, dan keunikan budaya yang tak lekang oleh waktu.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center border-green-200">
              <CardHeader>
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Lokasi Strategis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Terletak di dataran tinggi dengan pemandangan pegunungan yang indah</p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Masyarakat Ramah</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Penduduk yang hangat dan menjunjung tinggi nilai-nilai gotong royong</p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Pertanian Organik</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Mengembangkan pertanian berkelanjutan dan ramah lingkungan</p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <Camera className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Wisata Alam</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Destinasi wisata dengan keindahan alam yang memukau</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-green-800 mb-8">Tentang Desa Kenteng</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Desa Kenteng adalah sebuah desa yang terletak di dataran tinggi dengan keindahan alam yang luar biasa.
              Dikelilingi oleh pegunungan hijau dan hamparan sawah yang subur, desa ini menjadi rumah bagi masyarakat
              yang menjunjung tinggi nilai-nilai tradisional sambil terus berinovasi untuk kemajuan bersama.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Link href="/profil">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Kunjungi Desa Kenteng</h2>
          <p className="text-xl mb-8 text-green-100">
            Rasakan pengalaman tak terlupakan di desa yang penuh dengan keindahan dan kearifan lokal
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
          >
            <Link href="/paket-wisata">Lihat Paket Wisata</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
