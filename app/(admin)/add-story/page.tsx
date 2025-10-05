"use client";
import TextEditor from "@/components/dashboard/site/text-editor/index";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addStory } from "../stories/actions";
import UploadImage from "@/components/dashboard/stories/upload-image";

export default function AddStoryPage() {
const [imageUrl, setImageUrl] = useState("");
const [post, setPost] = useState("");

const handleImageUpload = (url: string) => {
  setImageUrl(url);
};

const onChange = (content: string) => {
    setPost(content);
    console.log(content);
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const tag = formData.get("tag") as string;
    const custom_tag = formData.get("custom_tag") as string;
    await addStory({ title, content: post, url, tag, custom_tag, image: imageUrl });
    alert("Story added!");
    setPost("");
    setImageUrl("");
    window.location.href = "/stories";
  };

  return (

  <div>
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-4">
        <h1>Add Entry ...</h1>
        <input type="text" name="title" className="border rounded w-full p-2" placeholder="Title" />
        <div>
        <UploadImage onUploadComplete={handleImageUpload} />
        </div>
        <input type="text" name="url" className="border rounded w-full p-2" placeholder="URL" />
        <select name="tag" id="" className="border rounded w-full p-2">
          <option value="journalism">Journalism</option>
          <option value="press">Press</option>
        </select>
        <input type="text" name="custom_tag" className="border rounded w-full p-2" placeholder="Label (e.g. Analysis, Election 2025 etc.)" />
        <TextEditor content={post} onChange={onChange} />
        <div className="mt-4 flex justify-end space-x-2">
        <Button variant='secondary' className="ml-2">Save Draft</Button>
        <Button variant="secondary" type="submit" className="bg-blue-500 hover:bg-blue-400">Submit</Button>
        </div>
    </form>
    </div>

  );
}
