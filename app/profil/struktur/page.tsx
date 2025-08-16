import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StrukturOrganisasi() {
  const strukturDesa = [
    {
      jabatan: "Kepala Desa",
      nama: "Bapak Sutrisno, S.Sos",
      periode: "2024-2030",
      foto: "/placeholder.svg?height=200&width=200",
      pendidikan: "S1 Sosiologi",
      pengalaman: "Mantan Sekretaris Desa (2018-2024)"
    },
    {
      jabatan: "Sekretaris Desa",
      nama: "Ibu Siti Nurjanah, S.AP",
      periode: "2024-2030",
      foto: "/placeholder.svg?height=200&width=200",
      pendidikan: "S1 Administrasi Publik",
      pengalaman: "PNS Golongan III/c"
    },
    {
      jabatan: "Bendahara Desa",
      nama: "Bapak Ahmad Fauzi, S.E",
      periode: "2024-2030",
      foto: "/placeholder.svg?height=200&width=200",
      pendidikan: "S1 Ekonomi",
      pengalaman: "Mantan Staff Keuangan Kecamatan"
    }
  ]

  const kepalaDusun = [
    {
      dusun: "Dusun Krajan",
      nama: "Bapak Haryono",
      foto: "/placeholder.svg?height=150&width=150"
    },
    {
      dusun: "Dusun Sumber",
      nama: "Bapak Wagiman", 
      foto: "/placeholder.svg?height=150&width=150"
    },
    {
      dusun: "Dusun Gunung",
      nama: "Bapak Sumarno",
      foto: "/placeholder.svg?height=150&width=150"
    },
    {
      dusun: "Dusun Sawah",
      nama: "Ibu Marinem",
      foto: "/placeholder.svg?height=150&width=150"
    }
  ]

  const lembagaDesa = [
    {
      lembaga: "BPD (Badan Permusyawaratan Desa)",
      ketua: "Bapak Sugeng Riyadi",
      anggota: "9 orang",
      fungsi: "Fungsi legislatif dan pengawasan pemerintahan desa"
    },
    {
      lembaga: "LPM (Lembaga Pemberdayaan Masyarakat)", 
      ketua: "Ibu Endang Sulistyowati",
      anggota: "7 orang",
      fungsi: "Pemberdayaan masyarakat dan penggerak swadaya"
    },
    {
      lembaga: "PKK (Pemberdayaan Kesejahteraan Keluarga)",
      ketua: "Ibu Sri Wahyuni",
      anggota: "15 orang", 
      fungsi: "Pemberdayaan perempuan dan kesejahteraan keluarga"
    },
    {
      lembaga: "Karang Taruna",
      ketua: "Sdr. Rizki Pratama",
      anggota: "25 orang",
      fungsi: "Pemberdayaan pemuda dan kegiatan sosial"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Mirip BUMDes */}
      <section className="relative w-full h-[276px] z-10">
        <div className="absolute inset-0 bg-[#7e8e7e]" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi'] text-center">
            Struktur Organisasi
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full px-4 md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
        
        {/* Pimpinan Desa */}
        <div className="w-full flex flex-col justify-start items-center gap-12">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
              pimpinan
            </div>
            <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
              Pimpinan Pemerintahan Desa
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strukturDesa.map((pejabat, index) => (
              <Card key={index} className="border-[#6e7869]/20 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={pejabat.foto}
                      alt={pejabat.nama}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <CardTitle className="text-[#043c09] text-lg font-bold font-['Satoshi']">
                    {pejabat.jabatan}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <h3 className="text-[#1a1a1a] font-semibold text-base">
                    {pejabat.nama}
                  </h3>
                  <p className="text-[#6e7869] text-sm">
                    Periode: {pejabat.periode}
                  </p>
                  <p className="text-[#1a1a1a] text-sm">
                    {pejabat.pendidikan}
                  </p>
                  <p className="text-[#1a1a1a] text-xs">
                    {pejabat.pengalaman}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Kepala Dusun */}
        <div className="w-full flex flex-col justify-start items-center gap-12">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
              dusun
            </div>
            <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
              Kepala Dusun
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kepalaDusun.map((kadus, index) => (
              <Card key={index} className="border-[#6e7869]/20 hover:shadow-md transition-shadow duration-300">
                <CardHeader className="text-center pb-2">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <Image
                      src={kadus.foto}
                      alt={kadus.nama}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <CardTitle className="text-[#043c09] text-base font-bold font-['Satoshi']">
                    {kadus.dusun}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="text-[#1a1a1a] font-semibold text-sm">
                    {kadus.nama}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Lembaga Desa */}
        <div className="w-full flex flex-col justify-start items-center gap-12">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
              lembaga
            </div>
            <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
              Lembaga Kemasyarakatan
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            {lembagaDesa.map((lembaga, index) => (
              <Card key={index} className="border-[#6e7869]/20 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-[#043c09] text-lg font-bold font-['Satoshi']">
                    {lembaga.lembaga}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6e7869] font-medium text-sm">Ketua:</span>
                    <span className="text-[#1a1a1a] font-semibold text-sm">{lembaga.ketua}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6e7869] font-medium text-sm">Jumlah Anggota:</span>
                    <span className="text-[#1a1a1a] font-semibold text-sm">{lembaga.anggota}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[#1a1a1a] text-sm leading-relaxed">
                      {lembaga.fungsi}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bagan Organisasi */}
        <div className="w-full flex flex-col justify-start items-center gap-8">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
              bagan
            </div>
            <div className="text-[#043c09] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
              Struktur Organisasi Pemerintahan Desa
            </div>
          </div>
          
          <div className="w-full max-w-4xl">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Bagan Struktur Organisasi Desa Kenteng"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}