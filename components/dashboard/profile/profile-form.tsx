"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import UploadImage from "@/components/dashboard/stories/upload-image";
import { Profile } from "@/lib/types/profile";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
  initialData?: Profile;
  onSubmit: (data: Partial<Profile>) => Promise<void>;
}

export default function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const [imageUrl, setImageUrl] = useState(initialData?.photo || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialData?.photo) {
      setImageUrl(initialData.photo);
    }
  }, [initialData?.photo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    await onSubmit({
      photo: imageUrl,
      header: formData.get("header") as string,
      bio: formData.get("bio") as string,
      linkedin: formData.get("linkedin") as string,
      facebook: formData.get("facebook") as string,
      instagram: formData.get("instagram") as string,
    });
    
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-4">
      <h1>Edit Profile</h1>
      
      <div>
        <label className="block text-sm font-medium mb-1">Profile Photo</label>
        <UploadImage 
          onUploadComplete={url => setImageUrl(url)}
          currentImage={imageUrl}
        />
      </div>

      <div>
        <label htmlFor="header" className="block text-sm font-medium mb-1">Header</label>
        <input 
          id="header"
          type="text" 
          name="header" 
          defaultValue={initialData?.header || ""}
          className="border rounded w-full p-2" 
          required
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={initialData?.bio || ""}
          className="border rounded w-full p-2 min-h-[150px]"
          required
        />
      </div>

      <h3 className="text-lg font-semibold pt-4">Social Links (Optional)</h3>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium mb-1">LinkedIn</label>
        <input 
          id="linkedin"
          type="url" 
          name="linkedin" 
          defaultValue={initialData?.linkedin || ""}
          className="border rounded w-full p-2" 
        />
      </div>

      <div>
        <label htmlFor="facebook" className="block text-sm font-medium mb-1">Facebook</label>
        <input 
          id="facebook"
          type="url" 
          name="facebook" 
          defaultValue={initialData?.facebook || ""}
          className="border rounded w-full p-2" 
        />
      </div>

      <div>
        <label htmlFor="instagram" className="block text-sm font-medium mb-1">Instagram</label>
        <input 
          id="instagram"
          type="url" 
          name="instagram" 
          defaultValue={initialData?.instagram || ""}
          className="border rounded w-full p-2" 
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button 
          variant="secondary" 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
}
