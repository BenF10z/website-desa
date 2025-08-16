"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, Plus, X } from "lucide-react";
import Image from "next/image";

interface UploadedImage {
  url: string;
  path: string;
  filename: string;
}

interface MultipleImageUploadProps {
  label: string;
  images: string[];
  imagePaths: string[];
  onChange: (images: string[], paths: string[]) => void;
  maxImages?: number;
}

export function MultipleImageUpload({ 
  label, 
  images, 
  imagePaths,
  onChange, 
  maxImages = 5 
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      toast({
        title: "Terlalu banyak gambar",
        description: `Maksimal ${maxImages} gambar`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const newImages: string[] = [];
    const newPaths: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }

        const result: UploadedImage = await response.json();
        newImages.push(result.url);
        newPaths.push(result.path);
      }

      onChange([...images, ...newImages], [...imagePaths, ...newPaths]);

      toast({
        title: "Upload berhasil!",
        description: `${newImages.length} gambar berhasil diupload`,
      });
    } catch (error) {
      toast({
        title: "Upload gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Filter only image files
      const imageFiles = Array.from(files).filter(file => file.type.startsWith("image/"));
      if (imageFiles.length > 0) {
        const fileList = new DataTransfer();
        imageFiles.forEach(file => fileList.items.add(file));
        handleFileUpload(fileList.files);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleRemoveImage = async (index: number) => {
    const imageUrl = images[index];
    const imagePath = imagePaths[index];
    
    if (imageUrl && imageUrl.includes("supabase") && imagePath) {
      try {
        await fetch(`/api/upload?path=${encodeURIComponent(imagePath)}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    
    const newImages = images.filter((_, i) => i !== index);
    const newPaths = imagePaths.filter((_, i) => i !== index);
    onChange(newImages, newPaths);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">{label}</Label>
      
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver 
              ? "border-green-500 bg-green-50" 
              : "border-gray-300 hover:border-green-400"
          } ${uploading ? "opacity-50" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-3">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Plus className="h-full w-full" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Drag & drop gambar tambahan ke sini atau
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                size="sm"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : "Pilih File"}
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                {images.length}/{maxImages} gambar • Bisa pilih multiple files
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="relative h-32 w-full rounded-lg overflow-hidden border bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={`Additional image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                  disabled={uploading}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Format yang didukung: JPG, PNG, GIF, WebP</p>
        <p>• Ukuran maksimal per file: 5MB</p>
        <p>• Maksimal {maxImages} gambar tambahan</p>
        <p>• Bisa upload multiple files sekaligus</p>
      </div>
    </div>
  );
}