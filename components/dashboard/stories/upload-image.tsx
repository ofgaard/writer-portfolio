"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadImageProps {
  onUploadComplete?: (url: string) => void;
  currentImage?: string;
}

export default function UploadImage({ onUploadComplete, currentImage }: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const displayImage = imageUrl || currentImage;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setImageUrl(data.url);
      onUploadComplete?.(data.url);
      console.log("Upload successful:", data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
        <label htmlFor="file-upload" className="block text-xs">
          Upload Image
        </label>
    <div className="flex items-center space-x-2">
      <Input type="file" onChange={handleFileSelect} accept="image/*" className="max-w-sm" />
       <Button onClick={handleUpload} disabled={!file || loading} variant="secondary">
        {loading ? "Uploading..." : "Upload Image"}
      </Button>

</div>
    
     
      {displayImage && (
        <div className="mt-4">
          <Image 
            src={displayImage} 
            alt="Preview" 
            width={128}
            height={128}
            className="max-h-32 rounded shadow object-cover"
          />
        </div>
      )}
    </div>
  );
}