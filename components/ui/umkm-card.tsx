import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UmkmCardProps {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  location?: string;
  contactNumber?: string;
  establishedYear?: number;
  showContactButton?: boolean;
  href?: string;
}

export default function UmkmCard({
  id,
  title,
  description,
  imageUrl,
  category,
  location,
  contactNumber,
  establishedYear,
  showContactButton = true,
  href
}: UmkmCardProps) {
  const handleContactClick = (e: React.MouseEvent, contactNumber: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (contactNumber) {
      const cleanNumber = contactNumber.replace(/\D/g, "");
      const whatsappNumber = cleanNumber.startsWith("62")
        ? cleanNumber
        : `62${cleanNumber.startsWith("0") ? cleanNumber.slice(1) : cleanNumber}`;
      window.open(`https://wa.me/${whatsappNumber}`, "_blank");
    }
  };

  const cardContent = (
    <article className="w-full flex flex-col justify-center items-start gap-3 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full h-[210px] relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-2xl transition-all duration-300 group-hover:brightness-110"
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
        <div className="w-full flex justify-between items-center">
          <span className="text-[#3e5880] text-sm font-normal font-['Satoshi'] tracking-tight">
            {location || "UMKM"}
          </span>
          <span className="text-[#3e5880] text-sm font-normal font-['Satoshi'] tracking-tight">
            {establishedYear ? `Didirikan ${establishedYear}` : ""}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <h3 className="w-full text-[#143051] text-xl font-bold font-['Satoshi'] tracking-tight transition-colors duration-300 group-hover:text-[#6e7869]">
          {title}
        </h3>
        {description && (
          <p className="w-full text-[#143051] text-base font-normal font-['Satoshi'] line-clamp-3">
            {description}
          </p>
        )}
        {showContactButton && contactNumber && (
          <Button
            onClick={(e) => handleContactClick(e, contactNumber)}
            className="w-full bg-[#6e7869] hover:bg-[#5a6456] text-white font-['Satoshi']"
            size="sm"
          >
            <Phone className="h-4 w-4 mr-2" />
            Hubungi via WhatsApp
          </Button>
        )}
      </div>
    </article>
  );

  // If href is provided or id is available, wrap with Link
  if (href || id) {
    return (
      <Link href={href || `/bumdes/${id}`} className="block group">
        {cardContent}
      </Link>
    );
  }

  // Otherwise return without Link wrapper
  return <div className="group">{cardContent}</div>;
}