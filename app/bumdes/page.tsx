"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, MapPin, Phone, User, Calendar, Search, Filter, Images } from "lucide-react";
import BumdesProfileSection from "@/components/sections/bumdes-profile-section";

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
  is_active: boolean;
  established_year: number;
  created_at: string;
}

export default function Bumdes() {
  const [units, setUnits] = useState<BumdesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchBumdesUnits();
  }, []);

  const fetchBumdesUnits = async () => {
    try {
      const response = await fetch("/api/bumdes");
      if (response.ok) {
        const data = await response.json();
        // Filter only active units for public display
        setUnits(data.filter((unit: BumdesItem) => unit.is_active));
      }
    } catch (error) {
      console.error("Error fetching BUMDes units:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUnits = units.filter((unit) => {
    const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.contact_person?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || unit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(units.map(unit => unit.category))];

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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6e7869]"></div>
          <p className="mt-4 text-[#143051] font-['Satoshi']">Memuat data BUMDes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative w-full h-[276px] z-10">
        <div className="absolute inset-0 bg-[#7e8e7e]" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi'] text-center">
            BUMDes Kenteng
          </h1>
        </div>
      </section>
      
      {/* Profile Section */}
      <BumdesProfileSection />

      {/* Search and Filter */}
      <div className="w-full px-4 md:px-[120px] pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#3e5880]" />
              <Input
                placeholder="Cari unit BUMDes..."
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

      {/* Units Grid */}
      <div className="w-full px-4 md:px-[120px] pb-16">
        {filteredUnits.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="mx-auto h-16 w-16 text-[#6e7869] mb-4" />
            <h3 className="text-2xl font-bold text-[#143051] mb-2 font-['Satoshi']">
              {searchTerm || selectedCategory !== "all" 
                ? "Tidak ada unit yang sesuai"
                : "Belum ada unit BUMDes"
              }
            </h3>
            <p className="text-[#3e5880] font-['Satoshi']">
              {searchTerm || selectedCategory !== "all" 
                ? "Coba ubah kriteria pencarian Anda"
                : "Unit BUMDes akan segera ditambahkan"
              }
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-[#143051] text-3xl md:text-4xl font-bold font-['Satoshi'] tracking-wide mb-8 text-center">
              Unit BUMDes ({filteredUnits.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUnits.map((unit) => (
                <Card key={unit.id} className="group hover:shadow-lg transition-all duration-300 border-[#6e7869]/20 hover:border-[#6e7869]">
                  <CardHeader className="p-0">
                    {unit.image_url ? (
                      <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
                        <Image
                          src={unit.image_url}
                          alt={unit.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge className="bg-[#6e7869] hover:bg-[#6e7869]/90">
                            {unit.category}
                          </Badge>
                          {unit.additional_images && unit.additional_images.length > 0 && (
                            <Badge variant="secondary" className="bg-white/90 text-[#6e7869] hover:bg-white">
                              <Images className="h-3 w-3 mr-1" />
                              +{unit.additional_images.length}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#6e7869] to-[#4a5a4a] flex items-center justify-center rounded-t-lg">
                        <Building2 className="h-16 w-16 text-white opacity-50" />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white text-[#6e7869]">
                            {unit.category}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-bold text-[#143051] font-['Satoshi'] mb-3">
                      {unit.name}
                    </CardTitle>
                    <CardDescription className="text-[#3e5880] font-['Satoshi'] mb-4 line-clamp-3">
                      {unit.description}
                    </CardDescription>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      {unit.contact_person && (
                        <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                          <User className="h-4 w-4" />
                          <span>{unit.contact_person}</span>
                        </div>
                      )}
                      {unit.location && (
                        <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{unit.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                        <Calendar className="h-4 w-4" />
                        <span>Didirikan {unit.established_year}</span>
                      </div>
                    </div>

                    {/* Additional Images Preview */}
                    {unit.additional_images && unit.additional_images.length > 0 && (
                      <div className="mb-4 border-t pt-3">
                        <div className="text-xs text-[#3e5880] mb-2 font-medium">Gambar Tambahan:</div>
                        <div className="grid grid-cols-3 gap-2">
                          {unit.additional_images.slice(0, 3).map((imageUrl, index) => (
                            <div key={index} className="relative h-16 rounded overflow-hidden border border-[#6e7869]/20">
                              <Image
                                src={imageUrl}
                                alt={`${unit.name} - ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                                sizes="(max-width: 768px) 33vw, 16vw"
                                onClick={() => window.open(imageUrl, '_blank')}
                              />
                            </div>
                          ))}
                          {unit.additional_images.length > 3 && (
                            <div className="relative h-16 rounded overflow-hidden border border-[#6e7869]/20 bg-[#6e7869]/10 flex items-center justify-center cursor-pointer hover:bg-[#6e7869]/20 transition-colors">
                              <span className="text-xs text-[#6e7869] font-medium">+{unit.additional_images.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Contact Button */}
                    {unit.contact_number && (
                      <Button
                        onClick={() => handleContactClick(unit.contact_number)}
                        className="w-full bg-[#6e7869] hover:bg-[#5a6456] text-white font-['Satoshi']"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Hubungi via WhatsApp
                      </Button>
                    )}
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