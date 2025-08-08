import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "white"
  size?: "default" | "large"
  className?: string
}

export default function CTAButton({ 
  href, 
  children, 
  variant = "primary", 
  size = "default",
  className 
}: CTAButtonProps) {
  const baseClasses = "inline-flex justify-center items-center gap-2.5 cursor-pointer transition rounded-lg font-bold tracking-wide"
  
  const variants = {
    primary: "bg-[#3f9547] text-white hover:bg-[#348a3b]",
    secondary: "bg-white text-[#1a1a1a] hover:bg-gray-100",
    white: "bg-white text-[#1a1a1a] hover:bg-gray-100"
  }
  
  const sizes = {
    default: "px-6 py-4 text-base",
    large: "px-8 md:px-10 py-4 md:py-5 text-base md:text-lg"
  }

  return (
    <Link href={href}>
      <div className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}>
        <span>{children}</span>
        <ArrowRight className="w-5 h-5" />
      </div>
    </Link>
  )
}