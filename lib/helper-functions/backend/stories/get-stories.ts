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
  console.log("getStories called with tag:", tag);
  
  try {
    const supabase = await createClient();
    console.log("Supabase client created");
    
    let query = supabase
      .from("stories")
      .select("*")
      .order("created_at", { ascending: false });

    if (tag) {
      console.log("Filtering by tag:", tag);
      query = query.ilike("tag", tag);
    }

    const { data: stories, error } = await query;
    
    console.log("Query result - error:", error, "stories count:", stories?.length);

    if (error) {
      console.error("Database error:", error);
      throw new Error(`Failed to load stories: ${error.message}`);
    }

    console.log(`Loaded ${stories?.length || 0} stories with tag: ${tag || 'all'}`);
    if (stories && stories.length > 0) {
      console.log("First story tags:", stories.slice(0, 3).map(s => ({ id: s.id, title: s.title, tag: s.tag })));
    }
    
    return stories || [];
  } catch (err) {
    console.error("Exception in getStories:", err);
    throw err;
  }
}