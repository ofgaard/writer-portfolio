
import ProfileForm from "@/components/dashboard/profile/profile-form";
import { getProfile, handleProfileSubmit } from "@/lib/functions/database/profile";


export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div>
      <ProfileForm initialData={profile} onSubmit={handleProfileSubmit} key={profile?.id || 'new'} />
    </div>
  );
}