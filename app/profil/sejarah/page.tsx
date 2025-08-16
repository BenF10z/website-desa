import Image from "next/image"

export default function SejarahDesa() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Mirip BUMDes */}
      <section className="relative w-full h-[276px] z-10">
        <div className="absolute inset-0 bg-[#7e8e7e]" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi'] text-center">
            Sejarah Desa
          </h1>
        </div>
      </section>

      {/* Content Section - Mirip About Section */}
      <section className="w-full px-4 md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
        {/* Awal Mula Desa */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
          <Image
            src="/placeholder.svg?height=343&width=491"
            alt="Sejarah Awal Desa Kenteng"
            width={491}
            height={343}
            className="w-full max-w-[491px] h-[250px] md:h-[343px] lg:w-[491px] lg:h-[343px] rounded-2xl object-cover"
          />
          <div className="flex-1 flex flex-col justify-center items-start gap-6 md:gap-8">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
                sejarah
              </div>
              <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider">
                Awal Mula Desa Kenteng
              </div>
            </div>
            <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
              Desa Kenteng didirikan pada tahun 1945 oleh sekelompok pendatang yang mencari tanah subur untuk bercocok tanam. Nama "Kenteng" berasal dari bahasa Jawa yang berarti "tempat yang tenang dan damai".<br/><br/>
              Para pendiri desa ini adalah petani dan peternak yang berasal dari berbagai daerah di Jawa Tengah. Mereka terpesona dengan keindahan alam pegunungan dan tanah yang subur di kawasan ini. Dengan semangat gotong royong, mereka mulai membuka lahan dan membangun pemukiman pertama.
            </div>
          </div>
        </div>

        {/* Perkembangan Desa */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
          <div className="flex-1 flex flex-col justify-center items-start gap-6 md:gap-8 order-2 lg:order-1">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
                perkembangan
              </div>
              <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider">
                Era Kemerdekaan hingga Modern
              </div>
            </div>
            <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
              Pasca kemerdekaan Indonesia, Desa Kenteng terus mengalami perkembangan pesat. Pada tahun 1960-an, desa ini mulai dikenal sebagai penghasil beras berkualitas tinggi. Irigasi tradisional dan teknik bercocok tanam turun temurun menjadi kekuatan utama.<br/><br/>
              Memasuki era 1980-an, desa mulai mengembangkan sektor pariwisata. Keindahan alam pegunungan, udara sejuk, dan kearifan lokal yang masih terjaga menarik wisatawan dari berbagai daerah. Homestay pertama didirikan pada tahun 1995 oleh keluarga Pak Suroto.
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=343&width=491"
            alt="Perkembangan Desa Kenteng"
            width={491}
            height={343}
            className="w-full max-w-[491px] h-[250px] md:h-[343px] lg:w-[491px] lg:h-[343px] rounded-2xl object-cover order-1 lg:order-2"
          />
        </div>

        {/* Masa Kini */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20">
          <Image
            src="/placeholder.svg?height=343&width=491"
            alt="Desa Kenteng Masa Kini"
            width={491}
            height={343}
            className="w-full max-w-[491px] h-[250px] md:h-[343px] lg:w-[491px] lg:h-[343px] rounded-2xl object-cover"
          />
          <div className="flex-1 flex flex-col justify-center items-start gap-6 md:gap-8">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
                masa kini
              </div>
              <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider">
                Desa Wisata Modern
              </div>
            </div>
            <div className="text-[#1a1a1a] text-sm md:text-base font-normal font-['Satoshi'] tracking-tight leading-relaxed">
              Saat ini, Desa Kenteng telah berkembang menjadi destinasi wisata unggulan dengan tetap mempertahankan nilai-nilai tradisional. BUMDes yang didirikan pada tahun 2018 menjadi motor penggerak ekonomi desa.<br/><br/>
              Dengan populasi sekitar 2.500 jiwa yang tersebar di 4 dusun, desa ini terus berinovasi dalam sektor pertanian organik, wisata alam, dan industri kreatif. Digital village dan website resmi diluncurkan pada tahun 2024 untuk meningkatkan transparansi dan pelayanan kepada masyarakat.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}