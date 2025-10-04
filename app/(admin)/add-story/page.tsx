"use client";
import TextEditor from "@/components/dashboard/site/text-editor/index";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addStory } from "../stories/actions";

export default function AddStoryPage() {
const [post, setPost] = useState("");

const onChange = (content: string) => {
    setPost(content);
    console.log(content);
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    await addStory({ title, content: post });
    alert("Story added!");
    setPost("");
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-4">
        <input type="text" name="title" className="border rounded w-full p-2" placeholder="Title" />
      <TextEditor content={post} onChange={onChange} />
      <div className="mt-4 flex justify-end space-x-2">
      <Button variant='secondary' className="ml-2">Save Draft</Button>
      <Button variant="secondary" type="submit" className="">Submit</Button>
      </div>
    </form>
  );
}
