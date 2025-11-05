import StoryForm from "@/components/dashboard/stories/story-form";
import { addStory } from "../stories/actions";
import { redirect } from "next/navigation";

export default function AddStoryPage() {
  async function handleCreate(data: Partial<Story>) {
    "use server";
    await addStory(data);
    redirect("/stories");
  }

  return (
    <div>
      <StoryForm onSubmit={handleCreate} />
    </div>
  );
}