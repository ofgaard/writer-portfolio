 
"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export const getProfile = async () => {

 const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  console.log("Profile:", { profile, error, userId: user.id });

  return profile;
};

export async function handleProfileSubmit(formData: {
    photo?: string | null;
    header?: string | null;
    bio?: string | null;
    linkedin?: string | null;
    facebook?: string | null;
    instagram?: string | null;
  }) {

    
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    const profileData = {
      user_id: user.id,
      photo: formData.photo || null,
      header: formData.header || null,
      bio: formData.bio || null,
      linkedin: formData.linkedin || null,
      facebook: formData.facebook || null,
      instagram: formData.instagram || null,
      updated_at: new Date().toISOString(),
    };

    await supabase
      .from("profiles")
      .upsert(profileData, {
        onConflict: "user_id"
      });

    revalidatePath("/dashboard/profile");
  }