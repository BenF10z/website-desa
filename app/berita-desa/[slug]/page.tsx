"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Link as LinkIcon, Instagram, Twitter, Share2 } from "lucide-react";
import NewsCard from "@/components/ui/news-card";

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

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const [newsArticle, setNewsArticle] = useState<BeritaItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchBerita();
    }
  }, [params.slug]);

  const fetchBerita = async () => {
    try {
      const response = await fetch(`/api/berita/slug/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setNewsArticle(data);
        fetchRelatedNews(data.category, data.id);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching berita:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedNews = async (category: string, currentId: number) => {
    try {
      const response = await fetch(`/api/berita?category=${category}&limit=6`);
      if (response.ok) {
        const data = await response.json();
        // Filter out current article
        setRelatedNews(data.filter((item: BeritaItem) => item.id !== currentId));
      }
    } catch (error) {
      console.error("Error fetching related berita:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatFullDate = (dateString: string) => {
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

  const shareArticle = async (platform?: string) => {
    const url = window.location.href;
    const title = newsArticle?.title || '';
    const text = newsArticle?.excerpt || '';

    switch (platform) {
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          alert("Link artikel disalin ke clipboard!");
        } catch (error) {
          console.error('Failed to copy: ', error);
        }
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({ title, text, url });
          } catch (error) {
            console.error('Error sharing: ', error);
          }
        } else {
          shareArticle('copy');
        }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header with Navigation Skeleton */}
        <div className="w-full px-4 md:px-[120px] pt-24 pb-8">
          <div className="w-32 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Article Header Skeleton */}
        <div className="w-full px-4 md:px-[120px] pb-8">
          <div className="max-w-5xl mx-auto">
            {/* Category and Reading Time */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-6 bg-[#6e7869]/20 rounded-full animate-pulse"></div>
              <div className="w-20 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Title */}
            <div className="w-full h-12 md:h-16 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            <div className="w-3/4 h-12 bg-gray-200 rounded-lg animate-pulse mb-6"></div>

            {/* Subtitle */}
            <div className="w-full h-8 bg-gray-200 rounded-lg animate-pulse mb-6"></div>

            {/* Author and Date */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#6e7869]/30 rounded-full animate-pulse"></div>
                <div>
                  <div className="w-32 h-5 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="w-full px-4 md:px-[120px] pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"
                  style={{ backgroundSize: '1000px 100%', backgroundRepeat: 'no-repeat' }}></div>
            </div>
          </div>
        </div>

        {/* Article Content Skeleton */}
        <div className="w-full px-4 md:px-[120px] pt-[60px] pb-[50px] flex justify-center items-start">
          <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-20">
            
            {/* Share Section Skeleton */}
            <div className="w-full lg:w-auto flex lg:flex-col justify-center lg:justify-start items-start gap-3 order-2 lg:order-1">
              <div className="w-28 h-5 bg-gray-200 rounded-lg animate-pulse mb-2 lg:mb-4"></div>
              <div className="flex lg:flex-col gap-3 lg:gap-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 max-w-[648px] flex flex-col justify-start items-start gap-6 order-1 lg:order-2">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="w-full h-24 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer rounded-lg"
                    style={{ backgroundSize: '1000px 100%', backgroundRepeat: 'no-repeat' }}></div>
              ))}
              <div className="w-full flex justify-end">
                <div className="w-24 h-5 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="w-full lg:w-[361px] flex flex-col justify-center items-start gap-12 order-3">
              <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-full h-56 bg-gradient-to-br from-[#6e7869]/20 to-[#4a5a4a]/20 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Related News Skeleton */}
        <div className="w-full px-4 md:px-[120px] pb-[60px]">
          <div className="w-64 h-10 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-sm border border-gray-100">
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
      </div>
    );
  }

  if (notFound || !newsArticle) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#143051] mb-4 font-['Satoshi']">
            Berita Tidak Ditemukan
          </h1>
          <p className="text-[#3e5880] mb-6 font-['Satoshi']">
            Artikel yang Anda cari tidak dapat ditemukan.
          </p>
          <Link 
            href="/berita-desa"
            className="inline-flex items-center gap-2 text-[#6e7869] hover:text-[#143051] transition-colors duration-200 font-['Satoshi']"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation */}
      <div className="w-full px-4 md:px-[120px] pt-24 pb-8">
        <Link 
          href="/berita-desa" 
          className="inline-flex items-center gap-2 text-[#143051] hover:text-[#6e7869] transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium font-['Satoshi']">Kembali ke Berita</span>
        </Link>
      </div>

      {/* Article Header - CENTERED LAYOUT */}
      <div className="w-full px-4 md:px-[120px] pb-8">
        <div className="max-w-5xl mx-auto">
          {/* Category and Reading Time */}
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-[#6e7869] text-white text-xs font-medium font-['Satoshi'] uppercase tracking-wider rounded-full">
              {newsArticle.category}
            </span>
            <span className="text-[#3e5880] text-sm font-normal font-['Satoshi']">
              {calculateReadTime(newsArticle.content)} baca
            </span>
            {newsArticle.is_featured && (
              <span className="px-3 py-1 bg-[#143051] text-white text-xs font-medium font-['Satoshi'] uppercase tracking-wider rounded-full">
                Unggulan
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-[#143051] text-3xl md:text-5xl font-bold font-['Satoshi'] tracking-wide leading-tight mb-4">
            {newsArticle.title}
          </h1>

          {/* Subtitle/Excerpt */}
          {newsArticle.excerpt && (
            <p className="text-[#143051] text-lg md:text-xl font-normal font-['Satoshi'] leading-relaxed mb-6">
              {newsArticle.excerpt}
            </p>
          )}

          {/* Author and Date */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6e7869] rounded-full flex items-center justify-center">
                <span className="text-white font-medium font-['Satoshi']">
                  {newsArticle.author.split(' ').map(word => word[0]).join('').substring(0, 2)}
                </span>
              </div>
              <div>
                <div className="text-[#143051] text-sm font-medium font-['Satoshi']">
                  {newsArticle.author}
                </div>
                <div className="text-[#3e5880] text-sm font-normal font-['Satoshi']">
                  {formatFullDate(newsArticle.published_at)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image - CENTERED LAYOUT */}
      <div className="w-full px-4 md:px-[120px] pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={newsArticle.featured_image || "/placeholder.svg"}
              alt={newsArticle.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content Section */}
      <div className="w-full px-4 md:px-[120px] pt-[60px] pb-[50px] flex justify-center items-start">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-20">
          
          {/* Share Section */}
          <div className="w-full lg:w-auto flex lg:flex-col justify-center lg:justify-start items-start gap-3 order-2 lg:order-1">
            <div className="text-[#143051] text-sm font-medium font-['Satoshi'] mb-2 lg:mb-0">
              Share berita ini
            </div>
            <div className="flex lg:flex-col gap-3 lg:gap-2">
              <button 
                onClick={() => shareArticle('email')}
                className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Email</span>
              </button>
              <button 
                onClick={() => shareArticle('copy')}
                className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors"
              >
                <LinkIcon className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Copy Link</span>
              </button>
              <button className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors">
                <Instagram className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Instagram</span>
              </button>
              <button 
                onClick={() => shareArticle('twitter')}
                className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors"
              >
                <Twitter className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Twitter</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-[648px] flex flex-col justify-start items-start gap-6 order-1 lg:order-2">
            {newsArticle.content.split('\n\n').map((paragraph, index) => (
              <div key={index} className="w-full flex flex-col justify-start items-start">
                <div className="w-full flex justify-start items-start gap-2.5">
                  <p className="flex-1 text-[#143051] text-base font-normal font-['Inter'] leading-relaxed">
                    {paragraph.trim()}
                  </p>
                </div>
              </div>
            ))}

            {/* Additional Images */}
            {newsArticle.additional_images && newsArticle.additional_images.length > 0 && (
              <div className="w-full space-y-4">
                {newsArticle.additional_images.map((imageUrl, index) => (
                  <div key={index} className="w-full flex flex-col justify-end items-end gap-1">
                    <div className="relative w-full h-[346px] rounded-lg overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={`${newsArticle.title} - Gambar ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-[#3e5880] text-sm font-medium font-['Satoshi']">
                      Dokumentasi {newsArticle.title} ({index + 1})
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Date */}
            <div className="w-full h-[19px] flex justify-end items-start">
              <div className="text-[#3e5880] text-base font-medium font-['Satoshi']">
                {formatDate(newsArticle.published_at)}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[361px] flex flex-col justify-center items-start gap-12 order-3">
            {/* Author Bio - Dynamic based on author */}
            <div className="w-full flex flex-col justify-center items-center gap-2.5">
              <p className="w-full text-[#143051] text-sm font-normal font-['Inter'] leading-relaxed">
                {newsArticle.author === "Tim Redaksi Desa" 
                  ? "Tim Redaksi Desa adalah tim yang terdiri dari para jurnalis lokal dan aktivis komunitas yang berdedikasi untuk mengangkat cerita-cerita inspiratif dari Desa Kenteng. Dengan pengalaman bertahun-tahun di bidang jurnalisme komunitas, tim ini berkomitmen untuk menyajikan informasi yang akurat dan bermanfaat bagi masyarakat."
                  : `${newsArticle.author} adalah kontributor aktif yang memiliki keahlian khusus di bidang ${newsArticle.category.toLowerCase()} dan pemberdayaan masyarakat desa.`
                }
              </p>
            </div>
            
            {/* Advertisement Placeholder */}
            <div className="w-full h-56 bg-gradient-to-br from-[#6e7869] to-[#4a5a4a] rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <Share2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">Ruang Iklan</p>
                <p className="text-xs opacity-75">Desa Kenteng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <div className="w-full px-4 md:px-[120px] pb-[60px] flex flex-col justify-center items-start gap-8">
          <h2 className="text-[#143051] text-3xl md:text-4xl font-bold font-['Satoshi'] tracking-wide">
            Jelajahi Berita Lainnya
          </h2>
          
          <div className="w-full flex flex-col justify-center items-center gap-12">
            {/* First Row */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.slice(0, 3).map((news, index) => (
                <NewsCard
                  key={news.id}
                  title={news.title}
                  description={news.excerpt || news.content.substring(0, 150) + "..."}
                  author={news.author}
                  date={formatDate(news.published_at)}
                  imageUrl={news.featured_image || "/placeholder.svg"}
                  readTime={calculateReadTime(news.content)}
                  isEssay={news.is_featured}
                  slug={news.slug}
                />
              ))}
            </div>

            {/* Second Row */}
            {relatedNews.length > 3 && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedNews.slice(3, 6).map((news, index) => (
                  <NewsCard
                    key={news.id}
                    title={news.title}
                    description={news.excerpt || news.content.substring(0, 150) + "..."}
                    author={news.author}
                    date={formatDate(news.published_at)}
                    imageUrl={news.featured_image || "/placeholder.svg"}
                    readTime={calculateReadTime(news.content)}
                    isEssay={news.is_featured}
                    slug={news.slug}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}