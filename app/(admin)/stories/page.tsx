import { createClient } from "@/lib/supabase/server";
import AddStory from "@/components/dashboard/stories/add-story";
import { addStoryToRow } from "./actions";

export default async function StoriesList() {
  const supabase = await createClient();
  const { data: stories, error } = await supabase
    .from("stories")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading stories.</div>;
  }

  async function handleAddToRow(formData: FormData) {
    "use server";
    const storyId = Number(formData.get("storyId"));
    const position = Number(formData.get("position"));
    await addStoryToRow(position, storyId);
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
            <form action={handleAddToRow} className="flex gap-2 mt-2">
              <input type="hidden" name="storyId" value={story.id} />
              <select name="position" required>
                <option value="">Select row</option>
                {[1, 2, 3, 4, 5, 6].map((row) => (
                  <option key={row} value={row}>
                    Row {row}
                  </option>
                ))}
              </select>
              <button type="submit">Add to row</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}