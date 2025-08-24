"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Trash2,
  Edit,
  Plus,
  Eye,
  MapPin,
  Clock,
  Users,
  Phone,
  DollarSign,
  Images,
} from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { MultipleImageUpload } from "@/components/ui/multiple-image-upload";

interface PaketWisataItem {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image_url: string;
  image_path: string;
  additional_images: string[];
  additional_image_paths: string[];
  facilities: string[];
  itinerary: Record<string, any>;
  min_participants: number;
  max_participants: number;
  contact_person: string;
  contact_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface PaketWisataFormProps {
  onChange?: () => void;
}

export default function PaketWisataForm({ onChange }: PaketWisataFormProps) {
  const [items, setItems] = useState<PaketWisataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<PaketWisataItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    duration: "",
    location: "",
    image_url: "",
    image_path: "",
    additional_images: [] as string[],
    additional_image_paths: [] as string[],
    facilities: [] as string[],
    min_participants: 1,
    max_participants: 50,
    contact_person: "",
    contact_number: "",
    is_active: true,
  });
  const [facilitiesInput, setFacilitiesInput] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/paket-wisata");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        throw new Error("Gagal memuat data paket wisata");
      }
    } catch (error) {
      console.error("Error fetching paket wisata:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data paket wisata",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.price) {
        throw new Error("Nama paket dan harga wajib diisi");
      }

      // Parse facilities from comma-separated string
      const facilities = facilitiesInput
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const dataToSubmit = {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        contact_person: formData.contact_person.trim(),
        facilities,
      };

      const url = editingItem
        ? `/api/paket-wisata/${editingItem.id}`
        : "/api/paket-wisata";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: `Paket wisata berhasil ${
            editingItem ? "diperbarui" : "ditambahkan"
          }`,
        });
        resetForm();
        fetchItems();
        if (onChange) onChange();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menyimpan data paket wisata");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: PaketWisataItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price,
      duration: item.duration || "",
      location: item.location || "",
      image_url: item.image_url || "",
      image_path: item.image_path || "",
      additional_images: item.additional_images || [],
      additional_image_paths: item.additional_image_paths || [],
      facilities: item.facilities || [],
      min_participants: item.min_participants || 1,
      max_participants: item.max_participants || 50,
      contact_person: item.contact_person || "",
      contact_number: item.contact_number || "",
      is_active: item.is_active !== false,
    });
    setFacilitiesInput((item.facilities || []).join(", "));

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus paket "${name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/paket-wisata/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Paket wisata berhasil dihapus",
        });
        fetchItems();
        if (onChange) onChange();
      } else {
        throw new Error("Gagal menghapus paket wisata");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus paket wisata",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      duration: "",
      location: "",
      image_url: "",
      image_path: "",
      additional_images: [],
      additional_image_paths: [],
      facilities: [],
      min_participants: 1,
      max_participants: 50,
      contact_person: "",
      contact_number: "",
      is_active: true,
    });
    setFacilitiesInput("");
  };

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
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            {editingItem ? (
              <Edit className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            {editingItem ? "Edit Paket Wisata" : "Tambah Paket Wisata Baru"}
          </CardTitle>
          {editingItem && (
            <div className="text-sm text-gray-600">
              Mengedit paket:{" "}
              <span className="font-medium">{editingItem.name}</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Paket *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Masukkan nama paket wisata..."
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Harga (Rp) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="0"
                  required
                  disabled={loading}
                />
                {formData.price > 0 && (
                  <div className="text-sm text-gray-600">
                    {formatCurrency(formData.price)}
                  </div>
                )}
              </div>
            </div>

            {/* Duration and Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Durasi</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  placeholder="Contoh: 2 hari 1 malam"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="Lokasi wisata"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Participants */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min_participants">Minimum Peserta</Label>
                <Input
                  id="min_participants"
                  type="number"
                  min="1"
                  value={formData.min_participants}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      min_participants: parseInt(e.target.value) || 1,
                    }))
                  }
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_participants">Maximum Peserta</Label>
                <Input
                  id="max_participants"
                  type="number"
                  min="1"
                  value={formData.max_participants}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      max_participants: parseInt(e.target.value) || 50,
                    }))
                  }
                  disabled={loading}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_person">Penanggung Jawab</Label>
                <Input
                  id="contact_person"
                  value={formData.contact_person}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact_person: e.target.value,
                    }))
                  }
                  placeholder="Nama penanggung jawab"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_number">Nomor Kontak</Label>
                <Input
                  id="contact_number"
                  value={formData.contact_number}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact_number: e.target.value,
                    }))
                  }
                  placeholder="08xxxxxxxxxx"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Deskripsi paket wisata..."
                rows={4}
                disabled={loading}
              />
            </div>

            {/* Facilities */}
            <div className="space-y-2">
              <Label htmlFor="facilities">
                Fasilitas (pisahkan dengan koma)
              </Label>
              <Input
                id="facilities"
                value={facilitiesInput}
                onChange={(e) => setFacilitiesInput(e.target.value)}
                placeholder="Contoh: Transport, Makan 3x, Penginapan, Guide"
                disabled={loading}
              />
              {facilitiesInput && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {facilitiesInput.split(",").map((facility, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {facility.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Main Image Upload */}
            <ImageUpload
              label="Gambar Utama"
              value={formData.image_url}
              onChange={(url, path) =>
                setFormData((prev) => ({
                  ...prev,
                  image_url: url,
                  image_path: path || "",
                }))
              }
              placeholder="https://example.com/wisata.jpg"
              folder="paket-wisata"
            />

            {/* Additional Images Upload */}
            <MultipleImageUpload
              label="Gambar Tambahan"
              images={formData.additional_images}
              imagePaths={formData.additional_image_paths}
              onChange={(urls, paths) =>
                setFormData((prev) => ({
                  ...prev,
                  additional_images: urls,
                  additional_image_paths: paths || [],
                }))
              }
              folder="paket-wisata"
              maxImages={5}
            />

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_active: checked }))
                }
                disabled={loading}
              />
              <Label htmlFor="is_active">Paket Aktif</Label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {loading
                  ? "Menyimpan..."
                  : editingItem
                  ? "Perbarui Paket Wisata"
                  : "Tambah Paket Wisata"}
              </Button>
              {editingItem && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Batal Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* List Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Eye className="h-5 w-5" />
            Daftar Paket Wisata ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && items.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data paket wisata...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="mb-4">🏖️</div>
              <h3 className="font-medium mb-2">Belum ada paket wisata</h3>
              <p className="text-sm">
                Tambahkan paket wisata pertama menggunakan form di atas!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 flex-1">
                      {/* Image */}
                      {item.image_url ? (
                        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border bg-gray-100">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                          <Images className="h-8 w-8 text-purple-400" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title and badges */}
                        <div className="flex items-start gap-2 mb-2 flex-wrap">
                          <h3 className="font-semibold text-purple-800 text-lg leading-tight">
                            {item.name}
                          </h3>
                          <div className="flex gap-1 flex-shrink-0">
                            <Badge
                              className="bg-green-100 text-green-800"
                              variant="outline"
                            >
                              {formatCurrency(item.price)}
                            </Badge>
                            {!item.is_active && (
                              <Badge variant="destructive" className="text-xs">
                                Tidak Aktif
                              </Badge>
                            )}
                            {item.additional_images &&
                              item.additional_images.length > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  <Images className="h-3 w-3 mr-1" />+
                                  {item.additional_images.length}
                                </Badge>
                              )}
                          </div>
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p
                            className="text-gray-600 text-sm mb-3 overflow-hidden"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {item.description}
                          </p>
                        )}

                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                          {item.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.duration}
                            </div>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {item.min_participants}-{item.max_participants}{" "}
                            orang
                          </div>
                          <div>Dibuat {formatDate(item.created_at)}</div>
                        </div>

                        {/* Facilities */}
                        {item.facilities && item.facilities.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {item.facilities
                              .slice(0, 3)
                              .map((facility, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {facility}
                                </Badge>
                              ))}
                            {item.facilities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.facilities.length - 3} lagi
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        disabled={loading}
                        className="hover:bg-purple-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={loading}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
