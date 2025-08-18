"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, Eye, Calendar, User, Building2, MapPin } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

interface BumdesItem {
  id: number;
  name: string;
  description: string;
  category: string;
  contact_person: string;
  contact_number: string;
  location: string;
  image_url: string;
  image_path: string;
  is_active: boolean;
  established_year: number;
  created_at: string;
  updated_at: string;
}

interface BumdesFormProps {
  onChange?: () => void;
}

export default function BumdesForm({ onChange }: BumdesFormProps) {
  const [items, setItems] = useState<BumdesItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<BumdesItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Perdagangan",
    contact_person: "",
    contact_number: "",
    location: "",
    image_url: "",
    image_path: "",
    is_active: true,
    established_year: new Date().getFullYear(),
  });

  const { toast } = useToast();

  const categories = [
    "Perdagangan",
    "Jasa",
    "Produksi",
    "Pertanian",
    "Peternakan",
    "Kerajinan",
    "Kuliner",
    "Teknologi",
    "Pariwisata",
    "Lainnya"
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bumdes");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        throw new Error("Gagal memuat data BUMDes");
      }
    } catch (error) {
      console.error("Error fetching BUMDes:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data BUMDes",
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
      if (!formData.name.trim() || !formData.description.trim()) {
        throw new Error("Nama dan deskripsi wajib diisi");
      }

      const dataToSubmit = {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        contact_person: formData.contact_person.trim(),
        contact_number: formData.contact_number.trim(),
        location: formData.location.trim(),
      };

      const url = editingItem ? `/api/bumdes/${editingItem.id}` : "/api/bumdes";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: `Unit UMKM berhasil ${editingItem ? "diperbarui" : "ditambahkan"}`,
        });
        resetForm();
        fetchItems();
        if (onChange) onChange();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menyimpan data UMKM");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: BumdesItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      contact_person: item.contact_person || "",
      contact_number: item.contact_number || "",
      location: item.location || "",
      image_url: item.image_url || "",
      image_path: item.image_path || "",
      is_active: item.is_active,
      established_year: item.established_year || new Date().getFullYear(),
    });
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus unit UMKM "${name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/bumdes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Unit UMKM berhasil dihapus",
        });
        fetchItems();
        if (onChange) onChange();
      } else {
        throw new Error("Gagal menghapus unit UMKM");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus unit UMKM",
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
      category: "Perdagangan",
      contact_person: "",
      contact_number: "",
      location: "",
      image_url: "",
      image_path: "",
      is_active: true,
      established_year: new Date().getFullYear(),
    });
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
          <CardTitle className="flex items-center gap-2 text-green-800">
            {editingItem ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {editingItem ? "Edit Unit UMKM" : "Tambah Unit UMKM Baru"}
          </CardTitle>
          {editingItem && (
            <div className="text-sm text-gray-600">
              Mengedit unit: <span className="font-medium">{editingItem.name}</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Category Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Unit UMKM *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Masukkan nama unit UMKM..."
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Deskripsi unit UMKM, produk/layanan yang ditawarkan..."
                rows={4}
                required
                disabled={loading}
              />
            </div>

            {/* Image Upload */}
            <ImageUpload
              label="Gambar Unit UMKM"
              value={formData.image_url}
              onChange={(url, path) => setFormData(prev => ({ 
                ...prev, 
                image_url: url, 
                image_path: path || "" 
              }))}
              placeholder="https://example.com/umkm-image.jpg"
              folder="umkm"
            />

            {/* Contact and Location Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_person">Penanggung Jawab</Label>
                <Input
                  id="contact_person"
                  value={formData.contact_person}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact_person: e.target.value }))}
                  placeholder="Nama penanggung jawab"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_number">Nomor Kontak</Label>
                <Input
                  id="contact_number"
                  value={formData.contact_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact_number: e.target.value }))}
                  placeholder="Nomor telepon/WhatsApp"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Location and Year Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Alamat lengkap unit UMKM"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="established_year">Tahun Didirikan</Label>
                <Input
                  id="established_year"
                  type="number"
                  min="2000"
                  max={new Date().getFullYear()}
                  value={formData.established_year}
                  onChange={(e) => setFormData(prev => ({ ...prev, established_year: parseInt(e.target.value) || new Date().getFullYear() }))}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Active Status Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                disabled={loading}
              />
              <Label htmlFor="is_active" className="text-sm">
                Unit aktif beroperasi
              </Label>
              <div className="text-xs text-gray-500">
                (unit akan ditampilkan di halaman publik)
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                type="submit" 
                disabled={loading} 
                className="bg-green-600 hover:bg-green-700"
              >
                {loading 
                  ? "Menyimpan..." 
                  : editingItem 
                    ? "Perbarui Unit UMKM" 
                    : "Tambah Unit UMKM"
                }
              </Button>
              {editingItem && (
                <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
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
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Eye className="h-5 w-5" />
            Daftar Unit UMKM ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && items.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data unit UMKM...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="mb-4">🏢</div>
              <h3 className="font-medium mb-2">Belum ada unit UMKM</h3>
              <p className="text-sm">Tambahkan unit UMKM pertama menggunakan form di atas!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 flex-1">
                      {/* Image */}
                      {item.image_url && (
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border bg-gray-100">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title and badges */}
                        <div className="flex items-start gap-2 mb-2 flex-wrap">
                          <h3 className="font-semibold text-green-800 text-lg leading-tight">
                            {item.name}
                          </h3>
                          <div className="flex gap-1 flex-shrink-0">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge variant={item.is_active ? 'default' : 'secondary'} className="text-xs">
                              {item.is_active ? 'Aktif' : 'Tidak Aktif'}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        
                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                          {item.contact_person && (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {item.contact_person}
                            </div>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            Didirikan {item.established_year}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        disabled={loading}
                        className="hover:bg-green-50"
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