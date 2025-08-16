"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/ui/news-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface BeritaItem {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image: string;
  additional_images?: string[];
  author: string;
  category: string;
  is_featured: boolean;
  published_at: string;
  created_at: string;
}

export default function BeritaDesa() {
  const [berita, setBerita] = useState<BeritaItem[]>([]);
  const [featuredBerita, setFeaturedBerita] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchBerita();
    fetchFeaturedBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await fetch("/api/berita");
      if (response.ok) {
        const data = await response.json();
        setBerita(data);
      }
    } catch (error) {
      console.error("Error fetching berita:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedBerita = async () => {
    try {
      const response = await fetch("/api/berita?featured=true&limit=3");
      if (response.ok) {
        const data = await response.json();
        setFeaturedBerita(data);
      }
    } catch (error) {
      console.error("Error fetching featured berita:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} menit`;
  };

  const filteredBerita = berita.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(berita.map(item => item.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6e7869]"></div>
          <p className="mt-4 text-[#143051] font-['Satoshi']">Memuat berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full px-4 md:px-[120px] pt-24 pb-16">
        <div className="text-center">
          <h1 className="text-[#143051] text-4xl md:text-6xl font-bold font-['Satoshi'] tracking-wide mb-6">
            Berita Desa Kenteng
          </h1>
          <p className="text-[#3e5880] text-lg md:text-xl font-normal font-['Satoshi'] max-w-3xl mx-auto">
            Informasi terkini seputar kegiatan dan perkembangan desa
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="w-full px-4 md:px-[120px] pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#3e5880]" />
              <Input
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#6e7869] focus:border-[#143051]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#3e5880]" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-[#6e7869]">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredBerita.length > 0 && (
        <div className="w-full px-4 md:px-[120px] pb-16">
          <h2 className="text-[#143051] text-3xl md:text-4xl font-bold font-['Satoshi'] tracking-wide mb-8 text-center">
            Berita Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBerita.map((item) => (
              <div key={item.id} className="relative group">
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-[#6e7869] text-white text-xs font-medium font-['Satoshi'] uppercase tracking-wider rounded-full">
                    Unggulan
                  </span>
                </div>
                <NewsCard
                  title={item.title}
                  description={item.excerpt || item.content.substring(0, 150) + "..."}
                  author={item.author}
                  date={formatDate(item.published_at)}
                  imageUrl={item.featured_image || "/placeholder.svg"}
                  readTime={calculateReadTime(item.content)}
                  isEssay={true}
                  slug={item.slug}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Articles */}
      <div className="w-full px-4 md:px-[120px] pb-16">
        <h2 className="text-[#143051] text-3xl md:text-4xl font-bold font-['Satoshi'] tracking-wide mb-8 text-center">
          Semua Berita ({filteredBerita.length})
        </h2>
        
        {filteredBerita.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#3e5880] text-lg font-['Satoshi']">
              {searchTerm || selectedCategory !== "all" 
                ? "Tidak ada berita yang sesuai dengan pencarian Anda."
                : "Belum ada berita yang dipublikasikan."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBerita.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                description={item.excerpt || item.content.substring(0, 150) + "..."}
                author={item.author}
                date={formatDate(item.published_at)}
                imageUrl={item.featured_image || "/placeholder.svg"}
                readTime={calculateReadTime(item.content)}
                isEssay={false}
                slug={item.slug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}