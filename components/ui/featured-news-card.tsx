"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface FeaturedNewsCardProps {
  title: string
  description: string
  imageUrl: string
  slug: string
}

export default function FeaturedNewsCard({
  title,
  description,
  imageUrl,
  slug
}: FeaturedNewsCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/berita-desa/${slug}`)
  }

  return (
    <div className="w-full h-auto md:h-[659px] relative group cursor-pointer" onClick={handleClick}>
      <div className="w-full h-full absolute bg-[#555555]" />
      <Image
        src={imageUrl}
        alt="Featured News"
        fill
        className="object-cover mix-blend-overlay transition-all duration-300 group-hover:brightness-110"
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 py-16 md:py-0">
        <div className="max-w-[1097px] flex flex-col justify-end items-center gap-3 text-center">
          <h2 className="text-white text-2xl md:text-5xl font-bold font-['Satoshi'] tracking-wide leading-tight transition-all duration-300 group-hover:scale-105">
            {title}
          </h2>
          <p className="text-white text-sm md:text-base font-normal font-['Satoshi'] max-w-4xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}