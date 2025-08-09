import Image from "next/image"
import Link from "next/link"

interface NewsCardProps {
  title: string
  description?: string
  author: string
  date: string
  imageUrl: string
  readTime?: string
  isEssay?: boolean
  href?: string
  slug?: string
}

export default function NewsCard({
  title,
  description,
  author,
  date,
  imageUrl,
  readTime,
  isEssay = false,
  href,
  slug
}: NewsCardProps) {
  const linkUrl = href || (slug ? `/berita-desa/${slug}` : "#")

  return (
    <Link href={linkUrl} className="block group">
      <article className="w-full flex flex-col justify-center items-start gap-3 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-full h-[210px] relative">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover rounded-2xl transition-all duration-300 group-hover:brightness-110"
            />
            {isEssay && (
              <div className="w-10 h-10 absolute top-4 left-4 bg-[#143051] rounded-sm" />
            )}
          </div>
          <div className="w-full flex justify-between items-center">
            <span className="text-[#3e5880] text-sm font-normal font-['Satoshi'] tracking-tight">
              {isEssay ? "Essay" : author}
            </span>
            <span className="text-[#3e5880] text-sm font-normal font-['Satoshi'] tracking-tight">
              {date}
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
          <div className="flex justify-center items-center gap-4">
            <span className="text-[#3e5880] text-sm font-normal font-['Satoshi']">
              {readTime || author}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}