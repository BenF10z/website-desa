"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BeritaForm from "@/components/admin/berita-form";
import BumdesForm from "@/components/admin/bumdes-form";
import PaketWisataForm from "@/components/admin/paket-wisata-form";
import GalleryForm from "@/components/admin/gallery-form";
import ProfilForm from "@/components/admin/profil-form";
import PotensiForm from "@/components/admin/potensi-form";
import ApbdesForm from "@/components/admin/apbdes-form";
import { Building2, Camera, FileText, Briefcase, MapPin, User, Coins } from "lucide-react";

interface DataCounts {
  berita: number;
  bumdes: number;
  paketWisata: number;
  gallery: number;
  profil: number;
  potensi: number;
  apbdes: number;
}

export default function AdminPage() {
  const [counts, setCounts] = useState<DataCounts>({
    berita: 0,
    bumdes: 0,
    paketWisata: 0,
    gallery: 0,
    profil: 0,
    potensi: 0,
    apbdes: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      // Fetch Berita count
      const beritaResponse = await fetch("/api/berita");
      const beritaData = beritaResponse.ok ? await beritaResponse.json() : [];

      // Fetch BUMDes count
      const bumdesResponse = await fetch("/api/bumdes");
      const bumdesData = bumdesResponse.ok ? await bumdesResponse.json() : [];

      // Fetch Paket Wisata count
      const paketWisataResponse = await fetch("/api/paket-wisata");
      const paketWisataData = paketWisataResponse.ok ? await paketWisataResponse.json() : [];

      // Fetch Gallery count
      const galleryResponse = await fetch("/api/gallery");
      const galleryData = galleryResponse.ok ? await galleryResponse.json() : [];

      // Fetch Profil count
      const profilResponse = await fetch("/api/profil");
      const profilData = profilResponse.ok ? await profilResponse.json() : [];

      // Fetch Potensi count
      const potensiResponse = await fetch("/api/potensi-desa");
      const potensiData = potensiResponse.ok ? await potensiResponse.json() : [];

      // Fetch APBDes count
      const apbdesResponse = await fetch("/api/apbdes");
      const apbdesData = apbdesResponse.ok ? await apbdesResponse.json() : [];

      setCounts({
        berita: beritaData.length,
        bumdes: bumdesData.length,
        paketWisata: paketWisataData.length,
        gallery: galleryData.length,
        profil: profilData.length,
        potensi: potensiData.length,
        apbdes: apbdesData.length,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-green-800">Panel Admin Desa Kenteng</h1>
        <p className="text-gray-600">Kelola konten website desa dengan mudah</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{counts.berita}</div>
            <div className="text-sm text-gray-600">Berita</div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{counts.bumdes}</div>
            <div className="text-sm text-gray-600">BUMDes</div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{counts.paketWisata}</div>
            <div className="text-sm text-gray-600">Wisata</div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Camera className="h-6 w-6 text-pink-600" />
            </div>
            <div className="text-2xl font-bold text-pink-600">{counts.gallery}</div>
            <div className="text-sm text-gray-600">Galeri</div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <User className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{counts.profil}</div>
            <div className="text-sm text-gray-600">Profil</div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="h-6 w-6 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-teal-600">{counts.potensi}</div>
            <div className="text-sm text-gray-600">Potensi</div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Coins className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{counts.apbdes}</div>
            <div className="text-sm text-gray-600">APBDes</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        {/* Responsive Tab List */}
        <div className="w-full overflow-x-auto">
          <TabsList className="grid w-full grid-cols-8 min-w-[800px] h-auto p-1">
            <TabsTrigger value="overview" className="text-xs px-2 py-2">
              Overview
            </TabsTrigger>
            <TabsTrigger value="berita" className="text-xs px-2 py-2">
              Berita
            </TabsTrigger>
            <TabsTrigger value="bumdes" className="text-xs px-2 py-2">
              BUMDes
            </TabsTrigger>
            <TabsTrigger value="paket-wisata" className="text-xs px-2 py-2">
              Wisata
            </TabsTrigger>
            <TabsTrigger value="gallery" className="text-xs px-2 py-2">
              Galeri
            </TabsTrigger>
            <TabsTrigger value="profil" className="text-xs px-2 py-2">
              Profil
            </TabsTrigger>
            <TabsTrigger value="potensi" className="text-xs px-2 py-2">
              Potensi
            </TabsTrigger>
            <TabsTrigger value="apbdes" className="text-xs px-2 py-2">
              APBDes
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Ringkasan Data Website
              </CardTitle>
              <CardDescription>
                Statistik konten yang tersedia di website Desa Kenteng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Konten Utama</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        Berita Desa
                      </span>
                      <Badge variant="secondary">{counts.berita}</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-green-600" />
                        Unit BUMDes
                      </span>
                      <Badge variant="secondary">{counts.bumdes}</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        Paket Wisata
                      </span>
                      <Badge variant="secondary">{counts.paketWisata}</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-yellow-600" />
                        Data APBDes
                      </span>
                      <Badge variant="secondary">{counts.apbdes}</Badge>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Media & Profil</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-pink-600" />
                        Foto Galeri
                      </span>
                      <Badge variant="secondary">{counts.gallery}</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4 text-orange-600" />
                        Data Profil
                      </span>
                      <Badge variant="secondary">{counts.profil}</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-teal-600" />
                        Potensi Desa
                      </span>
                      <Badge variant="secondary">{counts.potensi}</Badge>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Status Sistem</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Database Connected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Image Upload Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>All Systems Online</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Tips Penggunaan:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Gunakan tab di atas untuk mengelola berbagai jenis konten</li>
                  <li>• Pastikan mengisi semua field yang wajib (*) saat menambah data</li>
                  <li>• Upload gambar dengan kualitas baik untuk tampilan optimal</li>
                  <li>• Data akan otomatis tersimpan dan tampil di website publik</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="berita">
          <BeritaForm onChange={fetchCounts} />
        </TabsContent>

        <TabsContent value="bumdes">
          <BumdesForm onChange={fetchCounts} />
        </TabsContent>

        <TabsContent value="paket-wisata">
          <PaketWisataForm onChange={fetchCounts} />
        </TabsContent>

        <TabsContent value="gallery">
          <GalleryForm onChange={fetchCounts} />
        </TabsContent>

        <TabsContent value="profil">
          <ProfilForm onChange={fetchCounts} />
        </TabsContent>

        <TabsContent value="potensi">
          <PotensiForm onChange={fetchCounts} />
        </TabsContent>

        <TabsContent value="apbdes">
          <ApbdesForm onChange={fetchCounts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}