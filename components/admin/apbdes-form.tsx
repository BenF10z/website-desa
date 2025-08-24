"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, Eye, Calendar, MapPin, Coins } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

interface ApbdesItem {
  id: number;
  nama_kegiatan: string;
  bidang: string;
  anggaran_kegiatan: number;
  tahun_anggaran: number;
  foto_dokumentasi: string;
  foto_path: string;
  deskripsi: string;
  lokasi: string;
  created_at: string;
  updated_at: string;
}

interface ApbdesFormProps {
  onChange?: () => void;
}

export default function ApbdesForm({ onChange }: ApbdesFormProps) {
  const [items, setItems] = useState<ApbdesItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<ApbdesItem | null>(null);
  const [formData, setFormData] = useState({
    nama_kegiatan: "",
    bidang: "Bidang Pemerintahan",
    anggaran_kegiatan: 0,
    tahun_anggaran: new Date().getFullYear(),
    foto_dokumentasi: "",
    foto_path: "",
    deskripsi: "",
    lokasi: "",
  });

  const { toast } = useToast();

  const bidangOptions = [
    "Bidang Pemerintahan",
    "Bidang Pembangunan", 
    "Bidang Pembinaan Masyarakat",
    "Bidang Pemberdayaan Masyarakat",
    "Bidang Tidak Terduga"
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/apbdes");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        throw new Error("Gagal memuat data APBDes");
      }
    } catch (error) {
      console.error("Error fetching APBDes:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data APBDes",
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
      if (!formData.nama_kegiatan.trim() || !formData.bidang || !formData.anggaran_kegiatan || !formData.tahun_anggaran) {
        throw new Error("Nama kegiatan, bidang, anggaran, dan tahun anggaran wajib diisi");
      }

      const dataToSubmit = {
        ...formData,
        nama_kegiatan: formData.nama_kegiatan.trim(),
        deskripsi: formData.deskripsi.trim(),
        lokasi: formData.lokasi.trim(),
      };

      const url = editingItem ? `/api/apbdes/${editingItem.id}` : "/api/apbdes";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: `Data APBDes berhasil ${editingItem ? "diperbarui" : "ditambahkan"}`,
        });
        resetForm();
        fetchItems();
        if (onChange) onChange();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menyimpan data APBDes");
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

  const handleEdit = (item: ApbdesItem) => {
    setEditingItem(item);
    setFormData({
      nama_kegiatan: item.nama_kegiatan,
      bidang: item.bidang,
      anggaran_kegiatan: item.anggaran_kegiatan,
      tahun_anggaran: item.tahun_anggaran,
      foto_dokumentasi: item.foto_dokumentasi || "",
      foto_path: item.foto_path || "",
      deskripsi: item.deskripsi || "",
      lokasi: item.lokasi || "",
    });
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number, nama: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus kegiatan "${nama}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/apbdes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Data APBDes berhasil dihapus",
        });
        fetchItems();
        if (onChange) onChange();
      } else {
        throw new Error("Gagal menghapus data APBDes");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus data APBDes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      nama_kegiatan: "",
      bidang: "Bidang Pemerintahan",
      anggaran_kegiatan: 0,
      tahun_anggaran: new Date().getFullYear(),
      foto_dokumentasi: "",
      foto_path: "",
      deskripsi: "",
      lokasi: "",
    });
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

  const getBidangColor = (bidang: string) => {
    const colors: { [key: string]: string } = {
      "Bidang Pemerintahan": "bg-blue-100 text-blue-800",
      "Bidang Pembangunan": "bg-green-100 text-green-800",
      "Bidang Pembinaan Masyarakat": "bg-yellow-100 text-yellow-800",
      "Bidang Pemberdayaan Masyarakat": "bg-purple-100 text-purple-800",
      "Bidang Tidak Terduga": "bg-red-100 text-red-800",
    };
    return colors[bidang] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            {editingItem ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {editingItem ? "Edit Data APBDes" : "Tambah Data APBDes Baru"}
          </CardTitle>
          {editingItem && (
            <div className="text-sm text-gray-600">
              Mengedit kegiatan: <span className="font-medium">{editingItem.nama_kegiatan}</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Kegiatan and Bidang Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nama_kegiatan">Nama Kegiatan *</Label>
                <Input
                  id="nama_kegiatan"
                  value={formData.nama_kegiatan}
                  onChange={(e) => setFormData(prev => ({ ...prev, nama_kegiatan: e.target.value }))}
                  placeholder="Masukkan nama kegiatan..."
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bidang">Bidang *</Label>
                <Select
                  value={formData.bidang}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, bidang: value }))}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bidangOptions.map((bidang) => (
                      <SelectItem key={bidang} value={bidang}>
                        {bidang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Anggaran and Tahun Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="anggaran_kegiatan">Anggaran Kegiatan (Rp) *</Label>
                <Input
                  id="anggaran_kegiatan"
                  type="number"
                  min="0"
                  value={formData.anggaran_kegiatan}
                  onChange={(e) => setFormData(prev => ({ ...prev, anggaran_kegiatan: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                  required
                  disabled={loading}
                />
                {formData.anggaran_kegiatan > 0 && (
                  <div className="text-sm text-gray-600">
                    {formatCurrency(formData.anggaran_kegiatan)}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tahun_anggaran">Tahun Anggaran *</Label>
                <Input
                  id="tahun_anggaran"
                  type="number"
                  min="2020"
                  max={new Date().getFullYear() + 2}
                  value={formData.tahun_anggaran}
                  onChange={(e) => setFormData(prev => ({ ...prev, tahun_anggaran: parseInt(e.target.value) || new Date().getFullYear() }))}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Foto Dokumentasi Upload */}
            <ImageUpload
              label="Foto Dokumentasi"
              value={formData.foto_dokumentasi}
              onChange={(url, path) => setFormData(prev => ({ 
                ...prev, 
                foto_dokumentasi: url, 
                foto_path: path || "" 
              }))}
              placeholder="https://example.com/dokumentasi.jpg"
              folder="apbdes"
            />

            {/* Deskripsi */}
            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                placeholder="Deskripsi kegiatan APBDes..."
                rows={4}
                disabled={loading}
              />
            </div>

            {/* Lokasi */}
            <div className="space-y-2">
              <Label htmlFor="lokasi">Lokasi</Label>
              <Input
                id="lokasi"
                value={formData.lokasi}
                onChange={(e) => setFormData(prev => ({ ...prev, lokasi: e.target.value }))}
                placeholder="Lokasi pelaksanaan kegiatan"
                disabled={loading}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                type="submit" 
                disabled={loading} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading 
                  ? "Menyimpan..." 
                  : editingItem 
                    ? "Perbarui Data APBDes" 
                    : "Tambah Data APBDes"
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
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Eye className="h-5 w-5" />
            Daftar Data APBDes ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && items.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data APBDes...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="mb-4">💰</div>
              <h3 className="font-medium mb-2">Belum ada data APBDes</h3>
              <p className="text-sm">Tambahkan data APBDes pertama menggunakan form di atas!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 flex-1">
                      {/* Image */}
                      {item.foto_dokumentasi && (
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border bg-gray-100">
                          <img
                            src={item.foto_dokumentasi}
                            alt={item.nama_kegiatan}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title and badges */}
                        <div className="flex items-start gap-2 mb-2 flex-wrap">
                          <h3 className="font-semibold text-blue-800 text-lg leading-tight">
                            {item.nama_kegiatan}
                          </h3>
                          <div className="flex gap-1 flex-shrink-0">
                            <Badge className={`text-xs ${getBidangColor(item.bidang)}`} variant="outline">
                              {item.bidang}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {item.tahun_anggaran}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Description */}
                        {item.deskripsi && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {item.deskripsi}
                          </p>
                        )}
                        
                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Coins className="h-3 w-3" />
                            {formatCurrency(item.anggaran_kegiatan)}
                          </div>
                          {item.lokasi && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {item.lokasi}
                            </div>
                          )}
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
                        className="hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id, item.nama_kegiatan)}
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