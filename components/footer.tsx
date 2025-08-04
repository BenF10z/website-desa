import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white w-full">
      <div className="w-full px-6 md:px-16 lg:px-[120px] py-10 md:py-16 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 overflow-hidden">
        <div className="text-white text-2xl md:text-[32px] font-black font-sans md:font-['Satoshi'] mb-6 md:mb-0">Kenteng Village</div>
        <div className="flex flex-col md:flex-row justify-start items-start gap-12 md:gap-[80px] lg:gap-[107px] w-full md:w-auto">
          {/* MENU */}
          <div className="flex flex-col justify-start items-start gap-4 md:gap-6 min-w-[120px]">
            <div className="text-white text-sm md:text-[15px] font-bold tracking-wide font-sans md:font-['Satoshi']">MENU</div>
            <div className="flex flex-col justify-start items-start gap-2 md:gap-4">
              <Link href="/" className="text-green-200 text-sm font-normal font-sans hover:text-white transition">Home</Link>
              <Link href="/profil" className="text-green-200 text-sm font-normal font-sans hover:text-white transition">About us</Link>
              <Link href="/paket-wisata" className="text-green-200 text-sm font-normal font-sans hover:text-white transition">Tours</Link>
              <Link href="#" className="text-green-200 text-sm font-normal font-sans hover:text-white transition">Booking</Link>
              <Link href="/gallery" className="text-green-200 text-sm font-normal font-sans hover:text-white transition">Contact us</Link>
            </div>
          </div>
          {/* RESOURCES */}
          <div className="flex flex-col justify-start items-start gap-4 md:gap-6 min-w-[120px]">
            <div className="text-white text-sm md:text-[15px] font-bold tracking-wide font-sans md:font-['Satoshi']">RESOURCES</div>
            <div className="flex flex-col justify-start items-start gap-2 md:gap-4">
              <Link href="#" className="text-green-200 text-sm font-normal font-sans hover:text-white transition">Blog</Link>
              <Link href="#" className="text-green-200 text-sm font-normal font-sans hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="text-green-200 text-sm font-normal font-sans hover:text-white transition">Terms & Condition</Link>
            </div>
          </div>
          {/* INFORMATION */}
          <div className="flex flex-col justify-start items-start gap-4 md:gap-6 min-w-[120px]">
            <div className="text-white text-sm md:text-[15px] font-bold tracking-wide font-sans md:font-['Satoshi']">INFORMATION</div>
            <div className="flex flex-col justify-start items-start gap-2 md:gap-4">
              <div className="inline-flex justify-start items-center gap-2.5">
                <MapPin className="w-[22px] h-[22px] text-green-200" />
                <span className="text-green-200 text-sm font-normal font-sans">Desa Kenteng</span>
              </div>
              <div className="inline-flex justify-start items-center gap-2.5">
                <Phone className="w-[22px] h-[22px] text-green-200" />
                <span className="text-green-200 text-sm font-normal font-sans">+62 xxx-xxxx-xxxx</span>
              </div>
              <div className="inline-flex justify-start items-center gap-2.5">
                <Mail className="w-[22px] h-[22px] text-green-200" />
                <span className="text-green-200 text-sm font-normal font-sans">info@desakenteng.id</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-green-700 pt-6 pb-4 text-center">
        <div className="flex justify-center items-center gap-4 mb-2">
          <a href="#" aria-label="Facebook"><Facebook className="w-6 h-6 text-green-300 hover:text-white cursor-pointer" /></a>
          <a href="#" aria-label="Instagram"><Instagram className="w-6 h-6 text-green-300 hover:text-white cursor-pointer" /></a>
          <a href="#" aria-label="Twitter"><Twitter className="w-6 h-6 text-green-300 hover:text-white cursor-pointer" /></a>
        </div>
        <p className="text-green-200 text-sm">© 2025 Desa Kenteng. Semua hak cipta dilindungi.</p>
      </div>
    </footer>
  )
}
