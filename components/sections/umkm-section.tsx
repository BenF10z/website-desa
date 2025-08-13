import UmkmCard from "@/components/ui/umkm-card"

export default function UmkmSection() {
  const umkmData = [
    {
      title: "Kerajinan Bambu",
      description: "Produk kerajinan bambu berkualitas tinggi dengan desain tradisional dan modern untuk berbagai kebutuhan.",
      imageUrl: "/placeholder.svg?height=236&width=379"
    },
    {
      title: "Kopi Organik",
      description: "Kopi arabika premium yang ditanam secara organik di dataran tinggi dengan cita rasa yang khas.",
      imageUrl: "/placeholder.svg?height=236&width=379"
    },
    {
      title: "Makanan Olahan",
      description: "Berbagai makanan olahan tradisional dari bahan-bahan segar hasil pertanian lokal yang berkualitas.",
      imageUrl: "/placeholder.svg?height=236&width=379"
    },
    {
      title: "Produk Herbal",
      description: "Jamu dan produk herbal alami dari tanaman obat tradisional yang tumbuh subur di desa.",
      imageUrl: "/placeholder.svg?height=236&width=379"
    },
    {
      title: "Tekstil Tenun",
      description: "Kain tenun tradisional dengan motif khas daerah yang dibuat dengan teknik turun temurun.",
      imageUrl: "/placeholder.svg?height=236&width=379"
    },
    {
      title: "Madu Hutan",
      description: "Madu murni dari lebah hutan yang diambil secara tradisional dengan kualitas terjaga.",
      imageUrl: "/placeholder.svg?height=236&width=379"
    },
    {
      title: "Keripik Singkong",
      description: "Keripik singkong renyah dengan berbagai varian rasa yang diproduksi secara higienis.",
      imageUrl: "/placeholder.svg?height=236&width=379"
    },
    {
      title: "Gula Aren",
      description: "Gula aren murni hasil sadapan pohon aren yang diolah secara tradisional tanpa bahan kimia.",
      imageUrl: "/placeholder.svg?height=236&width=379"
    }
  ]

  return (
    <section className="w-full px-4 bg-[#F5F5F5] md:px-8 lg:px-[120px] py-[60px] flex flex-col justify-start items-center gap-16">
      <div className="w-full flex flex-col justify-start items-center gap-12">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
            Umkm
          </div>
          <div className="text-[#041b06] text-2xl md:text-3xl lg:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
            UMKM Desa Kenteng
          </div>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {umkmData.map((umkm, index) => (
            <UmkmCard
              key={index}
              title={umkm.title}
              description={umkm.description}
              imageUrl={umkm.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}