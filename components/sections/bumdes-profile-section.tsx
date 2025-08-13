import Image from "next/image"

export default function BumdesProfileSection() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
      {/* First Row */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
        <div className="flex-1 lg:max-w-[445px]">
          <Image
            src="/placeholder.svg?height=311&width=445"
            alt="BUMDes Kenteng"
            width={445}
            height={311}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
        <div className="w-full lg:w-[675px] flex flex-col justify-center items-start gap-8">
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
              bumdes
            </div>
            <div className="text-[#041b06] text-2xl md:text-3xl lg:text-4xl font-bold font-['Satoshi'] tracking-wider">
              Profil BUMDES Desa Kenteng
            </div>
          </div>
          <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
            BUMDes Kenteng Makmur didirikan pada tahun 2018 sebagai wadah untuk mengembangkan potensi ekonomi desa
            dan meningkatkan kesejahteraan masyarakat. Dengan modal awal dari dana desa dan partisipasi masyarakat,
            BUMDes ini telah berkembang menjadi motor penggerak ekonomi desa.
            <br/><br/>
            Saat ini, BUMDes Kenteng Makmur mengelola berbagai unit usaha yang meliputi perdagangan, jasa, dan
            industri pengolahan hasil pertanian. Semua keuntungan yang diperoleh dikembalikan untuk pembangunan desa
            dan kesejahteraan masyarakat demi masa depan yang lebih baik.
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
        <div className="w-full lg:w-[677px] flex flex-col justify-center items-start gap-8 lg:gap-20 order-2 lg:order-1">
          <div className="text-[#1e1e1e] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
            Visi kami adalah menjadikan BUMDes sebagai pilar utama perekonomian desa yang berkelanjutan dan berdaya saing.
            Melalui inovasi dan kolaborasi, kami berkomitmen untuk menciptakan lapangan kerja bagi masyarakat lokal.
            <br/><br/>
            Setiap unit usaha yang kami kelola tidak hanya bertujuan untuk mencari keuntungan, tetapi juga untuk 
            memberdayakan masyarakat dan melestarikan kearifan lokal. Kami percaya bahwa dengan semangat gotong royong
            dan kerja keras, BUMDes Kenteng Makmur akan terus tumbuh dan berkembang.
            <br/><br/>
            Mari bergabung bersama kami dalam membangun ekonomi desa yang kuat dan berkelanjutan.
          </div>
        </div>
        <div className="flex-1 lg:max-w-[443px] order-1 lg:order-2">
          <Image
            src="/placeholder.svg?height=309&width=443"
            alt="BUMDes Activities"
            width={443}
            height={309}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}