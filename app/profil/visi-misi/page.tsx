import Image from "next/image"

export default function VisiMisi() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Mirip BUMDes */}
      <section className="relative w-full h-[276px] z-10">
        <div className="absolute inset-0 bg-[#7e8e7e]" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi'] text-center">
            Visi & Misi
          </h1>
        </div>
      </section>

      {/* Content Section - Mirip About Section */}
      <section className="w-full px-4 md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
        {/* Visi Desa */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
          <Image
            src="/placeholder.svg?height=343&width=491"
            alt="Visi Desa Kenteng"
            width={491}
            height={343}
            className="w-full max-w-[491px] h-[250px] md:h-[343px] lg:w-[491px] lg:h-[343px] rounded-2xl object-cover"
          />
          <div className="flex-1 flex flex-col justify-center items-start gap-6 md:gap-8">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
                visi
              </div>
              <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider">
                Cita-Cita Desa Kenteng
              </div>
            </div>
            <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
              <div className="bg-[#f8f9fa] p-6 rounded-2xl border-l-4 border-[#6e7869] mb-4">
                <p className="text-[#043c09] text-lg md:text-xl font-semibold font-['Satoshi'] italic leading-relaxed">
                  "Menjadi desa wisata yang berkelanjutan, mandiri, dan sejahtera dengan tetap melestarikan nilai-nilai budaya lokal dan kelestarian lingkungan"
                </p>
              </div>
              Visi ini mencerminkan komitmen Desa Kenteng untuk berkembang sebagai destinasi wisata yang tidak hanya menarik secara ekonomi, tetapi juga bertanggung jawab terhadap lingkungan dan warisan budaya. Kami percaya bahwa kemajuan harus seimbang dengan pelestarian alam dan tradisi.
            </div>
          </div>
        </div>

        {/* Misi Desa */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
          <div className="flex-1 flex flex-col justify-center items-start gap-6 md:gap-8 order-2 lg:order-1">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
                misi
              </div>
              <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider">
                Langkah Strategis Kami
              </div>
            </div>
            <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#6e7869] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Mengembangkan potensi wisata alam dan budaya</strong> melalui program-program inovatif yang melibatkan seluruh masyarakat</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#6e7869] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Meningkatkan kesejahteraan masyarakat</strong> dengan membuka lapangan kerja dan mengembangkan UMKM lokal</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#6e7869] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Melestarikan lingkungan hidup</strong> dengan menerapkan praktik pertanian organik dan pariwisata ramah lingkungan</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#6e7869] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Memberdayakan ekonomi kreatif lokal</strong> melalui pengembangan kerajinan tradisional dan produk unggulan desa</p>
                </div>
              </div>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=343&width=491"
            alt="Misi Desa Kenteng"
            width={491}
            height={343}
            className="w-full max-w-[491px] h-[250px] md:h-[343px] lg:w-[491px] lg:h-[343px] rounded-2xl object-cover order-1 lg:order-2"
          />
        </div>

        {/* Nilai-Nilai Desa */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
          <Image
            src="/placeholder.svg?height=343&width=491"
            alt="Nilai-Nilai Desa Kenteng"
            width={491}
            height={343}
            className="w-full max-w-[491px] h-[250px] md:h-[343px] lg:w-[491px] lg:h-[343px] rounded-2xl object-cover"
          />
          <div className="flex-1 flex flex-col justify-center items-start gap-6 md:gap-8">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
                nilai-nilai
              </div>
              <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider">
                Prinsip Hidup Bersama
              </div>
            </div>
            <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f8f9fa] p-4 rounded-xl text-center">
                  <div className="text-[#043c09] font-bold text-lg mb-2">Gotong Royong</div>
                  <p className="text-sm">Semangat kerja sama dalam setiap kegiatan</p>
                </div>
                <div className="bg-[#f8f9fa] p-4 rounded-xl text-center">
                  <div className="text-[#043c09] font-bold text-lg mb-2">Kearifan Lokal</div>
                  <p className="text-sm">Melestarikan budaya dan tradisi nenek moyang</p>
                </div>
                <div className="bg-[#f8f9fa] p-4 rounded-xl text-center">
                  <div className="text-[#043c09] font-bold text-lg mb-2">Inovasi</div>
                  <p className="text-sm">Terbuka terhadap perubahan dan teknologi baru</p>
                </div>
                <div className="bg-[#f8f9fa] p-4 rounded-xl text-center">
                  <div className="text-[#043c09] font-bold text-lg mb-2">Berkelanjutan</div>
                  <p className="text-sm">Memperhatikan generasi mendatang</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}