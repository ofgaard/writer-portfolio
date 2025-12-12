import { createClient } from "@/lib/supabase/server";

export interface Story {
  id: number;
  title: string;
  content: string;
  created_at: string;
  position: number | null;
  tag: string | null;
  url: string | null;
  image: string | null;
  custom_tag: string | null;
}

export async function getStories(tag?: string) {
  const supabase = await createClient();
  
  let query = supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false });

  if (tag) {
    query = query.eq("tag", tag);
  }

  const { data: stories, error } = await query;

  if (error) {
    console.error("Database error:", error);
    throw new Error("Failed to load stories");
  }

  console.log(`Loaded ${stories?.length || 0} stories with tag: ${tag || 'all'}`);
  
  return stories || [];
}