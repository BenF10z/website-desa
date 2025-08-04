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

interface GalleryItem {
  id: number
  title: string
  description: string
  category: string
  image_url: string
  alt_text: string
  created_at: string
}

export default function GalleryForm() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image_url: "",
    alt_text: "",
  })

  const categories = [
    { value: "alam", label: "Alam" },
    { value: "budaya", label: "Budaya" },
    { value: "pertanian", label: "Pertanian" },
    { value: "wisata", label: "Wisata" },
    { value: "masyarakat", label: "Masyarakat" },
  ]

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/gallery")
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingId ? `/api/gallery/${editingId}` : "/api/gallery"
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
          description: editingId ? "Item gallery berhasil diperbarui" : "Item gallery berhasil ditambahkan",
        })
        resetForm()
        fetchGalleryItems()
      } else {
        throw new Error("Failed to save item")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan item gallery",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image_url: item.image_url,
      alt_text: item.alt_text,
    })
    setEditingId(item.id)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Item gallery berhasil dihapus",
        })
        fetchGalleryItems()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus item gallery",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      image_url: "",
      alt_text: "",
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingId ? "Edit Item Gallery" : "Tambah Item Gallery Baru"}
          </CardTitle>
          <CardDescription>
            {editingId ? "Perbarui informasi item gallery" : "Tambahkan foto baru ke gallery desa"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masukkan judul foto"
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
                placeholder="Masukkan deskripsi foto"
                rows={3}
                required
              />
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

            <div className="space-y-2">
              <Label htmlFor="alt_text">Alt Text</Label>
              <Input
                id="alt_text"
                value={formData.alt_text}
                onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                placeholder="Deskripsi gambar untuk aksesibilitas"
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
          <CardTitle>Daftar Item Gallery</CardTitle>
          <CardDescription>Kelola semua item dalam gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.alt_text}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <Badge variant="outline" className="mt-1">
                      {categories.find((cat) => cat.value === item.category)?.label}
                    </Badge>
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
