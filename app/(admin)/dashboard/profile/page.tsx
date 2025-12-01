import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/dashboard/profile/profile-form";
import { revalidatePath } from "next/cache";

export default async function ProfilePage() {
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

  console.log("Profile query result:", { profile, error, userId: user.id });

  async function handleProfileSubmit(formData: {
    photo?: string | null;
    header?: string | null;
    bio?: string | null;
    linkedin?: string | null;
    facebook?: string | null;
    instagram?: string | null;
  }) {
    "use server";
    
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

  return (
    <div>
      <ProfileForm initialData={profile} onSubmit={handleProfileSubmit} key={profile?.id || 'new'} />
    </div>
  );
}
