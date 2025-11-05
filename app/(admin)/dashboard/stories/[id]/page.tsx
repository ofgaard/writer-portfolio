import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface StoryPageProps {
  params: { id: string };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const supabase = await createClient();
  
  const { data: story, error } = await supabase
    .from("stories")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !story) {
    notFound();
  }

  return (
    <div>
      <h1>{story.title}</h1>
      {/* ... rest of your story detail UI ... */}
    </div>
  );
}