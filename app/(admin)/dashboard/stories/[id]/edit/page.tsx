import { createClient } from "@/lib/supabase/server";
import StoryForm from "@/components/dashboard/stories/story-form";
import { updateStory } from "../../actions";
import { redirect } from "next/navigation";
import { StoryData } from "@/lib/types/story";

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  const { data: story, error } = await supabase
    .from("stories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !story) {
    return <div>Story not found</div>;
  }

  async function handleUpdate(data: Partial<StoryData>) {
    "use server";
    await updateStory(parseInt(id), data);
    redirect("/dashboard/stories");
  }

  return (
    <div>
      <StoryForm 
        initialData={story} 
        onSubmit={handleUpdate}
        submitLabel="Update Story"
      />
    </div>
  );
}