import Image from "next/image"
import CTAButton from "@/components/ui/cta-button"

export default function AboutSection() {
  return (
    <div className="py-12 md:py-20 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          {/* About Kenteng Village */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
            <Image
              src="/images/camp.jpg"
              alt="Camp"
              width={491}
              height={343}
              className="w-full max-w-[491px] h-[250px] md:h-[343px] lg:w-[491px] lg:h-[343px] rounded-2xl object-cover"
            />
            <div className="flex-1 flex flex-col justify-center items-start gap-6 md:gap-8">
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">Tentang</div>
                <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider">Tentang Desa Kenteng</div>
              </div>
                <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
                Tersembunyi di dataran tinggi berkabut Jawa Tengah, Kenteng bukan sekadar desa — ini adalah detak kehidupan. Tempat di mana pagi dimulai dengan aroma kayu bakar dan kokok ayam yang menggema di lembah. Anak-anak berlarian tanpa alas kaki di sawah, dan para sesepuh berbagi cerita di bawah rindangnya pohon pisang.<br/><br/>
                Di sini, waktu tidak terburu-buru — ia mengalir dengan lembut.<br/>
                Anda akan mendengar tawa riang. Melihat tangan-tangan renta membuat anyaman dari ingatan, bukan dari buku panduan. Mencicipi hidangan yang membawa tradisi turun-temurun di setiap suapan. Merasakan irama desa yang bergerak bukan oleh jam, melainkan oleh kebersamaan.
                </div>
            </div>
          </div>

          {/* Tradisi & Kehidupan */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-20">
            <div className="flex-1 flex flex-col justify-center items-start gap-12 md:gap-20 order-2 lg:order-1 lg:h-[280px] md:lg:h-[452px] lg:lg:h-[489px]">
                <div className="w-full lg:max-w-[491px] text-[#1e1e1e] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
                Anda tidak sekadar mengunjungi Kenteng — Anda melangkah ke dalam cara hidup yang lebih lambat dan lembut.<br/>
                Di sini, pagi dimulai dengan kicau burung dan aroma kayu bakar yang menguar di perbukitan. Orang asing akan melambaikan tangan dari beranda rumah mereka. Setiap hidangan dinikmati bersama, setiap senyuman tulus, dan keheningan tak pernah canggung — hanya terasa damai.<br/><br/>
                Anda mungkin akan belajar menumbuk rempah bersama nenek setempat, tangan Anda menguning karena kunyit segar. Momen-momen seperti ini bukanlah rekayasa — melainkan ketulusan yang ditawarkan. Dan jika Anda tinggal cukup lama, Anda akan menyadari sesuatu yang indah:<br/><br/>
                Di sinilah para pelancong menjadi tamu, tamu menjadi sahabat, dan sahabat akan selalu kembali lagi dan lagi.
                </div>
              <div className="w-full lg:max-w-[491px]">
                <CTAButton href="/profil/sejarah" variant="primary" size="default">
                  Lihat Selengkapnya
                </CTAButton>
              </div>
            </div>
            <Image
              src="/images/village-landscape.jpg"
              alt="Kenteng Village Activities"
              width={647}
              height={452}
              className="w-full max-w-[800px] h-[280px] md:h-[452px] lg:w-[800px] lg:h-[489px] rounded-2xl object-cover order-1 lg:order-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}