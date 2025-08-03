"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Users, Leaf, Store, MapPin } from "lucide-react"
import GalleryForm from "@/components/admin/gallery-form"
import ProfilForm from "@/components/admin/profil-form"
import PotensiForm from "@/components/admin/potensi-form"
import BumdesForm from "@/components/admin/bumdes-form"
import PaketWisataForm from "@/components/admin/paket-wisata-form"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { title: "Total Gallery", value: "24", icon: ImageIcon, color: "bg-blue-500" },
    { title: "Profil Entries", value: "5", icon: Users, color: "bg-green-500" },
    { title: "Potensi Desa", value: "8", icon: Leaf, color: "bg-yellow-500" },
    { title: "Unit Bumdes", value: "6", icon: Store, color: "bg-purple-500" },
    { title: "Paket Wisata", value: "4", icon: MapPin, color: "bg-red-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
              <p className="text-gray-600">Kelola konten website Desa Kenteng</p>
            </div>
            <Badge className="bg-green-600">Admin Panel</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
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
                <CardDescription>Perubahan konten dalam 7 hari terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ImageIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Gallery baru ditambahkan</p>
                        <p className="text-sm text-gray-600">Foto festival budaya desa</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 jam lalu</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Paket wisata diperbarui</p>
                        <p className="text-sm text-gray-600">Paket Wisata Alam 1 Hari</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">1 hari lalu</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryForm />
          </TabsContent>

          <TabsContent value="profil">
            <ProfilForm />
          </TabsContent>

          <TabsContent value="potensi">
            <PotensiForm />
          </TabsContent>

          <TabsContent value="bumdes">
            <BumdesForm />
          </TabsContent>

          <TabsContent value="wisata">
            <PaketWisataForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
