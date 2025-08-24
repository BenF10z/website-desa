"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, Phone, Search, Images, Package } from "lucide-react";

interface PaketWisataItem {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image_url: string;
  additional_images: string[];
  facilities: string[];
  min_participants: number;
  max_participants: number;
  contact_person: string;
  contact_number: string;
  is_active: boolean;
  created_at: string;
}

export default function PaketWisataPage() {
  const [packages, setPackages] = useState<PaketWisataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPaketWisata();
  }, []);

  const fetchPaketWisata = async () => {
    try {
      const response = await fetch("/api/paket-wisata");
      if (response.ok) {
        const data = await response.json();
        // Filter only active packages for public display
        setPackages(data.filter((pkg: PaketWisataItem) => pkg.is_active));
      }
    } catch (error) {
      console.error("Error fetching paket wisata:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleContactClick = (contactNumber: string) => {
    if (contactNumber) {
      // Format number for WhatsApp (remove non-digits and add country code if needed)
      const cleanNumber = contactNumber.replace(/\D/g, '');
      const whatsappNumber = cleanNumber.startsWith('62') ? cleanNumber : `62${cleanNumber.startsWith('0') ? cleanNumber.slice(1) : cleanNumber}`;
      window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    }
  };

  // Loading state yang konsisten dengan halaman lain
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Skeleton */}
        <section className="relative w-full h-[276px] z-10">
          <div className="absolute inset-0 bg-[#7e8e7e]" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-1/3 h-12 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
        </section>

        {/* Search Section Skeleton */}
        <div className="w-full px-4 md:px-[120px] py-8">
          <div className="max-w-2xl mx-auto">
            <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="w-full px-4 md:px-[120px] pb-16">
          <div className="w-64 h-10 bg-gray-200 rounded-lg animate-pulse mb-8 mx-auto"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="w-full h-56 bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer"
                     style={{ backgroundSize: '1000px 100%', backgroundRepeat: 'no-repeat' }}></div>
                <div className="p-6 space-y-4">
                  <div className="w-3/4 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-full h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-1/2 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="w-20 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Seragam dengan halaman lain */}
      <section className="relative w-full h-[276px] z-10">
        <div className="absolute inset-0 bg-[#7e8e7e]" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi'] text-center">
            Paket Wisata
          </h1>
        </div>
      </section>

      {/* Search Section */}
      <div className="w-full px-4 md:px-[120px] py-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#3e5880]" />
            <Input
              placeholder="Cari paket wisata berdasarkan nama, lokasi, atau deskripsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#143051]/30 focus:border-[#143051] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="w-full px-4 md:px-[120px] py-[60px] bg-white">
        <div className="flex flex-col justify-start items-center gap-12">
          {filteredPackages.length === 0 ? (
            <div className="w-full py-12 md:py-16 text-center">
              <Package className="mx-auto h-12 w-12 md:h-16 md:w-16 text-[#143051] mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-[#143051] mb-2 font-['Satoshi']">
                {searchTerm 
                  ? "Tidak ada paket yang sesuai"
                  : "Belum ada paket wisata"
                }
              </h3>
              <p className="text-sm md:text-base text-[#3e5880] font-['Satoshi']">
                {searchTerm 
                  ? "Coba ubah kata kunci pencarian Anda"
                  : "Paket wisata akan segera ditambahkan"
                }
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-start items-start gap-8">
              {/* Title Section */}
              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
                  Wisata
                </div>
                <div className="text-[#143051] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
                  Paket Wisata Tersedia ({filteredPackages.length})
                </div>
                <p className="text-[#6e7869] text-center font-['Satoshi'] max-w-2xl mt-2">
                  Jelajahi keindahan Desa Kenteng dengan berbagai paket wisata yang menarik dan berkesan.
                </p>
              </div>
              
              {/* Package Grid */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg) => (
                  <Card key={pkg.id} className="group hover:shadow-xl transition-all duration-300 border-[#143051]/20 hover:border-[#143051] overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative h-56 w-full overflow-hidden">
                        {pkg.image_url ? (
                          <>
                            <Image
                              src={pkg.image_url}
                              alt={pkg.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                              <Badge className="bg-green-600 hover:bg-green-700 text-white font-medium">
                                {formatCurrency(pkg.price)}
                              </Badge>
                              {pkg.additional_images && pkg.additional_images.length > 0 && (
                                <Badge variant="secondary" className="bg-white/90 text-[#143051] hover:bg-white">
                                  <Images className="h-3 w-3 mr-1" />
                                  +{pkg.additional_images.length}
                                </Badge>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="h-56 bg-gradient-to-br from-[#6e7869] to-[#4a5a4a] flex items-center justify-center">
                            <div className="text-center text-white">
                              <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                              <p className="text-sm opacity-75">Gambar tidak tersedia</p>
                            </div>
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-green-600 text-white font-medium">
                                {formatCurrency(pkg.price)}
                              </Badge>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <CardTitle className="text-xl font-bold text-[#143051] font-['Satoshi'] mb-3 line-clamp-2">
                        {pkg.name}
                      </CardTitle>
                      
                      {pkg.description && (
                        <CardDescription className="text-[#3e5880] font-['Satoshi'] mb-4 line-clamp-3">
                          {pkg.description}
                        </CardDescription>
                      )}

                      {/* Package Details */}
                      <div className="space-y-3 mb-4">
                        {pkg.duration && (
                          <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                            <Clock className="h-4 w-4 text-[#143051] flex-shrink-0" />
                            <span>{pkg.duration}</span>
                          </div>
                        )}
                        
                        {pkg.location && (
                          <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                            <MapPin className="h-4 w-4 text-[#143051] flex-shrink-0" />
                            <span className="line-clamp-1">{pkg.location}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                          <Users className="h-4 w-4 text-[#143051] flex-shrink-0" />
                          <span>{pkg.min_participants}-{pkg.max_participants} peserta</span>
                        </div>
                      </div>

                      {/* Facilities */}
                      {pkg.facilities && pkg.facilities.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm font-medium text-[#143051] mb-2">Fasilitas:</div>
                          <div className="flex flex-wrap gap-1">
                            {pkg.facilities.slice(0, 3).map((facility, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-[#6e7869]/30 text-[#6e7869]">
                                {facility}
                              </Badge>
                            ))}
                            {pkg.facilities.length > 3 && (
                              <Badge variant="outline" className="text-xs border-[#6e7869]/30 text-[#6e7869]">
                                +{pkg.facilities.length - 3} lagi
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Additional Images Preview */}
                      {pkg.additional_images && pkg.additional_images.length > 0 && (
                        <div className="mb-4 border-t pt-3">
                          <div className="text-xs text-[#3e5880] mb-2 font-medium">Galeri:</div>
                          <div className="grid grid-cols-4 gap-2">
                            {pkg.additional_images.slice(0, 4).map((imageUrl, index) => (
                              <div key={index} className="relative h-16 rounded overflow-hidden border border-[#143051]/20 cursor-pointer hover:border-[#143051] transition-colors">
                                <Image
                                  src={imageUrl}
                                  alt={`${pkg.name} - ${index + 1}`}
                                  fill
                                  className="object-cover hover:scale-105 transition-transform duration-200"
                                  sizes="(max-width: 768px) 25vw, 12vw"
                                  onClick={() => window.open(imageUrl, '_blank')}
                                />
                              </div>
                            ))}
                            {pkg.additional_images.length > 4 && (
                              <div className="relative h-16 rounded overflow-hidden border border-[#143051]/20 bg-[#143051]/10 flex items-center justify-center cursor-pointer hover:bg-[#143051]/20 transition-colors"
                                   onClick={() => pkg.additional_images.forEach(url => window.open(url, '_blank'))}>
                                <span className="text-xs text-[#143051] font-medium">+{pkg.additional_images.length - 4}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Contact Section */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(pkg.price)}
                          </div>
                          <div className="text-xs text-[#3e5880]">
                            /paket
                          </div>
                        </div>
                        {pkg.contact_number && (
                          <Button
                            onClick={() => handleContactClick(pkg.contact_number)}
                            className="bg-[#6e7869] hover:bg-[#5a6456] text-white font-['Satoshi']"
                            size="sm"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Hubungi
                          </Button>
                        )}
                      </div>

                      {/* Contact Person Info */}
                      {pkg.contact_person && (
                        <div className="mt-3 text-xs text-[#3e5880] text-center">
                          Hubungi: {pkg.contact_person}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}