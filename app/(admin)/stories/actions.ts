"use server";
import { createClient } from "@/lib/supabase/server";

async function addStory(data: { title: string; content: string }) {
  const supabase = await createClient();
  const { error } = await supabase.from("stories").insert([data]);
  if (error) {
    throw new Error("Error adding story");
  }
}

async function addStoryToRow(position: number, storyId: number) {
  const supabase = await createClient();


  const { data: existingStories, error } = await supabase
    .from("frontpage_positions")
    .select("id")
    .eq("position", position);

  if (error) throw new Error("Error checking row");

  if (existingStories.length >= 3) {
    throw new Error("This row is full (max 3 stories).");
  }

  const { error: insertError } = await supabase
    .from("frontpage_positions")
    .insert([{ position, story_id: storyId }]);

  if (insertError) throw new Error("Error adding story to row");
}

export { addStory, addStoryToRow };