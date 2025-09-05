import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion"

export default function FAQSection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
          {/* Kiri: Teks FAQ */}
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            <div className="uppercase text-sm font-bold tracking-[0.2em] text-[#6e7869]">faq</div>
            <div className="text-3xl md:text-4xl font-bold tracking-wide text-[#1a1a1a]">Pertanyaan yang Sering Diajukan</div>
          </div>
          {/* Kanan: FAQ Accordion */}
          <div className="w-full md:w-2/3">
            <div className="pb-6 flex flex-col gap-2.5">
              {/* Accordion FAQ */}
              <Accordion type="single" collapsible className="w-full divide-y divide-[#6e7869]/20">
                <AccordionItem value="q1">
                  <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                    Di mana lokasi Desa Kenteng?
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight pb-6">
                    Kenteng terletak di dataran tinggi Bandungan, Jawa Tengah — sekitar 1 jam dari Kota Semarang. Mudah dijangkau dengan mobil atau sepeda motor, dan kami dapat membantu mengatur transportasi jika diperlukan.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                    Jenis wisata apa yang Anda tawarkan?
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight pb-6">
                    Kami menawarkan berbagai jenis wisata: jalan-jalan di alam, pengalaman budaya, perjalanan kuliner, dan lokakarya langsung dengan pengrajin lokal. Anda dapat bergabung dengan kelompok atau meminta rencana perjalanan khusus.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                    Apakah saya perlu memesan di muka?
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight pb-6">
                    Pemesanan di muka sangat dianjurkan, terutama untuk akhir pekan dan hari libur, untuk memastikan ketersediaan dan pengalaman terbaik. Namun, walk-in juga diterima jika ada tempat yang tersedia.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4">
                  <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                    Bisakah saya mengunjungi Kenteng tanpa bergabung dalam tur?
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight pb-6">
                    Ya, Anda dipersilakan untuk menjelajahi Kenteng secara mandiri. Tim kami dengan senang hati akan memberikan tips dan rekomendasi untuk kunjungan Anda.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}