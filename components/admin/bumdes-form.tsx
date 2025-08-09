"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BumdesItem {
  id: number
  name: string
  description: string
  category: string
  image_url: string
  contact_info?: string
  operating_hours?: string
  services: string
  created_at: string
}

export default function BumdesForm( { onChange }: { onChange?: () => void }) {
  const [items, setItems] = useState<BumdesItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image_url: "",
    contact_info: "",
    operating_hours: "",
    services: "",
  })

  const categories = [
    { value: "perdagangan", label: "Perdagangan" },
    { value: "jasa", label: "Jasa" },
    { value: "industri", label: "Industri" },
    { value: "pariwisata", label: "Pariwisata" },
    { value: "pertanian", label: "Pertanian" },
    { value: "keuangan", label: "Keuangan" },
  ]

  useEffect(() => {
    fetchBumdesItems()
  }, [])

  const fetchBumdesItems = async () => {
    try {
      const response = await fetch("/api/bumdes")
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error("Error fetching bumdes items:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingId ? `/api/bumdes/${editingId}` : "/api/bumdes"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: editingId ? "Unit Bumdes berhasil diperbarui" : "Unit Bumdes berhasil ditambahkan",
        })
        resetForm()
        fetchBumdesItems()
        if (onChange) onChange()
      } else {
        throw new Error("Failed to save bumdes item")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan unit Bumdes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: BumdesItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      image_url: item.image_url,
      contact_info: item.contact_info || "",
      operating_hours: item.operating_hours || "",
      services: item.services,
    })
    setEditingId(item.id)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus unit Bumdes ini?")) return

    try {
      const response = await fetch(`/api/bumdes/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Unit Bumdes berhasil dihapus",
        })
        fetchBumdesItems();
        if (onChange) onChange();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus unit Bumdes",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      image_url: "",
      contact_info: "",
      operating_hours: "",
      services: "",
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingId ? "Edit Unit Bumdes" : "Tambah Unit Bumdes Baru"}
          </CardTitle>
          <CardDescription>
            {editingId ? "Perbarui informasi unit Bumdes" : "Tambahkan unit usaha baru untuk Bumdes"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Unit Usaha</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama unit usaha"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Masukkan deskripsi unit usaha"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="services">Layanan/Produk</Label>
              <Textarea
                id="services"
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                placeholder="Masukkan layanan atau produk yang ditawarkan"
                rows={3}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_info">Kontak (Opsional)</Label>
                <Input
                  id="contact_info"
                  value={formData.contact_info}
                  onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                  placeholder="Nomor telepon atau email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operating_hours">Jam Operasional (Opsional)</Label>
                <Input
                  id="operating_hours"
                  value={formData.operating_hours}
                  onChange={(e) => setFormData({ ...formData, operating_hours: e.target.value })}
                  placeholder="Senin-Jumat 08:00-17:00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL Gambar</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? "Menyimpan..." : editingId ? "Perbarui" : "Tambah"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Batal
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Unit Bumdes</CardTitle>
          <CardDescription>Kelola semua unit usaha Bumdes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <Badge variant="outline">{categories.find((cat) => cat.value === item.category)?.label}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    {item.contact_info && <p className="text-xs text-green-600 mt-1">📞 {item.contact_info}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
