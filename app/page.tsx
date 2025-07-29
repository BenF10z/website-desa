import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Leaf, Camera } from "lucide-react"
import ToursCarousel from "@/components/ToursCarousel"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion"

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

        {/* <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
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
        </div> */}
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
                <div className="uppercase text-sm font-bold tracking-[0.2em]" style={{ color: '#6E7869' }}>about</div>
                <div className="text-3xl md:text-4xl font-bold tracking-wide" style={{ color: '#1A1A1A' }}>About Kenteng Village</div>
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
                <div className="uppercase text-sm font-bold tracking-[0.2em]" style={{ color: '#6E7869' }}>kearifan lokal</div>
                <div className="text-3xl md:text-4xl font-bold tracking-wide" style={{ color: '#1A1A1A' }}>Tradisi & Kehidupan</div>
              </div>
              <div className="text-gray-700 text-base leading-relaxed">
                Di Kenteng, tradisi dan kehidupan berjalan beriringan. Setiap sudut desa menyimpan cerita, mulai dari upacara adat hingga kegiatan sehari-hari yang sarat makna. Masyarakatnya hidup dalam harmoni dengan alam, menjaga warisan leluhur dan menyambut perubahan dengan tangan terbuka.<br/><br/>
                Kunjungi Kenteng dan rasakan sendiri kehangatan, keramahan, dan keunikan budaya yang tak lekang oleh waktu.
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Tours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            {/* Judul */}
            <div className="flex flex-col items-center gap-2">
              <div className="uppercase text-sm font-bold tracking-[0.2em]" style={{ color: '#6E7869' }}>Tours</div>
              <div className="text-3xl md:text-4xl font-bold tracking-wide" style={{ color: '#1A1A1A' }}>Popular Experiences</div>
            </div>
            {/* Card Wisata Slider */}
            <div className="w-full flex flex-col gap-8">
              <div className="w-full">
                {/* Slider modern minimalis */}
                <ToursCarousel />
              </div>
              {/* Tombol CTA */}
              <div className="flex justify-center items-center gap-8">
                <Link href="/paket-wisata">
                  <div className="px-10 py-5 bg-[#1a1a1a] rounded-lg flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#333] transition">
                    <span className="text-white text-lg font-bold tracking-wide">Start Your Journey</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section
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
      </section> */}

      {/* About Section - Figma inspired, responsive, with background overlay */}
      <section className="relative py-12 flex items-center justify-center min-h-[340px] md:min-h-[420px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/village-landscape.jpg"
            alt="Pemandangan Desa Kenteng dengan pegunungan"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay: green opacity */}
          <div className="absolute inset-0 bg-green-900/60" />
        </div>
        {/* Content */}
        <div className="relative z-10 w-full flex justify-center items-center px-4">
          <div className="w-full max-w-[685px] flex flex-col justify-start items-center gap-8">
            <div className="w-full flex flex-col justify-start items-center gap-6">
              <div className="w-full text-white text-3xl md:text-4xl font-bold font-sans capitalize text-center">Ready to plan your journey to Kenteng?</div>
              <div className="w-full md:w-[595px] text-center text-white text-base md:text-lg font-medium font-sans capitalize leading-relaxed">
                In Kenteng, time doesn’t tick, it breathes.<br />
                Here, the moments aren’t curated for Instagram, they’re lived, raw and real.<br />
                No filters. No crowds. Just you, the village, and everything in between.
              </div>
            </div>
            <Link href="/paket-wisata" className="w-fit">
              <div className="px-8 md:px-10 py-4 md:py-5 bg-white rounded-lg inline-flex justify-center items-center gap-2.5 cursor-pointer hover:bg-gray-100 transition">
                <span className="text-[#1a1a1a] text-base md:text-lg font-bold font-sans tracking-wide">Start Your Journey</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
            {/* Kiri: Teks FAQ */}
            <div className="w-full md:w-1/3 flex flex-col gap-2">
              <div className="uppercase text-sm font-bold tracking-[0.2em] text-[#6e7869]">faq</div>
              <div className="text-3xl md:text-4xl font-bold tracking-wide text-[#1a1a1a]">Frequently Asked Questions</div>
            </div>
            {/* Kanan: FAQ Accordion */}
            <div className="w-full md:w-2/3">
              <div className="pb-6 flex flex-col gap-2.5">
                {/* Accordion FAQ */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="q1">
                    <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                      Where is Kenteng Village located?
                    </AccordionTrigger>
                    <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight border-b border-[#6e7869] pb-6">
                      Kenteng is nestled in the highlands of Bandungan, Central Java — about 1 hour from Semarang City. It’s easy to reach by car or motorbike, and we can help arrange transportation if needed.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q2">
                    <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                      What kind of tours do you offer?
                    </AccordionTrigger>
                    <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight border-b border-[#6e7869] pb-6">
                      We offer a variety of tours: nature walks, cultural experiences, culinary journeys, and hands-on workshops with local artisans. You can join a group or request a custom itinerary.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q3">
                    <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                      Do I need to book in advance?
                    </AccordionTrigger>
                    <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight border-b border-[#6e7869] pb-6">
                      Advance booking is recommended, especially for weekends and holidays, to ensure availability and the best experience. However, walk-ins are welcome if space allows.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q4">
                    <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                      Can I visit Kenteng without joining a tour?
                    </AccordionTrigger>
                    <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight border-b border-[#6e7869] pb-6">
                      Yes, you are welcome to explore Kenteng independently. Our team is happy to provide tips and recommendations for your visit.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q5">
                    <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                      Do you speak English?
                    </AccordionTrigger>
                    <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight border-b border-[#6e7869] pb-6">
                      Yes, our guides and staff speak English and Bahasa Indonesia. We strive to make every guest feel welcome and understood.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section
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
      </section> */}
    </div>
  )
}
