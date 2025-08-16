"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import ProtectedRoute from "@/components/auth/protected-route";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageIcon, Users, Leaf, Store, MapPin, LogOut, Newspaper } from "lucide-react";
import GalleryForm from "@/components/admin/gallery-form";
import ProfilForm from "@/components/admin/profil-form";
import PotensiForm from "@/components/admin/potensi-form";
import BumdesForm from "@/components/admin/bumdes-form";
import PaketWisataForm from "@/components/admin/paket-wisata-form";
import BeritaForm from "@/components/admin/berita-form";
import { useToast } from "@/hooks/use-toast";

function AdminDashboardContent() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [counts, setCounts] = useState({
    gallery: 0,
    profil: 0,
    potensi: 0,
    bumdes: 0,
    wisata: 0,
    berita: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const [galleryRes, profilRes, potensiRes, bumdesRes, wisataRes, beritaRes] =
        await Promise.all([
          fetch("/api/gallery").catch(() => ({ ok: false })),
          fetch("/api/profil").catch(() => ({ ok: false })),
          fetch("/api/potensi-desa").catch(() => ({ ok: false })),
          fetch("/api/bumdes").catch(() => ({ ok: false })),
          fetch("/api/paket-wisata").catch(() => ({ ok: false })),
          fetch("/api/berita").catch(() => ({ ok: false })),
        ]);

      const gallery = galleryRes.ok ? await galleryRes.json().catch(() => []) : [];
      const profil = profilRes.ok ? await profilRes.json().catch(() => []) : [];
      const potensi = potensiRes.ok ? await potensiRes.json().catch(() => []) : [];
      const bumdes = bumdesRes.ok ? await bumdesRes.json().catch(() => []) : [];
      const wisata = wisataRes.ok ? await wisataRes.json().catch(() => []) : [];
      const berita = beritaRes.ok ? await beritaRes.json().catch(() => []) : [];

      setCounts({
        gallery: Array.isArray(gallery) ? gallery.length : 0,
        profil: Array.isArray(profil) ? profil.length : 0,
        potensi: Array.isArray(potensi) ? potensi.length : 0,
        bumdes: Array.isArray(bumdes) ? bumdes.length : 0,
        wisata: Array.isArray(wisata) ? wisata.length : 0,
        berita: Array.isArray(berita) ? berita.length : 0,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data dashboard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout Berhasil",
        description: "Anda telah keluar dari admin dashboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal logout",
        variant: "destructive",
      });
    }
  };

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
    {
      title: "Berita Desa",
      value: counts.berita,
      icon: Newspaper,
      color: "bg-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center gap-4">
              <div className="text-right">
                <Badge className="bg-green-600 mb-2">Admin Panel</Badge>
                <p className="text-sm text-gray-600">
                  {user?.email}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="profil">Profil</TabsTrigger>
            <TabsTrigger value="potensi">Potensi</TabsTrigger>
            <TabsTrigger value="bumdes">Bumdes</TabsTrigger>
            <TabsTrigger value="wisata">Wisata</TabsTrigger>
            <TabsTrigger value="berita">Berita</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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
                <CardTitle>Selamat Datang di Admin Panel</CardTitle>
                <CardDescription>
                  Dashboard admin untuk mengelola konten website Desa Kenteng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Gunakan menu di atas untuk mengelola berbagai konten website seperti:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li><strong>Gallery:</strong> Kelola foto dan gambar desa</li>
                  <li><strong>Profil:</strong> Informasi profil desa</li>
                  <li><strong>Potensi:</strong> Potensi desa dan kekayaan lokal</li>
                  <li><strong>Bumdes:</strong> Unit usaha BUMDes</li>
                  <li><strong>Wisata:</strong> Paket wisata dan destinasi</li>
                  <li><strong>Berita:</strong> Berita dan informasi terkini desa</li>
                </ul>
              </CardContent>
            </Card>
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

          <TabsContent value="bumdes">
            <BumdesForm onChange={fetchCounts} />
          </TabsContent>

          <TabsContent value="wisata">
            <PaketWisataForm onChange={fetchCounts} />
          </TabsContent>

          <TabsContent value="berita">
            <BeritaForm onChange={fetchCounts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}