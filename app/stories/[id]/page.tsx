import { createClient } from "@/lib/supabase/server";

export default async function StoryPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: story, error } = await supabase
    .from("stories")
    .select("id, title, content, created_at")
    .eq("id", params.id)
    .single();

  if (error || !story) {
    return <div>Story not found.</div>;
  }

  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.content}</p>
      <small>{new Date(story.created_at).toLocaleString()}</small>
    </div>
  );
}