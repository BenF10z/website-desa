"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Users, Leaf, Store, MapPin } from "lucide-react";
import GalleryForm from "@/components/admin/gallery-form";
import ProfilForm from "@/components/admin/profil-form";
import PotensiForm from "@/components/admin/potensi-form";
import BumdesForm from "@/components/admin/bumdes-form";
import PaketWisataForm from "@/components/admin/paket-wisata-form";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [counts, setCounts] = useState({
    gallery: 0,
    profil: 0,
    potensi: 0,
    bumdes: 0,
    wisata: 0,
  });

  const fetchCounts = async () => {
    const [galleryRes, profilRes, potensiRes, bumdesRes, wisataRes] =
        await Promise.all([
          fetch("/api/gallery"),
          fetch("/api/profil"),
          fetch("/api/potensi-desa"),
          fetch("/api/bumdes"),
          fetch("/api/paket-wisata"),
        ]);
      const gallery = galleryRes.ok ? await galleryRes.json() : [];
      const profil = profilRes.ok ? await profilRes.json() : [];
      const potensi = potensiRes.ok ? await potensiRes.json() : [];
      const bumdes = bumdesRes.ok ? await bumdesRes.json() : [];
      const wisata = wisataRes.ok ? await wisataRes.json() : [];

      setCounts({
        gallery: gallery.length,
        profil: profil.length,
        potensi: potensi.length,
        bumdes: bumdes.length,
        wisata: wisata.length,
      });
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const stats = [
    {
      title: "Total Gallery",
      value: counts.gallery,
      icon: ImageIcon,
      color: "bg-blue-500",
    },
    {
      title: "Profil Entries",
      value: counts.profil,
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Potensi Desa",
      value: counts.potensi,
      icon: Leaf,
      color: "bg-yellow-500",
    },
    {
      title: "Unit Bumdes",
      value: counts.bumdes,
      icon: Store,
      color: "bg-purple-500",
    },
    {
      title: "Paket Wisata",
      value: counts.wisata,
      icon: MapPin,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Kelola konten website Desa Kenteng
              </p>
            </div>
            <Badge className="bg-green-600">Admin Panel</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="profil">Profil</TabsTrigger>
            <TabsTrigger value="potensi">Potensi</TabsTrigger>
            <TabsTrigger value="bumdes">Bumdes</TabsTrigger>
            <TabsTrigger value="wisata">Wisata</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${stat.color}`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>
                  Perubahan konten dalam 7 hari terakhir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ImageIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Gallery baru ditambahkan</p>
                        <p className="text-sm text-gray-600">
                          Foto festival budaya desa
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 jam lalu</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Paket wisata diperbarui</p>
                        <p className="text-sm text-gray-600">
                          Paket Wisata Alam 1 Hari
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">1 hari lalu</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryForm onChange={fetchCounts}/>
          </TabsContent>

          <TabsContent value="profil">
            <ProfilForm onChange={fetchCounts}/>
          </TabsContent>

          <TabsContent value="potensi">
            <PotensiForm onChange={fetchCounts}/>
          </TabsContent>

          <TabsContent value="bumdes">
            <BumdesForm onChange={fetchCounts}/>
          </TabsContent>

          <TabsContent value="wisata">
            <PaketWisataForm onChange={fetchCounts}/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
