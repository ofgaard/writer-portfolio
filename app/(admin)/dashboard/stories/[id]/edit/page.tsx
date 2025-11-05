import { createClient } from "@/lib/supabase/server";
import StoryForm from "@/components/dashboard/stories/story-form";
import { updateStory } from "../../actions";
import { redirect } from "next/navigation";

export default async function EditStoryPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const { data: story, error } = await supabase
    .from("stories")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !story) {
    return <div>Story not found</div>;
  }

  async function handleUpdate(data: Partial<Story>) {
    "use server";
    await updateStory(parseInt(params.id), data);
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