"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coins, MapPin, Calendar, Search, Filter } from "lucide-react";

interface ApbdesItem {
  id: number;
  nama_kegiatan: string;
  bidang: string;
  anggaran_kegiatan: number;
  tahun_anggaran: number;
  foto_dokumentasi: string;
  deskripsi: string;
  lokasi: string;
  created_at: string;
}

export default function ApbdesPage() {
  const [items, setItems] = useState<ApbdesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBidang, setSelectedBidang] = useState("all");
  const [selectedTahun, setSelectedTahun] = useState("all");

  useEffect(() => {
    fetchApbdesData();
  }, []);

  const fetchApbdesData = async () => {
    try {
      const response = await fetch("/api/apbdes");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Error fetching APBDes data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.nama_kegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.lokasi?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBidang = selectedBidang === "all" || item.bidang === selectedBidang;
    const matchesTahun = selectedTahun === "all" || item.tahun_anggaran.toString() === selectedTahun;
    return matchesSearch && matchesBidang && matchesTahun;
  });

  const bidangOptions = [...new Set(items.map(item => item.bidang))];
  const tahunOptions = [...new Set(items.map(item => item.tahun_anggaran.toString()))].sort((a, b) => b.localeCompare(a));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBidangColor = (bidang: string) => {
    const colors: { [key: string]: string } = {
      "Bidang Pemerintahan": "bg-blue-100 text-blue-800 border-blue-200",
      "Bidang Pembangunan": "bg-green-100 text-green-800 border-green-200",
      "Bidang Pembinaan Masyarakat": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Bidang Pemberdayaan Masyarakat": "bg-purple-100 text-purple-800 border-purple-200",
      "Bidang Tidak Terduga": "bg-red-100 text-red-800 border-red-200",
    };
    return colors[bidang] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const totalAnggaran = filteredItems.reduce((sum, item) => sum + item.anggaran_kegiatan, 0);

  // Loading state yang konsisten dengan halaman lain
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Skeleton */}
        <section className="relative w-full h-[200px] sm:h-[240px] md:h-[276px] z-10">
          <div className="absolute inset-0 bg-[#7e8e7e]" />
          <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
            <div className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] h-8 sm:h-10 md:h-12 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
        </section>

        {/* Stats Section Skeleton */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 md:py-8 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {Array(3).fill(0).map((_, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-16 md:w-20 h-6 md:h-8 bg-gray-200 rounded-lg animate-pulse mx-auto mb-2"></div>
                  <div className="w-20 md:w-24 h-3 md:h-4 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] pb-16">
          <div className="flex flex-col justify-start items-center gap-8 md:gap-12">
            {/* Title Skeleton */}
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="w-24 md:w-32 h-3 md:h-4 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-48 md:w-64 h-6 md:h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Search and Filter Skeleton */}
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex flex-col gap-4 items-center justify-center">
                <div className="w-full max-w-md h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex flex-col sm:flex-row gap-2 w-full max-w-sm">
                  <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-full sm:w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Cards Skeleton */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 space-y-3 w-full">
                        <div className="w-3/4 h-5 md:h-6 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="flex gap-2">
                          <div className="w-16 md:w-20 h-4 md:h-5 bg-gray-200 rounded-lg animate-pulse"></div>
                          <div className="w-12 md:w-16 h-4 md:h-5 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="w-full h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="w-28 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Responsive */}
      <section className="relative w-full h-[200px] sm:h-[240px] md:h-[276px] z-10">
        <div className="absolute inset-0 bg-[#7e8e7e]" />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black font-['Satoshi'] text-center">
            APBDes
          </h1>
        </div>
      </section>

      {/* Stats Section - Responsive */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-6 md:py-8 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          <Card className="border-[#143051]/20">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-xl md:text-2xl font-bold text-[#143051] mb-2">
                {filteredItems.length}
              </div>
              <div className="text-sm md:text-base text-[#3e5880] font-['Satoshi']">
                Total Kegiatan
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-[#143051]/20">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-xl md:text-2xl font-bold text-[#143051] mb-2">
                {tahunOptions.length}
              </div>
              <div className="text-sm md:text-base text-[#3e5880] font-['Satoshi']">
                Tahun Anggaran
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#143051]/20 sm:col-span-2 md:col-span-1">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-xs sm:text-sm md:text-sm font-bold text-[#143051] mb-2 leading-tight">
                {formatCurrency(totalAnggaran)}
              </div>
              <div className="text-sm md:text-base text-[#3e5880] font-['Satoshi']">
                Total Anggaran
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Section - Responsive */}
      <section className="relative z-0 w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-8 md:py-[60px] bg-white">
        <div className="flex flex-col justify-start items-center gap-8 md:gap-12">
          {/* Title Section - Responsive */}
          <div className="flex flex-col justify-center items-center gap-2 text-center">
            <div className="text-[#6e7869] text-xs sm:text-sm font-bold font-['Satoshi'] uppercase tracking-[2px] sm:tracking-[4.20px]">
              Keuangan
            </div>
            <div className="text-[#1a1a1a] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-['Satoshi'] tracking-wide lg:tracking-wider px-4">
              Anggaran Pendapatan dan Belanja Desa
            </div>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-6 md:gap-8">
            {/* Search and Filter - Responsive & Fixed scrollbar */}
            <div className="w-full">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col gap-4 items-center justify-center">
                  {/* Search Input */}
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-[#3e5880]" />
                    <Input
                      placeholder="Cari kegiatan APBDes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-[#143051] focus:border-[#3e5880] text-sm md:text-base"
                    />
                  </div>
                  
                  {/* Filter Controls */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-sm">
                    <Filter className="h-4 w-4 text-[#3e5880] sm:flex-shrink-0" />
                    <Select 
                      value={selectedBidang} 
                      onValueChange={setSelectedBidang}
                    >
                      <SelectTrigger className="w-full border-[#143051] text-sm">
                        <SelectValue placeholder="Pilih bidang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Bidang</SelectItem>
                        {bidangOptions.map((bidang) => (
                          <SelectItem key={bidang} value={bidang}>
                            {bidang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={selectedTahun} 
                      onValueChange={setSelectedTahun}
                    >
                      <SelectTrigger className="w-full sm:w-32 border-[#143051] text-sm">
                        <SelectValue placeholder="Tahun" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Tahun</SelectItem>
                        {tahunOptions.map((tahun) => (
                          <SelectItem key={tahun} value={tahun}>
                            {tahun}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            {filteredItems.length === 0 ? (
              <div className="w-full py-12 md:py-16 text-center">
                <Coins className="mx-auto h-12 w-12 md:h-16 md:w-16 text-[#143051] mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-[#143051] mb-2 font-['Satoshi'] px-4">
                  {searchTerm || selectedBidang !== "all" || selectedTahun !== "all"
                    ? "Tidak ada data yang sesuai"
                    : "Belum ada data APBDes"
                  }
                </h3>
                <p className="text-sm md:text-base text-[#3e5880] font-['Satoshi'] px-4">
                  {searchTerm || selectedBidang !== "all" || selectedTahun !== "all"
                    ? "Coba ubah kriteria pencarian Anda"
                    : "Data APBDes akan segera ditambahkan"
                  }
                </p>
              </div>
            ) : (
              <div className="w-full space-y-6">
                <h2 className="text-[#143051] text-2xl md:text-3xl lg:text-4xl font-bold font-['Satoshi'] tracking-wide text-center mb-6 md:mb-8 px-4">
                  Data Kegiatan APBDes ({filteredItems.length})
                </h2>
                
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-[#143051]/20 hover:border-[#143051]">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="flex-1 w-full">
                            <CardTitle className="text-lg md:text-xl font-bold text-[#143051] font-['Satoshi'] mb-2 leading-tight">
                              {item.nama_kegiatan}
                            </CardTitle>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge className={`text-xs ${getBidangColor(item.bidang)}`} variant="outline">
                                {item.bidang}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {item.tahun_anggaran}
                              </Badge>
                            </div>
                          </div>
                          
                          {item.foto_dokumentasi && (
                            <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-[#143051]/20 bg-gray-100">
                              <Image
                                src={item.foto_dokumentasi}
                                alt={item.nama_kegiatan}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        {item.deskripsi && (
                          <CardDescription className="text-[#3e5880] font-['Satoshi'] mb-4 line-clamp-3 text-sm md:text-base">
                            {item.deskripsi}
                          </CardDescription>
                        )}

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-[#143051] font-semibold text-sm md:text-base">
                            <Coins className="h-4 w-4 flex-shrink-0" />
                            <span className="break-all">{formatCurrency(item.anggaran_kegiatan)}</span>
                          </div>
                          
                          {item.lokasi && (
                            <div className="flex items-start gap-2 text-xs md:text-sm text-[#3e5880]">
                              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                              <span className="break-words">{item.lokasi}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 text-xs md:text-sm text-[#3e5880]">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span>{formatDate(item.created_at)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}