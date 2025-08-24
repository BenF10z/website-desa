"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, Phone, DollarSign, Search, Images } from "lucide-react";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#143051]"></div>
          <p className="mt-4 text-[#143051] font-['Satoshi']">Memuat paket wisata...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative w-full h-[276px] z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#143051] to-[#3e5880]" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi'] mb-4">
              Paket Wisata
            </h1>
            <p className="text-white/90 text-lg font-['Satoshi']">
              Jelajahi keindahan Desa Kenteng dengan paket wisata terbaik
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div className="w-full px-4 md:px-[120px] py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#3e5880]" />
            <Input
              placeholder="Cari paket wisata..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#143051] focus:border-[#3e5880]"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 md:px-[120px] pb-16">
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏖️</div>
            <h3 className="text-2xl font-bold text-[#143051] mb-2 font-['Satoshi']">
              {searchTerm 
                ? "Tidak ada paket yang sesuai"
                : "Belum ada paket wisata"
              }
            </h3>
            <p className="text-[#3e5880] font-['Satoshi']">
              {searchTerm 
                ? "Coba ubah kata kunci pencarian Anda"
                : "Paket wisata akan segera ditambahkan"
              }
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-[#143051] text-3xl md:text-4xl font-bold font-['Satoshi'] tracking-wide mb-8 text-center">
              Paket Wisata Tersedia ({filteredPackages.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="group hover:shadow-xl transition-all duration-300 border-[#143051]/20 hover:border-[#143051] overflow-hidden">
                  <CardHeader className="p-0">
                    {pkg.image_url ? (
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={pkg.image_url}
                          alt={pkg.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge className="bg-green-600 hover:bg-green-700 text-white">
                            {formatCurrency(pkg.price)}
                          </Badge>
                          {pkg.additional_images && pkg.additional_images.length > 0 && (
                            <Badge variant="secondary" className="bg-white/90 text-[#143051] hover:bg-white">
                              <Images className="h-3 w-3 mr-1" />
                              +{pkg.additional_images.length}
                            </Badge>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    ) : (
                      <div className="h-56 bg-gradient-to-br from-[#143051] to-[#3e5880] flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-4xl mb-2">🏖️</div>
                          <p className="text-sm opacity-80">Gambar tidak tersedia</p>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-green-600 text-white">
                            {formatCurrency(pkg.price)}
                          </Badge>
                        </div>
                      </div>
                    )}
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
                          <Clock className="h-4 w-4 text-[#143051]" />
                          <span>{pkg.duration}</span>
                        </div>
                      )}
                      
                      {pkg.location && (
                        <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                          <MapPin className="h-4 w-4 text-[#143051]" />
                          <span className="line-clamp-1">{pkg.location}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                        <Users className="h-4 w-4 text-[#143051]" />
                        <span>{pkg.min_participants}-{pkg.max_participants} peserta</span>
                      </div>
                    </div>

                    {/* Facilities */}
                    {pkg.facilities && pkg.facilities.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-[#143051] mb-2">Fasilitas:</div>
                        <div className="flex flex-wrap gap-1">
                          {pkg.facilities.slice(0, 3).map((facility, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-[#143051]/30 text-[#143051]">
                              {facility}
                            </Badge>
                          ))}
                          {pkg.facilities.length > 3 && (
                            <Badge variant="outline" className="text-xs border-[#143051]/30 text-[#143051]">
                              +{pkg.facilities.length - 3} lagi
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Additional Images Preview */}
                    {pkg.additional_images && pkg.additional_images.length > 0 && (
                      <div className="mb-4 border-t pt-3">
                        <div className="text-xs text-[#3e5880] mb-2 font-medium">Gambar Lainnya:</div>
                        <div className="grid grid-cols-4 gap-2">
                          {pkg.additional_images.slice(0, 4).map((imageUrl, index) => (
                            <div key={index} className="relative h-16 rounded overflow-hidden border border-[#143051]/20">
                              <Image
                                src={imageUrl}
                                alt={`${pkg.name} - ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                                sizes="(max-width: 768px) 25vw, 12vw"
                                onClick={() => window.open(imageUrl, '_blank')}
                              />
                            </div>
                          ))}
                          {pkg.additional_images.length > 4 && (
                            <div className="relative h-16 rounded overflow-hidden border border-[#143051]/20 bg-[#143051]/10 flex items-center justify-center cursor-pointer hover:bg-[#143051]/20 transition-colors">
                              <span className="text-xs text-[#143051] font-medium">+{pkg.additional_images.length - 4}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Contact Button */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(pkg.price)}
                      </div>
                      {pkg.contact_number && (
                        <Button
                          onClick={() => handleContactClick(pkg.contact_number)}
                          className="bg-[#143051] hover:bg-[#0f2847] text-white font-['Satoshi']"
                          size="sm"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Hubungi
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}