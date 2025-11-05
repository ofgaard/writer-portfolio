"use client";
import TextEditor from "@/components/dashboard/site/text-editor/index";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UploadImage from "@/components/dashboard/stories/upload-image";
import { Story } from "@/lib/types/story";
import Link from "next/link";

interface StoryFormProps {
  initialData?: Story;
  onSubmit: (data: Partial<Story>) => Promise<void>;
  submitLabel?: string;
}

export default function StoryForm({ initialData, onSubmit, submitLabel = "Submit" }: StoryFormProps) {
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [post, setPost] = useState(initialData?.content || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await onSubmit({
      title: formData.get("title") as string,
      content: post,
      url: formData.get("url") as string,
      tag: formData.get("tag") as string,
      custom_tag: formData.get("custom_tag") as string,
      image: imageUrl
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-4">
      <h1>{initialData ? 'Edit Story' : 'Add Entry ...'}</h1>
      <input 
        type="text" 
        name="title" 
        defaultValue={initialData?.title}
        className="border rounded w-full p-2" 
        placeholder="Title" 
      />
      <div>
        <UploadImage 
          onUploadComplete={url => setImageUrl(url)}
          currentImage={imageUrl}
        />
      </div>
      <input 
        type="text" 
        name="url" 
        defaultValue={initialData?.url}
        className="border rounded w-full p-2" 
        placeholder="URL" 
      />
      <select 
        name="tag" 
        defaultValue={initialData?.tag}
        className="border rounded w-full p-2"
      >
        <option value="journalism">Journalism</option>
        <option value="press">Press</option>
      </select>
      <input 
        type="text" 
        name="custom_tag" 
        defaultValue={initialData?.custom_tag}
        className="border rounded w-full p-2" 
        placeholder="Label (e.g. Analysis, Election 2025 etc.)" 
      />
      <TextEditor content={post} onChange={setPost} />
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant='secondary' className="ml-2 bg-red-600"><Link href="/dashboard/stories">Cancel</Link></Button>
        <Button 
          variant="secondary" 
          type="submit" 
          className=""
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}