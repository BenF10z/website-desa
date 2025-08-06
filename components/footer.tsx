import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 w-full">
      {/* Single Background Image for Entire Footer */}
      <div className="relative w-full overflow-hidden">
        {/* Background Image - ONE IMAGE FOR EVERYTHING */}
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/village-footer/1440/600"
            alt="Desa Kenteng Background"
            fill
            className="object-cover"
            priority={false}
          />
          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        </div>
        
        {/* Main Footer Content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-[120px] py-12 md:py-16">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            {/* Logo and Description */}
            <div className="flex flex-col gap-6 lg:max-w-[400px]">
              <div className="text-white text-2xl md:text-3xl font-bold font-['Poppins']">
                Kenteng Village
              </div>
              <p className="text-gray-100 text-sm md:text-base leading-relaxed">
                Desa wisata yang menawarkan pengalaman autentik di dataran tinggi Jawa Tengah.
                Nikmati keindahan alam, budaya lokal, dan kehangatan masyarakat desa.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20">
              {/* Quick Links */}
              <div className="flex flex-col gap-4">
                <h3 className="text-white text-lg font-semibold font-['Poppins']">
                  MENU UTAMA
                </h3>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/"
                    className="text-gray-200 text-sm md:text-base hover:text-white transition-colors duration-200"
                  >
                    Beranda
                  </Link>
                  <Link
                    href="/profil"
                    className="text-gray-200 text-sm md:text-base hover:text-white transition-colors duration-200"
                  >
                    Profil Desa
                  </Link>
                  <Link
                    href="/potensi-desa"
                    className="text-gray-200 text-sm md:text-base hover:text-white transition-colors duration-200"
                  >
                    Potensi Desa
                  </Link>
                  <Link
                    href="/bumdes"
                    className="text-gray-200 text-sm md:text-base hover:text-white transition-colors duration-200"
                  >
                    BUMDes
                  </Link>
                </div>
              </div>

              {/* Services */}
              <div className="flex flex-col gap-4">
                <h3 className="text-white text-lg font-semibold font-['Poppins']">
                  LAYANAN
                </h3>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/paket-wisata"
                    className="text-gray-200 text-sm md:text-base hover:text-white transition-colors duration-200"
                  >
                    Paket Wisata
                  </Link>
                  <Link
                    href="/gallery"
                    className="text-gray-200 text-sm md:text-base hover:text-white transition-colors duration-200"
                  >
                    Galeri
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-200 text-sm md:text-base hover:text-white transition-colors duration-200"
                  >
                    Homestay
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-200 text-sm md:text-base hover:text-white transition-colors duration-200"
                  >
                    Booking Online
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-4">
                <h3 className="text-white text-lg font-semibold font-['Poppins']">
                  KONTAK
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200 text-sm md:text-base">
                      Desa Kenteng, Kec. Bandungan
                      <br />
                      Kab. Semarang, Jawa Tengah
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-gray-200 text-sm md:text-base">
                      +62 xxx-xxxx-xxxx
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-gray-200 text-sm md:text-base">
                      info@desakenteng.id
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - SAME BACKGROUND, NO BORDER */}
        <div className="relative z-10 px-6 md:px-16 lg:px-[120px] py-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-200 text-sm text-center md:text-left">
              © 2025 Desa Kenteng. Semua hak cipta dilindungi undang-undang.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-200 text-sm hidden md:block">Ikuti kami:</span>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                >
                  <Facebook className="w-4 h-4 text-gray-900" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                >
                  <Instagram className="w-4 h-4 text-gray-900" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                >
                  <Twitter className="w-4 h-4 text-gray-900" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}