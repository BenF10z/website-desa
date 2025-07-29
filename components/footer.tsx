import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Desa Kenteng</h3>
            <p className="text-green-200 mb-4">
              Desa yang kaya akan potensi alam, budaya, dan kearifan lokal di dataran tinggi Indonesia.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-green-300 hover:text-white cursor-pointer" />
              <Instagram className="w-6 h-6 text-green-300 hover:text-white cursor-pointer" />
              <Twitter className="w-6 h-6 text-green-300 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-200 hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="text-green-200 hover:text-white">
                  Profil
                </Link>
              </li>
              <li>
                <Link href="/potensi-desa" className="text-green-200 hover:text-white">
                  Potensi Desa
                </Link>
              </li>
              <li>
                <Link href="/bumdes" className="text-green-200 hover:text-white">
                  Bumdes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/paket-wisata" className="text-green-200 hover:text-white">
                  Paket Wisata
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-green-200 hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white">
                  Produk Lokal
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white">
                  Homestay
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-green-300 mr-2" />
                <span className="text-green-200">Desa Kenteng, Kecamatan...</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-green-300 mr-2" />
                <span className="text-green-200">+62 xxx-xxxx-xxxx</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-green-300 mr-2" />
                <span className="text-green-200">info@desakenteng.id</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200">© 2024 Desa Kenteng. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
