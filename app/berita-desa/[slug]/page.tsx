import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, Link as LinkIcon, Instagram, Twitter, Share2 } from "lucide-react"
import NewsCard from "@/components/ui/news-card"

// Mock data for news articles
const getAllNews = () => [
  {
    slug: "festival-budaya-desa-kenteng-2025",
    title: "Festival Budaya Desa Kenteng 2025 Sukses Digelar",
    subtitle: "Masyarakat Desa Kenteng kembali menggelar festival budaya tahunan yang menampilkan berbagai kesenian tradisional dan kuliner khas daerah dengan antusiasme tinggi dari pengunjung.",
    author: "Tim Redaksi Desa",
    date: "15/12/2024",
    readTime: "8 menit",
    category: "Budaya",
    imageUrl: "/placeholder.svg?height=400&width=800",
    content: `Festival Budaya Desa Kenteng 2025 telah berhasil diselenggarakan dengan meriah pada tanggal 12-14 Desember 2024. Acara yang berlangsung selama tiga hari ini menampilkan berbagai kesenian tradisional, pameran produk lokal, dan kuliner khas daerah yang menarik ribuan pengunjung dari berbagai wilayah.

Kepala Desa Kenteng, Bapak Sumarno, mengungkapkan rasa bangganya atas antusiasme masyarakat dalam menyukseskan festival ini. "Festival ini bukan hanya ajang hiburan, tetapi juga wadah untuk melestarikan budaya lokal dan meningkatkan perekonomian masyarakat," ujarnya.

Berbagai pertunjukan seni tradisional seperti tari Jathilan, wayang kulit, dan musik gamelan menjadi daya tarik utama festival. Selain itu, pameran produk UMKM lokal juga mendapat respon positif dari pengunjung dengan total penjualan mencapai Rp 500 juta selama tiga hari.

Festival ini juga menjadi ajang promosi wisata desa, dengan paket wisata budaya yang menawarkan pengalaman menginap di homestay, belajar kerajinan tradisional, dan menikmati kuliner autentik. "Kami berharap festival ini dapat memperkenalkan potensi wisata budaya Desa Kenteng kepada masyarakat luas," tambah Ketua Pokdarwis Desa Kenteng.

Untuk tahun depan, penyelenggara berencana mengembangkan festival dengan menghadirkan lebih banyak seniman dan pelaku UMKM dari daerah sekitar, serta menambah wahana edukasi budaya untuk anak-anak.`,
    bioAuthor: "Tim Redaksi Desa adalah tim yang terdiri dari para jurnalis lokal dan aktivis komunitas yang berdedikasi untuk mengangkat cerita-cerita inspiratif dari Desa Kenteng. Dengan pengalaman lebih dari 5 tahun di bidang jurnalisme komunitas, tim ini berkomitmen untuk menyajikan informasi yang akurat dan bermanfaat bagi masyarakat."
  },
  {
    slug: "program-pelatihan-digital-umkm",
    title: "Program Pelatihan Digital untuk UMKM Desa",
    subtitle: "Desa Kenteng meluncurkan program pelatihan digital marketing untuk pelaku UMKM guna meningkatkan daya saing di era digital.",
    author: "Penulis Tamu",
    date: "12/12/2024",
    readTime: "6 menit",
    category: "Ekonomi",
    imageUrl: "/placeholder.svg?height=400&width=800",
    content: `Program pelatihan digital marketing untuk pelaku UMKM di Desa Kenteng telah dimulai dengan antusiasme tinggi dari para peserta. Program ini merupakan kerjasama antara pemerintah desa dengan Dinas Koperasi dan UMKM Kabupaten.

Pelatihan yang berlangsung selama tiga hari ini diikuti oleh 50 pelaku UMKM dari berbagai sektor, mulai dari kerajinan tangan, kuliner, hingga produk pertanian organik. Materi yang diberikan meliputi penggunaan media sosial untuk pemasaran, pembuatan konten digital yang menarik, dan strategi penjualan online.

"Kami sangat antusias mengikuti pelatihan ini karena selama ini kami masih mengandalkan pemasaran konvensional," ujar Siti Nurhaliza, pelaku UMKM kerajinan bambu. "Dengan pelatihan ini, kami berharap bisa menjangkau pasar yang lebih luas."

Instruktur pelatihan, Bapak Ahmad Fauzi dari Dinas Koperasi, menjelaskan bahwa era digital memberikan peluang besar bagi UMKM untuk berkembang. "Kunci sukses UMKM di era digital adalah konsistensi dalam menggunakan platform digital dan kemampuan untuk beradaptasi dengan perubahan teknologi," jelasnya.

Setelah pelatihan, peserta akan mendapat pendampingan selama tiga bulan untuk memastikan implementasi ilmu yang telah didapat berjalan dengan baik.`,
    bioAuthor: "Penulis Tamu adalah kontributor yang memiliki keahlian khusus di bidang ekonomi digital dan pemberdayaan UMKM."
  },
  {
    slug: "gotong-royong-infrastruktur-desa",
    title: "Gotong Royong Membangun Infrastruktur Desa",
    subtitle: "Masyarakat desa bergotong royong membangun infrastruktur untuk meningkatkan kualitas hidup bersama.",
    author: "Tim PKK",
    date: "10/12/2024",
    readTime: "6 menit",
    category: "Pembangunan",
    imageUrl: "/placeholder.svg?height=400&width=800",
    content: `Semangat gotong royong masyarakat Desa Kenteng kembali terpancar dalam kegiatan pembangunan infrastruktur desa yang dilaksanakan secara swadaya. Kegiatan ini melibatkan seluruh elemen masyarakat mulai dari pemuda, ibu-ibu PKK, hingga tokoh masyarakat.

Pembangunan yang dilakukan meliputi perbaikan jalan desa, pembuatan saluran drainase, dan pembangunan pos ronda di beberapa titik strategis. "Kami yakin dengan bergotong royong, pembangunan desa akan lebih cepat terealisasi," ujar Kepala Desa Kenteng.

Kegiatan gotong royong ini tidak hanya tentang pembangunan fisik, tetapi juga mempererat tali silaturahmi antar warga. Setiap hari Minggu, warga berkumpul untuk melanjutkan proyek yang sedang dikerjakan.

Antusiasme warga sangat tinggi, bahkan anak-anak pun ikut membantu sesuai dengan kemampuan mereka. "Ini adalah warisan budaya yang harus kita lestarikan," tambah salah satu tokoh masyarakat.

Diharapkan dengan adanya infrastruktur yang baik, Desa Kenteng akan semakin maju dan menarik bagi wisatawan yang berkunjung.`,
    bioAuthor: "Tim PKK Desa Kenteng adalah organisasi yang aktif dalam pemberdayaan masyarakat dan pembangunan desa."
  },
  {
    slug: "panen-raya-padi-organik",
    title: "Panen Raya Padi Organik Semester Kedua",
    subtitle: "Petani desa merayakan panen raya padi organik dengan hasil yang memuaskan berkat penerapan teknologi pertanian modern.",
    author: "Kelompok Tani",
    date: "08/12/2024",
    readTime: "5 menit",
    category: "Pertanian",
    imageUrl: "/placeholder.svg?height=400&width=800",
    content: `Kelompok Tani Makmur Jaya Desa Kenteng berhasil meraih panen raya padi organik dengan hasil yang sangat memuaskan. Panen semester kedua tahun ini menghasilkan gabah berkualitas tinggi dengan produktivitas mencapai 7 ton per hektar.

Keberhasilan ini tidak lepas dari penerapan teknologi pertanian modern yang ramah lingkungan. Para petani menggunakan pupuk organik dan pestisida alami yang diproduksi sendiri dari limbah pertanian dan peternakan.

"Kami sangat bersyukur dengan hasil panen kali ini. Selain kuantitas yang meningkat, kualitas beras organik kami juga mendapat pengakuan dari konsumen," ungkap Bapak Sutrisno, ketua Kelompok Tani Makmur Jaya.

Padi organik hasil panen ini akan dipasarkan ke berbagai daerah dengan harga yang lebih tinggi dibanding beras konvensional. Hal ini tentu memberikan keuntungan lebih bagi para petani.

Rencana ke depan, kelompok tani akan memperluas area tanam organik dan mengembangkan varietas padi lokal yang memiliki nilai jual tinggi.`,
    bioAuthor: "Kelompok Tani Makmur Jaya adalah organisasi petani yang fokus pada pengembangan pertanian organik berkelanjutan."
  }
]

