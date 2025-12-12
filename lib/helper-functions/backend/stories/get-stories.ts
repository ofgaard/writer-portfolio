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

function normalizeTag(tag: string) {
  return tag.trim();
}

export async function getStories(tag?: string) {
  const supabase = await createClient();
  
  let query = supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false });

  if (tag) {
    query = query.ilike("tag", normalizeTag(tag));
  }

  const { data: stories, error } = await query;

  if (error) {
    throw error;
  }
  
  return stories || [];
}