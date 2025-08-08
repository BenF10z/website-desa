import ToursCarousel from "@/components/ToursCarousel"
import CTAButton from "@/components/ui/cta-button"

export default function ToursSection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
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
              <CTAButton href="/paket-wisata">
                Ketahui Lebih Banyak
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}