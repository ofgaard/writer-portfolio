import { createClient } from "@/lib/supabase/server";

async function addStory(data: { title: string; content: string }) {
  const supabase = await createClient();
  const { error } = await supabase.from("stories").insert([data]);
  if (error) {
    throw new Error("Error adding story");
  }
}

export { addStory };