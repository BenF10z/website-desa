import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Calendar, Building2 } from "lucide-react";
import Image from "next/image";

interface UmkmCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  location?: string;
  contactNumber?: string;
  establishedYear?: number;
}

export default function UmkmCard({ 
  title, 
  description, 
  imageUrl, 
  category,
  location,
  contactNumber,
  establishedYear
}: UmkmCardProps) {
  const handleContactClick = (contactNumber: string) => {
    if (contactNumber) {
      // Format number for WhatsApp
      const cleanNumber = contactNumber.replace(/\D/g, '');
      const whatsappNumber = cleanNumber.startsWith('62') ? cleanNumber : `62${cleanNumber.startsWith('0') ? cleanNumber.slice(1) : cleanNumber}`;
      window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-[#6e7869]/20 hover:border-[#6e7869] bg-white">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {category && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-[#6e7869] hover:bg-[#6e7869]/90 text-white">
                {category}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl font-bold text-[#041b06] font-['Satoshi'] mb-3">
          {title}
        </CardTitle>
        <CardDescription className="text-[#6e7869] font-['Satoshi'] mb-4 line-clamp-3">
          {description}
        </CardDescription>

        {/* Details */}
        <div className="space-y-2 mb-4">
          {location && (
            <div className="flex items-center gap-2 text-sm text-[#6e7869]">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
          {establishedYear && (
            <div className="flex items-center gap-2 text-sm text-[#6e7869]">
              <Calendar className="h-4 w-4" />
              <span>Didirikan {establishedYear}</span>
            </div>
          )}
        </div>

        {/* Contact Button */}
        {contactNumber && (
          <Button
            onClick={() => handleContactClick(contactNumber)}
            className="w-full bg-[#6e7869] hover:bg-[#5a6456] text-white font-['Satoshi']"
            size="sm"
          >
            <Phone className="h-4 w-4 mr-2" />
            Hubungi via WhatsApp
          </Button>
        )}
      </CardContent>
    </Card>
  );
}