"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaketWisata {
  id: number
  title: string
  description: string
  price: string
  duration: string
  capacity: string
  rating: number
  image_url: string
  highlights: string[]
  includes: string[]
  created_at: string
}

export default function PaketWisataForm({ onChange }: { onChange?: () => void }) {
  const [items, setItems] = useState<PaketWisata[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    capacity: "",
    rating: 5,
    image_url: "",
    highlights: [""],
    includes: [""],
  })

  useEffect(() => {
    fetchPaketWisata()
  }, [])

  const fetchPaketWisata = async () => {
    try {
      const response = await fetch("/api/paket-wisata")
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error("Error fetching paket wisata:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingId ? `/api/paket-wisata/${editingId}` : "/api/paket-wisata"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          highlights: formData.highlights.filter((h) => h.trim() !== ""),
          includes: formData.includes.filter((i) => i.trim() !== ""),
        }),
      })

      if (response.ok) {
        fetchPaketWisata();
        if (onChange) onChange();
      } else {
        throw new Error("Failed to save paket wisata")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan paket wisata",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: PaketWisata) => {
    setFormData({
      title: item.title,
      description: item.description,
      price: item.price,
      duration: item.duration,
      capacity: item.capacity,
      rating: item.rating,
      image_url: item.image_url,
      highlights: item.highlights.length > 0 ? item.highlights : [""],
      includes: item.includes.length > 0 ? item.includes : [""],
    })
    setEditingId(item.id)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus paket wisata ini?")) return

    try {
      const response = await fetch(`/api/paket-wisata/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Paket wisata berhasil dihapus",
        })
        fetchPaketWisata();
        if (onChange) onChange();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus paket wisata",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      capacity: "",
      rating: 5,
      image_url: "",
      highlights: [""],
      includes: [""],
    })
    setEditingId(null)
  }

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ""] })
  }

  const removeHighlight = (index: number) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index)
    setFormData({ ...formData, highlights: newHighlights })
  }

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights]
    newHighlights[index] = value
    setFormData({ ...formData, highlights: newHighlights })
  }

  const addInclude = () => {
    setFormData({ ...formData, includes: [...formData.includes, ""] })
  }

  const removeInclude = (index: number) => {
    const newIncludes = formData.includes.filter((_, i) => i !== index)
    setFormData({ ...formData, includes: newIncludes })
  }

  const updateInclude = (index: number, value: string) => {
    const newIncludes = [...formData.includes]
    newIncludes[index] = value
    setFormData({ ...formData, includes: newIncludes })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingId ? "Edit Paket Wisata" : "Tambah Paket Wisata Baru"}
          </CardTitle>
          <CardDescription>
            {editingId ? "Perbarui informasi paket wisata" : "Tambahkan paket wisata baru untuk pengunjung"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Nama Paket</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masukkan nama paket wisata"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Harga</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Rp 150.000"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Durasi</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="8 jam"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Kapasitas</Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="2-15 orang"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number.parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Masukkan deskripsi paket wisata"
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
              <Label>Highlight Paket</Label>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    placeholder="Masukkan highlight"
                  />
                  {formData.highlights.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeHighlight(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Highlight
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Yang Termasuk</Label>
              {formData.includes.map((include, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={include}
                    onChange={(e) => updateInclude(index, e.target.value)}
                    placeholder="Masukkan yang termasuk"
                  />
                  {formData.includes.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeInclude(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addInclude}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Item
              </Button>
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
          <CardTitle>Daftar Paket Wisata</CardTitle>
          <CardDescription>Kelola semua paket wisata</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{item.price}</Badge>
                      <Badge variant="outline">{item.duration}</Badge>
                      <Badge variant="outline">★ {item.rating}</Badge>
                    </div>
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
