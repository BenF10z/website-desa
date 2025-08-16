"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, Image, X, ExternalLink } from "lucide-react";
import NextImage from "next/image";

interface UploadedImage {
  url: string;
  path: string;
  filename: string;
}

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string, path?: string) => void;
  onPathChange?: (path: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function ImageUpload({ 
  label, 
  value, 
  onChange, 
  onPathChange,
  placeholder = "https://example.com/image.jpg",
  required = false 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
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
      onChange(result.url, result.path);
      if (onPathChange) onPathChange(result.path);

      toast({
        title: "Upload berhasil!",
        description: "Gambar berhasil diupload",
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
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
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

  const handleRemoveImage = async () => {
    if (value && value.includes("supabase")) {
      // Extract path from supabase URL for deletion
      try {
        const url = new URL(value);
        const pathParts = url.pathname.split("/");
        const path = pathParts.slice(pathParts.indexOf("berita")).join("/");
        
        await fetch(`/api/upload?path=${encodeURIComponent(path)}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    
    onChange("", "");
    if (onPathChange) onPathChange("");
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={`image-${label}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          id={`image-${label}`}
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={uploading}
        />
        {value && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => window.open(value, '_blank')}
            disabled={uploading}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Upload Area */}
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
        {value ? (
          <div className="space-y-3">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                <NextImage
                  src={value}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={handleRemoveImage}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Klik tombol X untuk menghapus atau drag & drop gambar baru
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Image className="h-full w-full" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Drag & drop gambar ke sini atau
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mx-auto"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : "Pilih File"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Format yang didukung: JPG, PNG, GIF, WebP</p>
        <p>• Ukuran maksimal: 5MB</p>
        <p>• Atau masukkan URL gambar langsung di field di atas</p>
      </div>
    </div>
  );
}