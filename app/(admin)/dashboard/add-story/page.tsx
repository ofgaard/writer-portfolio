import StoryForm from "@/components/dashboard/stories/story-form";
import { addStory } from "../stories/actions";
import { redirect } from "next/navigation";
import { Story } from "@/lib/types/story";

export default function AddStoryPage() {
  async function handleCreate(data: Partial<Story>) {
    "use server";
    

    if (!data.title || !data.content) {
      throw new Error("Title and content are required");
    }

    await addStory({
      title: data.title,
      content: data.content,
      image: data.image || undefined,
      url: data.url || undefined,
      tag: data.tag || undefined,
      custom_tag: data.custom_tag || undefined,
    });
    redirect("/dashboard/stories");
  }

  return (
    <div>
      <StoryForm onSubmit={handleCreate} />
    </div>
  );
}