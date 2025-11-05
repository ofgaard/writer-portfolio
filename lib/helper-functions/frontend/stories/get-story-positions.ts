import { createClient } from "@/lib/supabase/server";

export interface Story {
  id: number;
  title: string;
  content: string;
  tag: string | null;
  url: string | null;
  image: string | null;
  custom_tag: string | null;
  created_at: string;
  position: number | null;
}

export async function getStoryPositions() {
  const supabase = await createClient();
  
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .not("position", "is", null) 
    .order("position", { ascending: true });

  if (error) throw new Error("Failed to load stories");
  if (!stories) return {};


  const grouped = stories.reduce<Record<number, Story[]>>((acc, story) => {
    if (story.position) { 
      if (!acc[story.position]) {
        acc[story.position] = [];
      }
      acc[story.position].push(story);
    }
    return acc;
  }, {});

  return grouped;
}