import Image from "next/image"
import CTAButton from "@/components/ui/cta-button"

export default function NewsSection() {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4 lg:px-[120px]">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <div className="uppercase text-sm font-bold tracking-[4.2px] text-[#6e7869]">BERITA</div>
            <div className="text-3xl md:text-4xl font-bold tracking-wide text-[#1a1a1a]">Berita Desa</div>
          </div>

          {/* Content */}
          <div className="w-full flex flex-col gap-[52px]">
            {/* Top Section - Featured + Side Articles */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Featured Article */}
              <div className="lg:w-[664px] flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-[250px] md:h-[438px]">
                    <Image
                      src="/placeholder.svg?height=438&width=664"
                      alt="Featured News"
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#3e5880] text-sm font-normal tracking-tight">Penulis Tamu</span>
                    <span className="text-[#3e5880] text-sm font-normal tracking-tight">12/06/2025</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-[#143051] text-2xl font-bold tracking-wide">Festival Budaya Desa Kenteng 2025</h3>
                  <p className="text-[#143051] text-base font-normal">
                    Masyarakat Desa Kenteng kembali menggelar festival budaya tahunan yang menampilkan berbagai kesenian tradisional dan kuliner khas daerah
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-[#3e5880] text-sm font-normal">Tim Redaksi Desa</span>
                  </div>
                </div>
              </div>

              {/* Side Articles */}
              <div className="flex-1 flex flex-col justify-between gap-6">
                {/* Article 1 */}
                <div className="flex gap-5">
                  <Image
                    src="/placeholder.svg?height=168&width=168"
                    alt="News 1"
                    width={168}
                    height={168}
                    className="w-[120px] h-[120px] md:w-[168px] md:h-[168px] object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex justify-between items-start text-xs md:text-sm">
                      <span className="text-[#3e5880] font-normal">Penulis Tamu</span>
                      <span className="text-[#3e5880] font-normal tracking-tight">10/06/2025</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="text-[#143051] text-lg md:text-xl font-bold tracking-tight line-clamp-2">
                        Panen Raya Organik Semester Pertama
                      </h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#3e5880] text-sm font-normal">Kelompok Tani</span>
                    </div>
                  </div>
                </div>

                {/* Article 2 */}
                <div className="flex gap-5">
                  <Image
                    src="/placeholder.svg?height=168&width=168"
                    alt="News 2"
                    width={168}
                    height={168}
                    className="w-[120px] h-[120px] md:w-[168px] md:h-[168px] object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex justify-between items-start text-xs md:text-sm">
                      <span className="text-[#3e5880] font-normal">Penulis Tamu</span>
                      <span className="text-[#3e5880] font-normal tracking-tight">08/06/2025</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="text-[#143051] text-lg md:text-xl font-bold tracking-tight line-clamp-2">
                        Pembangunan Jalan Desa Tahap II Dimulai
                      </h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#3e5880] text-sm font-normal">Pemerintah Desa</span>
                    </div>
                  </div>
                </div>

                {/* Article 3 */}
                <div className="flex gap-5">
                  <Image
                    src="/placeholder.svg?height=168&width=168"
                    alt="News 3"
                    width={168}
                    height={168}
                    className="w-[120px] h-[120px] md:w-[168px] md:h-[168px] object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex justify-between items-start text-xs md:text-sm">
                      <span className="text-[#3e5880] font-normal">Penulis Tamu</span>
                      <span className="text-[#3e5880] font-normal tracking-tight">05/06/2025</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 className="text-[#143051] text-lg md:text-xl font-bold tracking-tight line-clamp-2">
                        Workshop Kerajinan Bambu untuk Ibu PKK
                      </h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#3e5880] text-sm font-normal">Tim PKK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Grid Articles */}
            <div className="flex flex-col gap-7">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Article 1 */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-4">
                    <div className="relative w-full h-[210px]">
                      <Image
                        src="/placeholder.svg?height=210&width=364"
                        alt="News Article"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">Penulis Tamu</span>
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">03/06/2025</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-[#143051] text-xl font-bold tracking-tight">Program Bantuan Bibit Unggul</h4>
                    <p className="text-[#143051] text-base font-normal">
                      Desa Kenteng menerima bantuan bibit padi unggul dari pemerintah kabupaten untuk meningkatkan produktivitas pertanian
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-[#3e5880] text-sm font-normal">Dinas Pertanian</span>
                    </div>
                  </div>
                </div>

                {/* Article 2 */}
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-[210px]">
                    <Image
                      src="/placeholder.svg?height=210&width=364"
                      alt="Featured Article"
                      fill
                      className="object-cover rounded-2xl"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 bg-[#143051] rounded-sm"></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">Essay</span>
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">01/06/2025</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-[#143051] text-xl font-bold tracking-tight">Gotong Royong: Kekuatan Membangun Desa</h4>
                    <div className="flex items-center gap-4">
                      <span className="text-[#3e5880] text-sm font-normal">5 menit baca</span>
                    </div>
                  </div>
                </div>

                {/* Article 3 */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-4">
                    <div className="relative w-full h-[210px]">
                      <Image
                        src="/placeholder.svg?height=210&width=364"
                        alt="News Article"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">Penulis Tamu</span>
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">30/05/2025</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-[#143051] text-xl font-bold tracking-tight">Launching Website Desa Terbaru</h4>
                    <p className="text-[#143051] text-base font-normal">
                      Desa Kenteng resmi meluncurkan website baru untuk meningkatkan transparansi dan pelayanan kepada masyarakat
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-[#3e5880] text-sm font-normal">Tim IT Desa</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Article 4 */}
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-[210px]">
                    <Image
                      src="/placeholder.svg?height=210&width=364"
                      alt="Featured Article"
                      fill
                      className="object-cover rounded-2xl"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 bg-[#143051] rounded-sm"></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">Essay</span>
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">28/05/2025</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-[#143051] text-xl font-bold tracking-tight">Mempertahankan Tradisi di Era Digital</h4>
                    <div className="flex items-center gap-4">
                      <span className="text-[#3e5880] text-sm font-normal">7 menit baca</span>
                    </div>
                  </div>
                </div>

                {/* Article 5 */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-4">
                    <div className="relative w-full h-[210px]">
                      <Image
                        src="/placeholder.svg?height=210&width=364"
                        alt="News Article"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">Penulis Tamu</span>
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">25/05/2025</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-[#143051] text-xl font-bold tracking-tight">Pelatihan UMKM Digital</h4>
                    <p className="text-[#143051] text-base font-normal">
                      Pelaku UMKM di Desa Kenteng mendapat pelatihan pemasaran digital untuk meningkatkan penjualan produk lokal
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-[#3e5880] text-sm font-normal">Dinas Koperasi</span>
                    </div>
                  </div>
                </div>

                {/* Article 6 */}
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-[210px]">
                    <Image
                      src="/placeholder.svg?height=210&width=364"
                      alt="Featured Article"
                      fill
                      className="object-cover rounded-2xl"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 bg-[#143051] rounded-sm"></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">Essay</span>
                      <span className="text-[#3e5880] text-sm font-normal tracking-tight">22/05/2025</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-[#143051] text-xl font-bold tracking-tight">Wisata Berkelanjutan: Masa Depan Desa</h4>
                    <div className="flex items-center gap-4">
                      <span className="text-[#3e5880] text-sm font-normal">8 menit baca</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <CTAButton href="/berita">
                Baca Berita Lainnya
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}