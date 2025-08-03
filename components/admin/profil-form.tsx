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

interface ProfilItem {
  id: number
  type: string
  title: string
  content: string
  value?: string
  image_url?: string
  created_at: string
}

export default function ProfilForm() {
  const [items, setItems] = useState<ProfilItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    content: "",
    value: "",
    image_url: "",
  })

  const types = [
    { value: "sejarah", label: "Sejarah" },
    { value: "visi", label: "Visi" },
    { value: "misi", label: "Misi" },
    { value: "statistik", label: "Statistik" },
    { value: "informasi", label: "Informasi Umum" },
  ]

  useEffect(() => {
    fetchProfilItems()
  }, [])

  const fetchProfilItems = async () => {
    try {
      const response = await fetch("/api/profil")
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error("Error fetching profil items:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingId ? `/api/profil/${editingId}` : "/api/profil"
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
          description: editingId ? "Item profil berhasil diperbarui" : "Item profil berhasil ditambahkan",
        })
        resetForm()
        fetchProfilItems()
      } else {
        throw new Error("Failed to save profil item")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan item profil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: ProfilItem) => {
    setFormData({
      type: item.type,
      title: item.title,
      content: item.content,
      value: item.value || "",
      image_url: item.image_url || "",
    })
    setEditingId(item.id)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return

    try {
      const response = await fetch(`/api/profil/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Item profil berhasil dihapus",
        })
        fetchProfilItems()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus item profil",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      type: "",
      title: "",
      content: "",
      value: "",
      image_url: "",
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingId ? "Edit Item Profil" : "Tambah Item Profil Baru"}
          </CardTitle>
          <CardDescription>
            {editingId ? "Perbarui informasi profil desa" : "Tambahkan informasi baru ke profil desa"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipe</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masukkan judul"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Masukkan konten"
                rows={4}
                required
              />
            </div>

            {formData.type === "statistik" && (
              <div className="space-y-2">
                <Label htmlFor="value">Nilai</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Masukkan nilai statistik"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="image_url">URL Gambar (Opsional)</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
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
          <CardTitle>Daftar Item Profil</CardTitle>
          <CardDescription>Kelola semua informasi profil desa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <Badge variant="outline">{types.find((type) => type.value === item.type)?.label}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                  {item.value && <p className="text-sm font-medium text-green-600 mt-1">Nilai: {item.value}</p>}
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