// Mock data for related news
const getRelatedNews = (currentSlug: string) => {
  const allNews = [
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
    }
  ]
  
  return allNews.filter(news => news.slug !== currentSlug).slice(0, 6)
}

interface NewsDetailPageProps {
  params: {
    slug: string
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const newsArticle = getAllNews().find(article => article.slug === params.slug)
  
  if (!newsArticle) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#143051] mb-4">Berita Tidak Ditemukan</h1>
          <Link 
            href="/berita-desa"
            className="text-[#6e7869] hover:text-[#143051] transition-colors duration-200"
          >
            Kembali ke Halaman Berita
          </Link>
        </div>
      </div>
    )
  }

  const relatedNews = getRelatedNews(params.slug)

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation */}
      <div className="w-full px-4 md:px-[120px] pt-24 pb-8">
        <Link 
          href="/berita-desa" 
          className="inline-flex items-center gap-2 text-[#143051] hover:text-[#6e7869] transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium font-['Satoshi']">Kembali ke Berita</span>
        </Link>
      </div>

      {/* Article Header - CENTERED LAYOUT */}
      <div className="w-full px-4 md:px-[120px] pb-8">
        <div className="max-w-5xl mx-auto"> {/* Centered dengan max-width yang lebih besar */}
          {/* Category and Reading Time */}
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-[#6e7869] text-white text-xs font-medium font-['Satoshi'] uppercase tracking-wider rounded-full">
              {newsArticle.category}
            </span>
            <span className="text-[#3e5880] text-sm font-normal font-['Satoshi']">
              {newsArticle.readTime} baca
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[#143051] text-3xl md:text-5xl font-bold font-['Satoshi'] tracking-wide leading-tight mb-4">
            {newsArticle.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[#143051] text-lg md:text-xl font-normal font-['Satoshi'] leading-relaxed mb-6">
            {newsArticle.subtitle}
          </p>

          {/* Author and Date */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6e7869] rounded-full flex items-center justify-center">
                <span className="text-white font-medium font-['Satoshi']">
                  {newsArticle.author.split(' ').map(word => word[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-[#143051] text-sm font-medium font-['Satoshi']">
                  {newsArticle.author}
                </div>
                <div className="text-[#3e5880] text-sm font-normal font-['Satoshi']">
                  {newsArticle.date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image - CENTERED LAYOUT */}
      <div className="w-full px-4 md:px-[120px] pb-12">
        <div className="max-w-5xl mx-auto"> {/* Centered dengan max-width yang sama */}
          <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={newsArticle.imageUrl}
              alt={newsArticle.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content Section */}
      <div className="w-full px-4 md:px-[120px] pt-[60px] pb-[50px] flex justify-center items-start">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-20">
          
          {/* Share Section */}
          <div className="w-full lg:w-auto flex lg:flex-col justify-center lg:justify-start items-start gap-3 order-2 lg:order-1">
            <div className="text-[#143051] text-sm font-medium font-['Satoshi'] mb-2 lg:mb-0">
              Share berita ini
            </div>
            <div className="flex lg:flex-col gap-3 lg:gap-2">
              <button className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors">
                <Mail className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Email</span>
              </button>
              <button className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors">
                <LinkIcon className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Copy Link</span>
              </button>
              <button className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors">
                <Instagram className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Instagram</span>
              </button>
              <button className="flex items-center gap-2.5 hover:text-[#6e7869] transition-colors">
                <Twitter className="w-4 h-4 text-[#143051]" />
                <span className="text-[#143051] text-sm font-normal font-['Satoshi'] hidden lg:block">Twitter</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-[648px] flex flex-col justify-start items-start gap-6 order-1 lg:order-2">
            {newsArticle.content.split('\n\n').map((paragraph, index) => (
              <div key={index} className="w-full flex flex-col justify-start items-start">
                <div className="w-full flex justify-start items-start gap-2.5">
                  <p className="flex-1 text-[#143051] text-base font-normal font-['Inter'] leading-relaxed">
                    {paragraph.trim()}
                  </p>
                </div>
              </div>
            ))}

            {/* Article Image */}
            <div className="w-full flex flex-col justify-end items-end gap-1">
              <div className="relative w-full h-[346px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=346&width=648"
                  alt={newsArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-[#3e5880] text-sm font-medium font-['Satoshi']">
                Dokumentasi {newsArticle.title}
              </div>
            </div>

            {/* Date */}
            <div className="w-full h-[19px] flex justify-end items-start">
              <div className="text-[#3e5880] text-base font-medium font-['Satoshi']">
                {newsArticle.date}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[361px] flex flex-col justify-center items-start gap-12 order-3">
            {/* Author Bio */}
            <div className="w-full flex flex-col justify-center items-center gap-2.5">
              <p className="w-full text-[#143051] text-sm font-normal font-['Inter'] leading-relaxed">
                {newsArticle.bioAuthor}
              </p>
            </div>
            
            {/* Advertisement Placeholder */}
            <div className="w-full h-56 bg-gradient-to-br from-[#6e7869] to-[#4a5a4a] rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <Share2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">Ruang Iklan</p>
                <p className="text-xs opacity-75">Desa Kenteng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related News Section */}
      <div className="w-full px-4 md:px-[120px] pb-[60px] flex flex-col justify-center items-start gap-8">
        <h2 className="text-[#143051] text-3xl md:text-4xl font-bold font-['Satoshi'] tracking-wide">
          Jelajahi Berita Lainnya
        </h2>
        
        <div className="w-full flex flex-col justify-center items-center gap-12">
          {/* First Row */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedNews.slice(0, 3).map((news, index) => (
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

          {/* Second Row */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedNews.slice(3, 6).map((news, index) => (
              <NewsCard
                key={index + 3}
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