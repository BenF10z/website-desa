"use client";

import { useEffect, useState } from "react";
import UmkmCard from "@/components/ui/umkm-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

interface BumdesItem {
  id: number;
  name: string;
  description: string;
  category: string;
  contact_person: string;
  contact_number: string;
  location: string;
  image_url: string;
  additional_images: string[];
  additional_image_paths: string[];
  is_active: boolean;
  established_year: number;
  created_at: string;
}

interface UmkmSectionProps {
  maxItems?: number;
  showViewAll?: boolean;
}

export default function UmkmSection({ maxItems = 6, showViewAll = true }: UmkmSectionProps) {
  const [umkmData, setUmkmData] = useState<BumdesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBumdesData();
  }, []);

  const fetchBumdesData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/bumdes");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Filter only active units and limit the number of items
      const activeUnits = data.filter((item: BumdesItem) => item.is_active);
      const limitedData = maxItems ? activeUnits.slice(0, maxItems) : activeUnits;
      
      setUmkmData(limitedData);
      setError(null);
    } catch (error) {
      console.error("Error fetching BUMDes data:", error);
      setError("Gagal memuat data UMKM");
      // Fallback to static data in case of error
      setUmkmData([]);
    } finally {
      setLoading(false);
    }
  };

  // Loading state with shimmer animation like berita-desa
  if (loading) {
    return (
      <section className="w-full px-4 bg-[#F5F5F5] md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
        <div className="w-full flex flex-col justify-start items-center gap-12">
          {/* Title Skeletons */}
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-16 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-80 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-96 h-5 bg-gray-200 rounded-lg animate-pulse mt-2"></div>
          </div>
          
          {/* UMKM Cards Skeleton with shimmer animation */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: maxItems }).map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-sm border border-gray-100 bg-white">
                <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"
                     style={{ backgroundSize: '1000px 100%', backgroundRepeat: 'no-repeat' }}></div>
                <div className="p-6 space-y-3">
                  <div className="w-3/4 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-2/3 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="w-20 h-3 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button Skeleton */}
          {showViewAll && (
            <div className="w-full flex justify-center mt-8">
              <div className="w-48 h-12 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer rounded-lg"
                   style={{ backgroundSize: '1000px 100%', backgroundRepeat: 'no-repeat' }}></div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Error state with fallback
  if (error && umkmData.length === 0) {
    return (
      <section className="w-full px-4 bg-[#F5F5F5] md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
        <div className="w-full flex flex-col justify-start items-center gap-12">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
              UMKM
            </div>
            <div className="text-[#041b06] text-2xl md:text-3xl lg:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
              UMKM Desa Kenteng
            </div>
          </div>
          
          <div className="text-center py-12">
            <Building2 className="mx-auto h-16 w-16 text-[#6e7869] mb-4" />
            <h3 className="text-xl font-semibold text-[#041b06] mb-2 font-['Satoshi']">
              Belum ada data UMKM
            </h3>
            <p className="text-[#6e7869] font-['Satoshi'] mb-6">
              Data UMKM akan segera ditambahkan
            </p>
            {showViewAll && (
              <Link href="/bumdes">
                <Button className="bg-[#6e7869] hover:bg-[#5a6456] text-white font-['Satoshi']">
                  Lihat Halaman BUMDes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (umkmData.length === 0) {
    return (
      <section className="w-full px-4 bg-[#F5F5F5] md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
        <div className="w-full flex flex-col justify-start items-center gap-12">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
              UMKM
            </div>
            <div className="text-[#041b06] text-2xl md:text-3xl lg:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
              UMKM Desa Kenteng
            </div>
          </div>
          
          <div className="text-center py-12">
            <Building2 className="mx-auto h-16 w-16 text-[#6e7869] mb-4" />
            <p className="text-[#6e7869] font-['Satoshi'] text-lg">
              Unit UMKM akan segera hadir
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Main content
  return (
    <section className="w-full px-4 bg-[#F5F5F5] md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
      <div className="w-full flex flex-col justify-start items-center gap-12">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
            UMKM
          </div>
          <div className="text-[#041b06] text-2xl md:text-3xl lg:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
            UMKM Desa Kenteng
          </div>
          <p className="text-[#6e7869] text-center font-['Satoshi'] max-w-2xl mt-2">
            Berbagai unit usaha mikro, kecil, dan menengah yang dikembangkan oleh BUMDes untuk mendukung perekonomian masyarakat desa.
          </p>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {umkmData.map((umkm) => (
            <UmkmCard
              key={umkm.id}
              id={umkm.id}
              title={umkm.name}
              description={umkm.description}
              imageUrl={umkm.image_url || "/placeholder.svg?height=236&width=379"}
              category={umkm.category}
              location={umkm.location}
              contactNumber={umkm.contact_number}
              establishedYear={umkm.established_year}
              showContactButton={false} // Hide contact button in grid view
            />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && umkmData.length > 0 && (
          <div className="w-full flex justify-center mt-8">
            <Link href="/bumdes">
              <Button 
                className="bg-[#6e7869] hover:bg-[#5a6456] text-white font-['Satoshi'] px-8 py-3 text-lg"
                size="lg"
              >
                Lihat Semua UMKM
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}