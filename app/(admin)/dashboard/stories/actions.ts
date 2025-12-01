"use server";
import { createClient } from "@/lib/supabase/server";

interface StoryData {
  title: string;
  content: string;
  image?: string | null;
  url?: string | null;
  tag?: string | null;
  custom_tag?: string | null;
  position?: number | null;
  row_position?: number | null;
  subheader?: string | null;
};

async function updatePosition(storyId: number, position: number | null, rowPosition: number | null = null) {
  const supabase = await createClient();

  if (position && rowPosition) {
    // Check if this specific position is already taken
    const { data: existingStory } = await supabase
      .from("stories")
      .select("id")
      .eq("position", position)
      .eq("row_position", rowPosition)
      .neq("id", storyId);

    if (existingStory && existingStory.length > 0) {
      throw new Error("This specific position is already taken");
    }
  }

  const { error } = await supabase
    .from("stories")
    .update({ 
      position,
      row_position: position ? rowPosition : null // Clear row_position if removing from frontpage
    })
    .eq("id", storyId);

  if (error) throw new Error("Failed to update position");
}

async function addStory(data: StoryData) {
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

async function handleAddToRow(formData: FormData) {
  const storyId = Number(formData.get("storyId"));
  const position = Number(formData.get("position"));
  await addStoryToRow(position, storyId);
}

async function handleUpdatePosition(formData: FormData) {
  const storyId = Number(formData.get("storyId"));
  const positionData = formData.get("position") as string;
  
  if (positionData === "null") {
    await updatePosition(storyId, null, null);
  } else {
    // Parse position data like "1-2" (row 1, position 2)
    const [position, rowPosition] = positionData.split("-").map(Number);
    await updatePosition(storyId, position, rowPosition);
  }
}

export async function updateStory(storyId: number, data: Partial<StoryData>) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("stories")
    .update(data)
    .eq("id", storyId);

  if (error) throw new Error("Failed to update story");
}

export async function deleteStory(storyId: number) {
  const supabase = await createClient();
  
  // First remove from frontpage_positions if it exists
  await supabase
    .from("frontpage_positions")
    .delete()
    .eq("story_id", storyId);
  
  // Then delete the story
  const { error } = await supabase
    .from("stories")
    .delete()
    .eq("id", storyId);

  if (error) throw new Error("Failed to delete story");
}

async function handleDeleteStory(formData: FormData) {
  const storyId = Number(formData.get("storyId"));
  await deleteStory(storyId);
}

export { addStory, addStoryToRow, handleAddToRow, updatePosition, handleUpdatePosition, handleDeleteStory };