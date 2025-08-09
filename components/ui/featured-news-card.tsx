"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NewsItem {
  title: string
  description: string
  imageUrl: string
  slug: string
}

interface FeaturedNewsCardProps {
  newsItems: NewsItem[]
  autoPlayInterval?: number
}

export default function FeaturedNewsCard({
  newsItems,
  autoPlayInterval = 5000
}: FeaturedNewsCardProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || newsItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
      )
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, newsItems.length, autoPlayInterval])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === 0 ? newsItems.length - 1 : currentIndex - 1)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === newsItems.length - 1 ? 0 : currentIndex + 1)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleClick = () => {
    router.push(`/berita-desa/${newsItems[currentIndex].slug}`)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (newsItems.length === 0) return null

  const currentNews = newsItems[currentIndex]

  return (
    <div className="w-full h-[400px] md:h-[659px] relative group overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#555555]/70 z-10" />
      
      {/* News images with transition */}
      <div className="absolute inset-0">
        {newsItems.map((news, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentIndex ? 'translate-x-0' : 
              index < currentIndex ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {newsItems.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Previous news"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Next news"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Content */}
      <div 
        className="absolute inset-0 z-20 flex items-center justify-center px-4 py-8 cursor-pointer"
        onClick={handleClick}
      >
        <div className="max-w-4xl text-center space-y-4">
          <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold font-['Satoshi'] tracking-wide leading-tight transition-all duration-300 group-hover:scale-105">
            {currentNews.title}
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal font-['Satoshi'] max-w-3xl mx-auto leading-relaxed">
            {currentNews.description}
          </p>
        </div>
      </div>

      {/* Carousel indicators */}
      {newsItems.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {newsItems.length > 1 && isAutoPlaying && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
          <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full"
              style={{
                animation: `slideProgress ${autoPlayInterval}ms linear infinite`
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideProgress {
          from { 
            width: 0%; 
          }
          to { 
            width: 100%; 
          }
        }
      `}</style>
    </div>
  )
}