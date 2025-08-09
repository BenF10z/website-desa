"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PotensiItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url: string;
  benefits: string;
  location?: string;
  created_at: string;
}

export default function PotensiForm({ onChange }: { onChange?: () => void }) {
  const [items, setItems] = useState<PotensiItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image_url: "",
    benefits: "",
    location: "",
  });

  const categories = [
    { value: "pertanian", label: "Pertanian" },
    { value: "wisata", label: "Wisata" },
    { value: "sumber_daya", label: "Sumber Daya Alam" },
    { value: "industri", label: "Industri" },
    { value: "budaya", label: "Budaya" },
    { value: "ekonomi", label: "Ekonomi" },
  ];

  useEffect(() => {
    fetchPotensiItems();
  }, []);

  const fetchPotensiItems = async () => {
    const response = await fetch("/api/potensi-desa");
    if (response.ok) {
      const data = await response.json();
      setItems(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingId
        ? `/api/potensi-desa/${editingId}`
        : "/api/potensi-desa";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPotensiItems();
        if (onChange) onChange();
      } else {
        throw new Error("Failed to save potensi item");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan potensi desa",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: PotensiItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image_url: item.image_url,
      benefits: item.benefits,
      location: item.location || "",
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus potensi ini?")) return;

    try {
      const response = await fetch(`/api/potensi-desa/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Potensi desa berhasil dihapus",
        });
        fetchPotensiItems();
        if (onChange) onChange();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus potensi desa",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      image_url: "",
      benefits: "",
      location: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingId ? "Edit Potensi Desa" : "Tambah Potensi Desa Baru"}
          </CardTitle>
          <CardDescription>
            {editingId
              ? "Perbarui informasi potensi desa"
              : "Tambahkan potensi baru yang dimiliki desa"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Nama Potensi</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Masukkan nama potensi"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
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
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Masukkan deskripsi potensi"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Manfaat/Keunggulan</Label>
              <Textarea
                id="benefits"
                value={formData.benefits}
                onChange={(e) =>
                  setFormData({ ...formData, benefits: e.target.value })
                }
                placeholder="Masukkan manfaat dan keunggulan"
                rows={3}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi (Opsional)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Masukkan lokasi spesifik"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">URL Gambar</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
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
          <CardTitle>Daftar Potensi Desa</CardTitle>
          <CardDescription>
            Kelola semua potensi yang dimiliki desa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <Badge variant="outline">
                        {
                          categories.find((cat) => cat.value === item.category)
                            ?.label
                        }
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                    {item.location && (
                      <p className="text-xs text-green-600 mt-1">
                        📍 {item.location}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
