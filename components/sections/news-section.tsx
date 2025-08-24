"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import CTAButton from "@/components/ui/cta-button"

interface BeritaItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  featured_image: string;
  author: string;
  category: string;
  is_featured: boolean;
  published_at: string;
}

export default function NewsSection() {
  const [featuredNews, setFeaturedNews] = useState<BeritaItem | null>(null)
  const [sideNews, setSideNews] = useState<BeritaItem[]>([])
  const [gridNews, setGridNews] = useState<BeritaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNewsData()
  }, [])

  const fetchNewsData = async () => {
    try {
      setLoading(true)
      
      // Fetch featured news (1 artikel unggulan untuk featured section)
      const featuredResponse = await fetch("/api/berita?featured=true&limit=1")
      const featuredData = await featuredResponse.json()
      
      // Fetch recent news (untuk side articles dan grid)
      const recentResponse = await fetch("/api/berita?limit=9")
      const recentData = await recentResponse.json()
      
      // Set featured news
      setFeaturedNews(featuredData[0] || null)
      
      // Set side news (3 artikel terbaru setelah featured)
      const nonFeaturedNews = recentData.filter((item: BeritaItem) => 
        !item.is_featured || item.id !== featuredData[0]?.id
      )
      setSideNews(nonFeaturedNews.slice(0, 3))
      
      // Set grid news (6 artikel untuk bottom grid)
      setGridNews(nonFeaturedNews.slice(3, 9))
      
    } catch (error) {
      console.error("Error fetching news data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(' ').length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} menit baca`
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

  if (loading) {
    return (
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 lg:px-[120px]">
          <div className="flex flex-col items-center gap-12">
            {/* Header */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Loading skeleton dengan layout yang sama */}
            <div className="w-full flex flex-col gap-[52px]">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-[664px] h-[438px] bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="flex-1 flex flex-col gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-[168px] h-[168px] bg-gray-200 rounded-xl animate-pulse"></div>
                      <div className="flex-1 space-y-3">
                        <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-6 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4 lg:px-[120px]">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <div className="uppercase text-sm font-bold tracking-[4.2px] text-[#6e7869]">BERITA</div>
            <div className="text-3xl md:text-4xl font-bold tracking-wide text-[#1a1a1a]">Berita Desa</div>
          </div>

          {/* Content */}
          <div className="w-full flex flex-col gap-[52px]">
            {/* Top Section - Featured + Side Articles */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Featured Article */}
              <div className="lg:w-[664px] flex flex-col gap-4">
                {featuredNews ? (
                  <Link href={`/berita-desa/${featuredNews.slug}`}>
                    <div className="flex flex-col gap-4 group cursor-pointer">
                      <div className="relative w-full h-[250px] md:h-[438px]">
                        <Image
                          src={featuredNews.featured_image || "/placeholder.svg?height=438&width=664"}
                          alt={featuredNews.title}
                          fill
                          className="object-cover rounded-2xl transition-all duration-300 group-hover:brightness-110"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#3e5880] text-sm font-normal tracking-tight">{featuredNews.author}</span>
                        <span className="text-[#3e5880] text-sm font-normal tracking-tight">{formatDate(featuredNews.published_at)}</span>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-[#143051] text-2xl font-bold tracking-wide group-hover:text-[#6e7869] transition-colors">
                          {featuredNews.title}
                        </h3>
                        <p className="text-[#143051] text-base font-normal">
                          {featuredNews.excerpt || truncateText(featuredNews.content, 150)}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-[#3e5880] text-sm font-normal">{featuredNews.category}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  // Fallback jika tidak ada featured news
                  <div className="flex flex-col gap-4">
                    <div className="relative w-full h-[250px] md:h-[438px] bg-gray-200 rounded-2xl flex items-center justify-center">
                      <p className="text-gray-500">Tidak ada berita unggulan</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Side Articles */}
              <div className="flex-1 flex flex-col justify-between gap-6">
                {sideNews.length > 0 ? sideNews.map((news, index) => (
                  <Link key={news.id} href={`/berita-desa/${news.slug}`}>
                    <div className="flex gap-5 group cursor-pointer">
                      <Image
                        src={news.featured_image || "/placeholder.svg?height=168&width=168"}
                        alt={news.title}
                        width={168}
                        height={168}
                        className="w-[120px] h-[120px] md:w-[168px] md:h-[168px] object-cover rounded-xl flex-shrink-0 transition-all duration-300 group-hover:brightness-110"
                      />
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="flex justify-between items-start text-xs md:text-sm">
                          <span className="text-[#3e5880] font-normal">{news.author}</span>
                          <span className="text-[#3e5880] font-normal tracking-tight">{formatDate(news.published_at)}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                          <h4 className="text-[#143051] text-lg md:text-xl font-bold tracking-tight line-clamp-2 group-hover:text-[#6e7869] transition-colors">
                            {news.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[#3e5880] text-sm font-normal">{news.category}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )) : (
                  // Fallback untuk side articles
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="flex gap-5">
                      <div className="w-[120px] h-[120px] md:w-[168px] md:h-[168px] bg-gray-200 rounded-xl flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500">Tidak ada berita</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Section - Grid Articles */}
            <div className="flex flex-col gap-7">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridNews.slice(0, 3).map((news) => (
                  <Link key={news.id} href={`/berita-desa/${news.slug}`}>
                    <div className="flex flex-col gap-3 group cursor-pointer">
                      <div className="flex flex-col gap-4">
                        <div className="relative w-full h-[210px]">
                          <Image
                            src={news.featured_image || "/placeholder.svg?height=210&width=364"}
                            alt={news.title}
                            fill
                            className="object-cover rounded-2xl transition-all duration-300 group-hover:brightness-110"
                          />
                          {news.category.toLowerCase() === 'essay' && (
                            <div className="absolute top-4 left-4 w-10 h-10 bg-[#143051] rounded-sm"></div>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#3e5880] text-sm font-normal tracking-tight">{news.author}</span>
                          <span className="text-[#3e5880] text-sm font-normal tracking-tight">{formatDate(news.published_at)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h4 className="text-[#143051] text-xl font-bold tracking-tight group-hover:text-[#6e7869] transition-colors">
                          {news.title}
                        </h4>
                        <p className="text-[#143051] text-base font-normal">
                          {news.excerpt || truncateText(news.content, 100)}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-[#3e5880] text-sm font-normal">{news.category}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Row 2 */}
              {gridNews.length > 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridNews.slice(3, 6).map((news) => (
                    <Link key={news.id} href={`/berita-desa/${news.slug}`}>
                      <div className="flex flex-col gap-4 group cursor-pointer">
                        <div className="relative w-full h-[210px]">
                          <Image
                            src={news.featured_image || "/placeholder.svg?height=210&width=364"}
                            alt={news.title}
                            fill
                            className="object-cover rounded-2xl transition-all duration-300 group-hover:brightness-110"
                          />
                          {news.category.toLowerCase() === 'essay' && (
                            <div className="absolute top-4 left-4 w-10 h-10 bg-[#143051] rounded-sm"></div>
                          )}
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[#3e5880] text-sm font-normal tracking-tight">
                              {news.category.toLowerCase() === 'essay' ? 'Essay' : news.author}
                            </span>
                            <span className="text-[#3e5880] text-sm font-normal tracking-tight">
                              {formatDate(news.published_at)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <h4 className="text-[#143051] text-xl font-bold tracking-tight group-hover:text-[#6e7869] transition-colors">
                            {news.title}
                          </h4>
                          <div className="flex items-center gap-4">
                            <span className="text-[#3e5880] text-sm font-normal">
                              {news.category.toLowerCase() === 'essay' ? calculateReadTime(news.content) : news.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <CTAButton href="/berita-desa">
                Baca Berita Lainnya
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}