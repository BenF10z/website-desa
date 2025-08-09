import Image from "next/image"
import NewsCard from "@/components/ui/news-card"
import FeaturedNewsCard from "@/components/ui/featured-news-card"

export default function BeritaDesa() {
  // Data berita untuk demo
  const featuredNews = {
    title: "Festival Budaya Desa Kenteng 2025 Sukses Digelar",
    description: "Masyarakat Desa Kenteng kembali menggelar festival budaya tahunan yang menampilkan berbagai kesenian tradisional dan kuliner khas daerah dengan antusiasme tinggi dari pengunjung.",
    author: "Tim Redaksi Desa",
    date: "15/12/2024",
    imageUrl: "/placeholder.svg?height=659&width=1440",
    slug: "festival-budaya-desa-kenteng-2025"
  }

  const newsData = [
    {
      title: "Program Pelatihan Digital untuk UMKM Desa",
      description: "Desa Kenteng meluncurkan program pelatihan digital marketing untuk pelaku UMKM guna meningkatkan daya saing di era digital.",
      author: "Penulis Tamu",
      date: "12/12/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      slug: "program-pelatihan-digital-umkm"
    },
    {
      title: "Gotong Royong Membangun Infrastruktur Desa",
      readTime: "6 menit",
      author: "Tim PKK",
      date: "10/12/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      isEssay: true,
      slug: "gotong-royong-infrastruktur-desa"
    },
    {
      title: "Panen Raya Padi Organik Semester Kedua",
      description: "Petani desa merayakan panen raya padi organik dengan hasil yang memuaskan berkat penerapan teknologi pertanian modern.",
      author: "Kelompok Tani",
      date: "08/12/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      slug: "panen-raya-padi-organik"
    },
    {
      title: "Workshop Kerajinan Bambu untuk Ibu-Ibu PKK",
      readTime: "5 menit",
      author: "Tim Redaksi",
      date: "06/12/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      isEssay: true,
      slug: "workshop-kerajinan-bambu-pkk"
    },
    {
      title: "Pembangunan Jalan Desa Tahap II Dimulai",
      description: "Pemerintah desa memulai pembangunan jalan tahap kedua untuk meningkatkan akses transportasi menuju area wisata.",
      author: "Pemerintah Desa",
      date: "04/12/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      slug: "pembangunan-jalan-tahap-ii"
    },
    {
      title: "Launching Website Desa yang Lebih Modern",
      readTime: "4 menit",
      author: "Tim IT Desa",
      date: "02/12/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      isEssay: true,
      slug: "launching-website-desa-modern"
    },
    {
      title: "Program Bantuan Bibit Unggul untuk Petani",
      description: "Desa Kenteng menerima bantuan bibit padi unggul dari pemerintah kabupaten untuk meningkatkan produktivitas pertanian.",
      author: "Dinas Pertanian",
      date: "30/11/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      slug: "program-bantuan-bibit-unggul"
    },
    {
      title: "Pelatihan Kewirausahaan untuk Pemuda Desa",
      readTime: "7 menit",
      author: "Karang Taruna",
      date: "28/11/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      isEssay: true,
      slug: "pelatihan-kewirausahaan-pemuda"
    },
    {
      title: "Sosialisasi Program Kesehatan Desa",
      description: "Puskesmas setempat mengadakan sosialisasi program kesehatan untuk meningkatkan kesadaran masyarakat akan pentingnya hidup sehat.",
      author: "Puskesmas Desa",
      date: "26/11/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      slug: "sosialisasi-program-kesehatan"
    },
    {
      title: "Lomba Inovasi Desa Tingkat Kabupaten",
      readTime: "6 menit",
      author: "Tim Inovasi",
      date: "24/11/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      isEssay: true,
      slug: "lomba-inovasi-desa"
    },
    {
      title: "Wisata Edukasi Pertanian untuk Siswa",
      description: "Desa Kenteng menjadi tujuan wisata edukasi bagi siswa sekolah untuk belajar tentang pertanian organik dan konservasi lingkungan.",
      author: "Dinas Pendidikan",
      date: "22/11/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      slug: "wisata-edukasi-pertanian"
    },
    {
      title: "Mempertahankan Tradisi di Era Digital",
      readTime: "8 menit",
      author: "Budayawan Desa",
      date: "20/11/2024",
      imageUrl: "/placeholder.svg?height=210&width=364",
      isEssay: true,
      slug: "mempertahankan-tradisi-era-digital"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full h-[276px] relative">
        <div className="w-full h-[276px] absolute bg-[#7e8e7e]" />
        <Image
          src="https://picsum.photos/id/237/1440/276"
          alt="Berita Desa Header"
          fill
          className="object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi']">
            Berita Desa
          </h1>
        </div>
      </div>

      {/* Featured Article Section */}
      <FeaturedNewsCard
        title={featuredNews.title}
        description={featuredNews.description}
        imageUrl={featuredNews.imageUrl}
        slug={featuredNews.slug}
      />

      {/* News Grid Section */}
      <div className="w-full px-4 md:px-[120px] py-[60px] flex flex-col justify-start items-center gap-12">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-[#6e7869] text-sm font-bold font-['Satoshi'] uppercase tracking-[4.20px]">
            Berita
          </div>
          <div className="text-[#1a1a1a] text-2xl md:text-4xl font-bold font-['Satoshi'] tracking-wider text-center">
            Berita Terbaru Desa Kenteng
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-8">
          {/* Grid Layout - Responsive */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((news, index) => (
              <NewsCard
                key={index}
                title={news.title}
                description={news.description}
                author={news.author}
                date={news.date}
                imageUrl={news.imageUrl}
                readTime={news.readTime}
                isEssay={news.isEssay}
                slug={news.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}