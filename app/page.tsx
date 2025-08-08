import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ToursSection from "@/components/sections/tours-section"
import NewsSection from "@/components/sections/news-section"
import FAQSection from "@/components/sections/faq-section"

export default function Beranda() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ToursSection />
      <NewsSection />
      <FAQSection />
    </div>
  )
}
