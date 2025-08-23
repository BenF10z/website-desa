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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#143051]"></div>
          <p className="mt-4 text-[#143051] font-['Satoshi']">Memuat data APBDes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative w-full h-[276px] z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#143051] to-[#3e5880]" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-white text-4xl md:text-6xl font-black font-['Satoshi'] mb-4">
              APBDes
            </h1>
            <p className="text-white/90 text-lg font-['Satoshi']">
              Anggaran Pendapatan dan Belanja Desa
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="w-full px-4 md:px-[120px] py-8 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="border-[#143051]/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-[#143051] mb-2">
                {filteredItems.length}
              </div>
              <div className="text-[#3e5880] font-['Satoshi']">
                Total Kegiatan
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-[#143051]/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-[#143051] mb-2">
                {tahunOptions.length}
              </div>
              <div className="text-[#3e5880] font-['Satoshi']">
                Tahun Anggaran
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#143051]/20">
            <CardContent className="p-6 text-center">
              <div className="text-sm font-bold text-[#143051] mb-2">
                {formatCurrency(totalAnggaran)}
              </div>
              <div className="text-[#3e5880] font-['Satoshi']">
                Total Anggaran
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="w-full px-4 md:px-[120px] pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#3e5880]" />
              <Input
                placeholder="Cari kegiatan APBDes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#143051] focus:border-[#3e5880]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#3e5880]" />
              <Select value={selectedBidang} onValueChange={setSelectedBidang}>
                <SelectTrigger className="w-56 border-[#143051]">
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
              <Select value={selectedTahun} onValueChange={setSelectedTahun}>
                <SelectTrigger className="w-40 border-[#143051]">
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
      <div className="w-full px-4 md:px-[120px] pb-16">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <Coins className="mx-auto h-16 w-16 text-[#143051] mb-4" />
            <h3 className="text-2xl font-bold text-[#143051] mb-2 font-['Satoshi']">
              {searchTerm || selectedBidang !== "all" || selectedTahun !== "all"
                ? "Tidak ada data yang sesuai"
                : "Belum ada data APBDes"
              }
            </h3>
            <p className="text-[#3e5880] font-['Satoshi']">
              {searchTerm || selectedBidang !== "all" || selectedTahun !== "all"
                ? "Coba ubah kriteria pencarian Anda"
                : "Data APBDes akan segera ditambahkan"
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-[#143051] text-3xl md:text-4xl font-bold font-['Satoshi'] tracking-wide text-center mb-8">
              Data Kegiatan APBDes ({filteredItems.length})
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-[#143051]/20 hover:border-[#143051]">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-[#143051] font-['Satoshi'] mb-2 leading-tight">
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
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-[#143051]/20 bg-gray-100">
                          <Image
                            src={item.foto_dokumentasi}
                            alt={item.nama_kegiatan}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {item.deskripsi && (
                      <CardDescription className="text-[#3e5880] font-['Satoshi'] mb-4 line-clamp-3">
                        {item.deskripsi}
                      </CardDescription>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#143051] font-semibold">
                        <Coins className="h-4 w-4" />
                        <span>{formatCurrency(item.anggaran_kegiatan)}</span>
                      </div>
                      
                      {item.lokasi && (
                        <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                          <MapPin className="h-4 w-4" />
                          <span>{item.lokasi}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-[#3e5880]">
                        <Calendar className="h-4 w-4" />
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
  );
}