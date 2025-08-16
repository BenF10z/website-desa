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
import { Trash2, Edit, Plus, Eye, Calendar, User, Images } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { MultipleImageUpload } from "@/components/ui/multiple-image-upload";

interface BeritaItem {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image: string;
  additional_images: string[];
  image_paths: string[];
  author: string;
  category: string;
  is_featured: boolean;
  status: string;
  published_at: string;
}

interface BeritaFormProps {
  onChange?: () => void;
}

export default function BeritaForm({ onChange }: BeritaFormProps) {
  const [items, setItems] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<BeritaItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    slug: "",
    featured_image: "",
    additional_images: [] as string[],
    image_paths: [] as string[],
    author: "Admin Desa",
    category: "Berita Umum",
    is_featured: false,
    status: "published",
  });

  const { toast } = useToast();

  const categories = [
    "Berita Umum",
    "Kegiatan Desa",
    "Pembangunan",
    "Ekonomi",
    "Sosial",
    "Budaya",
    "Lingkungan",
    "Pemerintahan",
    "Wisata",
    "UMKM"
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/berita");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        throw new Error("Gagal memuat data berita");
      }
    } catch (error) {
      console.error("Error fetching berita:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data berita",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title.trim() || !formData.content.trim()) {
        throw new Error("Judul dan konten wajib diisi");
      }

      const dataToSubmit = {
        ...formData,
        slug: formData.slug.trim() || generateSlug(formData.title),
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim(),
        author: formData.author.trim() || "Admin Desa",
        additional_images: formData.additional_images,
        image_paths: formData.image_paths,
      };

      const url = editingItem ? `/api/berita/${editingItem.id}` : "/api/berita";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: `Berita berhasil ${editingItem ? "diperbarui" : "ditambahkan"}`,
        });
        resetForm();
        fetchItems();
        if (onChange) onChange();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menyimpan berita");
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

  const handleEdit = (item: BeritaItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      excerpt: item.excerpt || "",
      slug: item.slug,
      featured_image: item.featured_image || "",
      additional_images: item.additional_images || [],
      image_paths: item.image_paths || [],
      author: item.author,
      category: item.category,
      is_featured: item.is_featured,
      status: item.status,
    });
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus berita "${title}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/berita/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Berita berhasil dihapus",
        });
        fetchItems();
        if (onChange) onChange();
      } else {
        throw new Error("Gagal menghapus berita");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus berita",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      slug: "",
      featured_image: "",
      additional_images: [],
      image_paths: [],
      author: "Admin Desa",
      category: "Berita Umum",
      is_featured: false,
      status: "published",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug === generateSlug(prev.title) || !prev.slug ? generateSlug(title) : prev.slug
    }));
  };

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            {editingItem ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {editingItem ? "Edit Berita" : "Tambah Berita Baru"}
          </CardTitle>
          {editingItem && (
            <div className="text-sm text-gray-600">
              Mengedit berita: <span className="font-medium">{editingItem.title}</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Slug Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Berita *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Masukkan judul berita..."
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-artikel (otomatis dari judul)"
                  disabled={loading}
                />
                <div className="text-xs text-gray-500">
                  URL artikel: /berita-desa/{formData.slug || "url-artikel"}
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Ringkasan singkat artikel (opsional)..."
                rows={3}
                disabled={loading}
              />
              <div className="text-xs text-gray-500">
                Ringkasan akan ditampilkan di halaman daftar berita
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Konten Berita *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Tulis konten lengkap berita di sini..."
                rows={12}
                required
                disabled={loading}
              />
              <div className="text-xs text-gray-500">
                Gunakan enter untuk paragraf baru. Konten akan diformat otomatis.
              </div>
            </div>

            {/* Featured Image Upload */}
            <ImageUpload
              label="Gambar Utama"
              value={formData.featured_image}
              onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
              placeholder="https://example.com/image.jpg"
            />

            {/* Additional Images Upload */}
            <div className="border-t pt-6">
              <MultipleImageUpload
                label="Gambar Tambahan (Opsional)"
                images={formData.additional_images}
                imagePaths={formData.image_paths}
                onChange={(images, paths) => setFormData(prev => ({ 
                  ...prev, 
                  additional_images: images, 
                  image_paths: paths 
                }))}
                maxImages={5}
              />
            </div>

            {/* Author, Category, Status Row */}
            <div className="grid md:grid-cols-3 gap-4 border-t pt-6">
              <div className="space-y-2">
                <Label htmlFor="author">Penulis</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Nama penulis"
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

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center space-x-2 border-t pt-6">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                disabled={loading}
              />
              <Label htmlFor="is_featured" className="text-sm">
                Jadikan berita unggulan
              </Label>
              <div className="text-xs text-gray-500">
                (akan ditampilkan di section khusus)
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
                    ? "Perbarui Berita" 
                    : "Tambah Berita"
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
            Daftar Berita ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && items.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data berita...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="mb-4">📝</div>
              <h3 className="font-medium mb-2">Belum ada berita</h3>
              <p className="text-sm">Tambahkan berita pertama menggunakan form di atas!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Title and badges */}
                      <div className="flex items-start gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-green-800 text-lg leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex gap-1 flex-shrink-0">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          {item.is_featured && (
                            <Badge className="bg-green-600 text-xs">Unggulan</Badge>
                          )}
                          <Badge variant={item.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                            {item.status}
                          </Badge>
                          {(item.additional_images && item.additional_images.length > 0) && (
                            <Badge variant="outline" className="text-xs bg-blue-50">
                              <Images className="h-3 w-3 mr-1" />
                              +{item.additional_images.length}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.excerpt || item.content.substring(0, 150) + "..."}
                      </p>
                      
                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(item.published_at)}
                        </div>
                        <div className="text-gray-400">
                          Slug: /{item.slug}
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
                        onClick={() => handleDelete(item.id, item.title)}
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