import Image from "next/image"
import CTAButton from "@/components/ui/cta-button"

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center">
      <Image
        src="/images/village-landscape.jpg"
        alt="Pemandangan Desa Kenteng dengan sawah hijau dan pegunungan"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Hero Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-12 max-w-4xl">
            <div className="flex flex-col justify-start items-start gap-4 sm:gap-6 md:gap-8">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-wide leading-tight">
                Jelajahi Desa Kenteng
              </h1>
              <p className="text-white text-sm sm:text-base md:text-lg font-normal font-sans tracking-tight max-w-lg sm:max-w-xl md:max-w-2xl leading-relaxed">
                Plan your next adventure with us. Scroll down to discover local tours, events, and real connections.
              </p>
            </div>
            <CTAButton href="/paket-wisata" variant="white" size="large">
              Jelajahi Lebih Lanjut
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}