import { createClient } from "@/lib/supabase/server";
import AddStory from "@/components/dashboard/stories/add-story";

export default async function StoriesList() {
  const supabase = await createClient();
  const { data: stories, error } = await supabase
    .from("stories")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading stories.</div>;
  }

  return (
    <div>
        <AddStory />
      <h2>Stories</h2>
      <ul>
        {stories?.map((story) => (
          <li key={story.id}>
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <small>{new Date(story.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}