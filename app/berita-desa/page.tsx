"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NewsCard from "@/components/ui/news-card";
import FeaturedNewsCard from "@/components/ui/featured-news-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export default function BeritaDesa() {
  const [featuredBerita, setFeaturedBerita] = useState<BeritaItem[]>([]);
  const [allBerita, setAllBerita] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;
  
  useEffect(() => {
    async function fetchBerita() {
      try {
        setLoading(true);
        
        // Fetch featured berita for carousel
        const featuredRes = await fetch("/api/berita?featured=true");
        let featuredData = await featuredRes.json();
        
        // Fetch all berita for cards
        const allBeritaRes = await fetch("/api/berita");
        let allBeritaData = await allBeritaRes.json();
        
        setFeaturedBerita(featuredData);
        setAllBerita(allBeritaData);
        setTotalPages(Math.ceil(allBeritaData.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching berita:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBerita();
  }, []);
  
  // Format date for display (e.g., "15/12/2024" format)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };
  
  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allBerita.slice(startIndex, endIndex);
  };
  
  // Convert API data to format needed by FeaturedNewsCard
  const getFeaturedNewsItems = () => {
    return featuredBerita.map(item => ({
      title: item.title,
      description: item.excerpt,
      imageUrl: item.featured_image || "/placeholder.svg?height=659&width=1440",
      slug: item.slug
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Section Skeleton */}
        <div className="relative w-full h-[276px] z-10 bg-[#7e8e7e]">
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-1/3 h-12 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Featured Article Skeleton */}
        <div className="w-full h-[400px] md:h-[659px] bg-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer" 
               style={{ backgroundSize: '1000px 100%', backgroundRepeat: 'no-repeat' }}></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="w-3/4 h-8 mb-4 bg-white/30 rounded-lg animate-pulse"></div>
            <div className="w-1/2 h-6 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* News Grid Section Skeleton */}
        <section className="relative z-0 w-full px-4 md:px-[120px] py-[60px] bg-white">
          <div className="flex flex-col justify-start items-center gap-12">
            {/* Title Skeletons */}
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="w-32 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-64 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* News Cards Skeleton */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-sm border border-gray-100">
                  <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"
                       style={{ backgroundSize: '1000px 100%', backgroundRepeat: 'no-repeat' }}></div>
                  <div className="p-4 space-y-3">
                    <div className="w-3/4 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="w-20 h-3 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="w-24 h-3 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Isolated dengan proper z-index */}
      <section className="relative w-full h-[276px] z-10">
        <div className="absolute inset-0 bg-[#7e8e7e]" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi'] text-center">
            Berita Desa
          </h1>
        </div>
      </section>

      {/* Featured Article Carousel Section - Isolated */}
      <section className="relative z-0">
        {featuredBerita.length > 0 ? (
          <FeaturedNewsCard
            newsItems={getFeaturedNewsItems()}
            autoPlayInterval={6000}
          />
        ) : (
          <div className="w-full h-[400px] md:h-[659px] flex items-center justify-center bg-gray-100">
            <p className="text-gray-500 text-xl">Tidak ada berita unggulan</p>
          </div>
        )}
      </section>

      {/* News Grid Section - Clear separation */}
      <section className="relative z-0 w-full px-4 md:px-[120px] py-[60px] bg-white">
        <div className="flex flex-col justify-start items-center gap-12">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
              Berita
            </div>
            <div className="text-[#1a1a1a] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
              Berita Terbaru Desa Kenteng
            </div>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-8">
            {allBerita.length > 0 ? (
              <>
                {/* Grid Layout - Responsive */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getCurrentPageItems().map((berita) => (
                    <NewsCard
                      key={berita.id}
                      title={berita.title}
                      description={berita.excerpt}
                      author={berita.author}
                      date={formatDate(berita.published_at)}
                      imageUrl={berita.featured_image || "/placeholder.svg?height=210&width=364"}
                      readTime={`${Math.ceil(berita.content.length / 1000)} menit`}
                      isEssay={berita.category.toLowerCase() === "essay"}
                      slug={berita.slug}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="w-full flex justify-center items-center mt-8 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Sebelumnya</span>
                    </Button>
                    
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1"
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full py-16 text-center">
                <p className="text-gray-500 text-xl">Belum ada berita yang dipublikasikan</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}