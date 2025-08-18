"use client";

import { useEffect, useState, use } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Link as LinkIcon, Instagram, Twitter, Share2, Phone, MapPin, Calendar, Building2, User } from "lucide-react";
import UmkmCard from "@/components/ui/umkm-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BumdesItem {
  id: number;
  name: string;
  description: string;
  category: string;
  contact_person: string;
  contact_number: string;
  location: string;
  image_url: string;
  is_active: boolean;
  established_year: number;
  created_at: string;
}

interface UmkmDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UmkmDetailPage({ params }: UmkmDetailPageProps) {
  const resolvedParams = use(params);
  const [umkmDetail, setUmkmDetail] = useState<BumdesItem | null>(null);
  const [relatedUmkm, setRelatedUmkm] = useState<BumdesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (resolvedParams.id) {
      fetchUmkmDetail();
    }
  }, [resolvedParams.id]);

  const fetchUmkmDetail = async () => {
    try {
      const response = await fetch(`/api/bumdes/${resolvedParams.id}`);
      if (response.ok) {
        const data = await response.json();
        setUmkmDetail(data);
        fetchRelatedUmkm(data.category, data.id);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching UMKM detail:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedUmkm = async (category: string, currentId: number) => {
    try {
      const response = await fetch(`/api/bumdes?category=${category}&limit=6`);
      if (response.ok) {
        const data = await response.json();
        setRelatedUmkm(data.filter((item: BumdesItem) => item.id !== currentId && item.is_active));
      }
    } catch (error) {
      console.error("Error fetching related UMKM:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleContactClick = (contactNumber: string) => {
    if (contactNumber) {
      const cleanNumber = contactNumber.replace(/\D/g, "");
      const whatsappNumber = cleanNumber.startsWith("62")
        ? cleanNumber
        : `62${cleanNumber.startsWith("0") ? cleanNumber.slice(1) : cleanNumber}`;
      window.open(`https://wa.me/${whatsappNumber}`, "_blank");
    }
  };

  const shareUmkm = async (platform?: string) => {
    const url = window.location.href;
    const title = umkmDetail?.name || '';
    const text = umkmDetail?.description || '';

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
          alert("Link UMKM disalin ke clipboard!");
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
          shareUmkm('copy');
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

        {/* UMKM Header Skeleton */}
        <div className="w-full px-4 md:px-[120px] pb-8">
          <div className="max-w-5xl mx-auto">
            {/* Category and Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-6 bg-[#6e7869]/20 rounded-full animate-pulse"></div>
              <div className="w-20 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Title */}
            <div className="w-full h-12 md:h-16 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            <div className="w-3/4 h-12 bg-gray-200 rounded-lg animate-pulse mb-6"></div>

            {/* Description */}
            <div className="w-full h-8 bg-gray-200 rounded-lg animate-pulse mb-6"></div>

            {/* Contact Info */}
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

        {/* Content Skeleton */}
        <div className="w-full px-4 md:px-[120px] pt-[60px] pb-[50px] flex justify-center items-start">
          <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-20">
            <div className="w-full lg:w-auto flex lg:flex-col justify-center lg:justify-start items-start gap-3 order-2 lg:order-1">
              <div className="w-28 h-5 bg-gray-200 rounded-lg animate-pulse mb-2 lg:mb-4"></div>
              <div className="flex lg:flex-col gap-3 lg:gap-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="flex-1 max-w-[648px] flex flex-col justify-start items-start gap-6 order-1 lg:order-2">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="w-full h-24 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer rounded-lg"
                    style={{ backgroundSize: '1000px 100%', backgroundRepeat: 'no-repeat' }}></div>
              ))}
            </div>
            <div className="w-full lg:w-[361px] flex flex-col justify-center items-start gap-12 order-3">
              <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-full h-56 bg-gradient-to-br from-[#6e7869]/20 to-[#4a5a4a]/20 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !umkmDetail) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#143051] mb-4 font-['Satoshi']">
            UMKM Tidak Ditemukan
          </h1>
          <p className="text-[#3e5880] mb-6 font-['Satoshi']">
            Unit UMKM yang Anda cari tidak dapat ditemukan.
          </p>
          <Link 
            href="/bumdes"
            className="inline-flex items-center gap-2 text-[#6e7869] hover:text-[#143051] transition-colors duration-200 font-['Satoshi']"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke BUMDes
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
          href="/bumdes" 
          className="inline-flex items-center gap-2 text-[#143051] hover:text-[#6e7869] transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium font-['Satoshi']">Kembali ke BUMDes</span>
        </Link>
      </div>

      {/* UMKM Header - CENTERED LAYOUT */}
      <div className="w-full px-4 md:px-[120px] pb-8">
        <div className="max-w-5xl mx-auto">
          {/* Category and Info */}
          <div className="flex items-center gap-4 mb-4">
            <Badge className="bg-[#6e7869] hover:bg-[#6e7869] text-white text-xs font-medium font-['Satoshi'] uppercase tracking-wider">
              {umkmDetail.category}
            </Badge>
            <div className="flex items-center gap-1 text-[#3e5880] text-sm font-normal font-['Satoshi']">
              <Calendar className="w-4 h-4" />
              Didirikan {umkmDetail.established_year}
            </div>
            {umkmDetail.is_active && (
              <Badge className="bg-green-100 text-green-800 text-xs font-medium font-['Satoshi'] uppercase tracking-wider">
                Aktif
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-[#143051] text-3xl md:text-5xl font-bold font-['Satoshi'] tracking-wide leading-tight mb-4">
            {umkmDetail.name}
          </h1>

          {/* Contact Info */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#6e7869] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[#143051] text-sm font-medium font-['Satoshi']">
                    {umkmDetail.contact_person || "Contact Person"}
                  </div>
                  <div className="text-[#3e5880] text-sm font-normal font-['Satoshi']">
                    {formatDate(umkmDetail.created_at)}
                  </div>
                </div>
              </div>
              
              {umkmDetail.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#3e5880]" />
                  <span className="text-[#3e5880] text-sm font-normal font-['Satoshi']">
                    {umkmDetail.location}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image - CENTERED LAYOUT */}
      <div className="w-full px-4 md:px-[120px] pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={umkmDetail.image_url || "/placeholder.svg"}
              alt={umkmDetail.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-4 md:px-[120px] pt-[60px] pb-[50px] flex justify-center items-start">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-20">
          
          {/* Share Section */}
          <div className="w-full lg:w-auto flex lg:flex-col justify-center lg:justify-start items-start gap-3 order-2 lg:order-1">
            <div className="text-[#143051] text-sm font-medium font-['Satoshi'] mb-2 lg:mb-0">
              Share UMKM ini
            </div>
            <div className="flex lg:flex-col gap-3 lg:gap-2">
              <button 
                onClick={() => shareUmkm('email')}
                className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Email</span>
              </button>
              <button 
                onClick={() => shareUmkm('copy')}
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
                onClick={() => shareUmkm('twitter')}
                className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors"
              >
                <Twitter className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Twitter</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-[648px] flex flex-col justify-start items-start gap-6 order-1 lg:order-2">
            <div className="w-full flex flex-col justify-start items-start">
              <div className="w-full flex justify-start items-start gap-2.5">
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-[#143051] text-xl font-semibold font-['Satoshi'] mb-3">Tentang {umkmDetail.name}</h3>
                    <p className="text-[#143051] text-base font-normal font-['Inter'] leading-relaxed">
                      {umkmDetail.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-[#143051] text-xl font-semibold font-['Satoshi'] mb-3">Informasi Kontak</h3>
                    <div className="space-y-3">
                      {umkmDetail.contact_person && (
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-[#6e7869]" />
                          <span className="text-[#143051] font-['Inter']">
                            {umkmDetail.contact_person}
                          </span>
                        </div>
                      )}
                      
                      {umkmDetail.contact_number && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-[#6e7869]" />
                          <span className="text-[#143051] font-['Inter']">
                            {umkmDetail.contact_number}
                          </span>
                        </div>
                      )}
                      
                      {umkmDetail.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-[#6e7869]" />
                          <span className="text-[#143051] font-['Inter']">
                            {umkmDetail.location}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-[#6e7869]" />
                        <span className="text-[#143051] font-['Inter']">
                          Kategori: {umkmDetail.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Button */}
                  {umkmDetail.contact_number && (
                    <div className="pt-4">
                      <Button
                        onClick={() => handleContactClick(umkmDetail.contact_number)}
                        className="w-full bg-[#6e7869] hover:bg-[#5a6456] text-white font-['Satoshi']"
                        size="lg"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Hubungi via WhatsApp
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[361px] flex flex-col justify-center items-start gap-12 order-3">
            
            {/* Advertisement Placeholder */}
            <div className="w-full h-56 bg-gradient-to-br from-[#6e7869] to-[#4a5a4a] rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <Building2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">Ruang Iklan</p>
                <p className="text-xs opacity-75">BUMDes Kenteng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related UMKM Section */}
      {relatedUmkm.length > 0 && (
        <div className="w-full px-4 md:px-[120px] pb-[60px] flex flex-col justify-center items-start gap-8">
          <h2 className="text-[#143051] text-3xl md:text-4xl font-bold font-['Satoshi'] tracking-wide">
            UMKM Terkait
          </h2>
          
          <div className="w-full flex flex-col justify-center items-center gap-12">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedUmkm.slice(0, 3).map((umkm) => (
                <Link key={umkm.id} href={`/bumdes/${umkm.id}`}>
                  <UmkmCard
                    title={umkm.name}
                    description={umkm.description}
                    imageUrl={umkm.image_url || "/placeholder.svg"}
                    category={umkm.category}
                    location={umkm.location}
                    contactNumber={umkm.contact_number}
                    establishedYear={umkm.established_year}
                  />
                </Link>
              ))}
            </div>

            {relatedUmkm.length > 3 && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedUmkm.slice(3, 6).map((umkm) => (
                  <Link key={umkm.id} href={`/bumdes/${umkm.id}`}>
                    <UmkmCard
                      title={umkm.name}
                      description={umkm.description}
                      imageUrl={umkm.image_url || "/placeholder.svg"}
                      category={umkm.category}
                      location={umkm.location}
                      contactNumber={umkm.contact_number}
                      establishedYear={umkm.established_year}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}