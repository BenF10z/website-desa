"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, MapPin, Phone, User, Calendar, Images } from "lucide-react";

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

export default function BumdesDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [unit, setUnit] = useState<BumdesItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (params.id) {
      fetchUnitDetail(params.id as string);
    }
  }, [params.id]);

  const fetchUnitDetail = async (id: string) => {
    try {
      const response = await fetch(`/api/bumdes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUnit(data);
        setSelectedImage(data.image_url || "");
      } else {
        router.push("/bumdes");
      }
    } catch (error) {
      console.error("Error fetching unit detail:", error);
      router.push("/bumdes");
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (contactNumber: string) => {
    if (contactNumber) {
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
          <p className="mt-4 text-[#143051] font-['Satoshi']">Memuat detail unit...</p>
        </div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Building2 className="mx-auto h-16 w-16 text-[#6e7869] mb-4" />
          <h3 className="text-2xl font-bold text-[#143051] mb-2 font-['Satoshi']">
            Unit tidak ditemukan
          </h3>
          <Button onClick={() => router.push("/bumdes")} className="bg-[#6e7869] hover:bg-[#5a6456]">
            Kembali ke BUMDes
          </Button>
        </div>
      </div>
    );
  }

  const allImages = [unit.image_url, ...(unit.additional_images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="w-full px-4 md:px-[120px] pt-24 pb-8">
        <Button 
          variant="outline" 
          onClick={() => router.push("/bumdes")}
          className="mb-6 border-[#6e7869] text-[#6e7869] hover:bg-[#6e7869] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke BUMDes
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 w-full rounded-lg overflow-hidden border border-[#6e7869]/20">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={unit.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#6e7869] to-[#4a5a4a] flex items-center justify-center">
                  <Building2 className="h-24 w-24 text-white opacity-50" />
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((imageUrl, index) => (
                  <div 
                    key={index} 
                    className={`relative h-20 rounded cursor-pointer border-2 overflow-hidden transition-all ${
                      selectedImage === imageUrl 
                        ? 'border-[#6e7869]' 
                        : 'border-[#6e7869]/20 hover:border-[#6e7869]/50'
                    }`}
                    onClick={() => setSelectedImage(imageUrl)}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${unit.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Unit Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-[#143051] font-['Satoshi'] flex-1">
                  {unit.name}
                </h1>
                <Badge className="bg-[#6e7869] hover:bg-[#6e7869]/90 text-white">
                  {unit.category}
                </Badge>
              </div>
              
              <p className="text-[#3e5880] font-['Satoshi'] text-lg leading-relaxed">
                {unit.description}
              </p>
            </div>

            {/* Details Card */}
            <Card className="border-[#6e7869]/20">
              <CardHeader>
                <CardTitle className="text-[#143051] font-['Satoshi'] flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informasi Unit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {unit.contact_person && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-[#6e7869]" />
                    <div>
                      <div className="font-medium text-[#143051]">Penanggung Jawab</div>
                      <div className="text-[#3e5880]">{unit.contact_person}</div>
                    </div>
                  </div>
                )}

                {unit.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#6e7869]" />
                    <div>
                      <div className="font-medium text-[#143051]">Lokasi</div>
                      <div className="text-[#3e5880]">{unit.location}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#6e7869]" />
                  <div>
                    <div className="font-medium text-[#143051]">Tahun Didirikan</div>
                    <div className="text-[#3e5880]">{unit.established_year}</div>
                  </div>
                </div>

                {unit.additional_images && unit.additional_images.length > 0 && (
                  <div className="flex items-center gap-3">
                    <Images className="h-5 w-5 text-[#6e7869]" />
                    <div>
                      <div className="font-medium text-[#143051]">Gambar Tambahan</div>
                      <div className="text-[#3e5880]">{unit.additional_images.length} gambar</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Button */}
            {unit.contact_number && (
              <Button
                onClick={() => handleContactClick(unit.contact_number)}
                size="lg"
                className="w-full bg-[#6e7869] hover:bg-[#5a6456] text-white font-['Satoshi'] py-6"
              >
                <Phone className="h-5 w-5 mr-2" />
                Hubungi via WhatsApp
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}