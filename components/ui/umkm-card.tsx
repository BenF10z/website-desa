import Image from "next/image"

interface UmkmCardProps {
  title: string
  description: string
  imageUrl: string
}

export default function UmkmCard({ title, description, imageUrl }: UmkmCardProps) {
  return (
    <div className="w-full rounded-2xl flex flex-col justify-start items-start gap-6 overflow-hidden">
      <div className="relative w-full h-[280px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-3">
        <h3 className="text-[#2a2a2a] text-xl font-bold font-['Satoshi'] capitalize">
          {title}
        </h3>
        <p className="text-[#2a2a2a] text-base font-normal font-['Satoshi'] capitalize leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}