import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Linkedin, Facebook, Instagram } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .single();

  if (!profile) {
    return (
      <div className="flex flex-col gap-8 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Profile</h1>
          <p>No profile found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row-reverse gap-8 items-center md:items-stretch">
        {profile.photo && (
          <Image
            src={profile.photo}
            alt={profile.header || "Profile photo"}
            width={200}
            height={200}
            className="rounded-full object-cover"
            style={{ width: '200px', height: '200px' }}
          />
        )}
        
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          {profile.header && (
            <h1 className="text-4xl font-bold">{profile.header}</h1>
          )}
          
          {profile.bio && (
            <p className="max-w-[80%] whitespace-pre-wrap">{profile.bio}</p>
          )}

          <div className="flex gap-4 justify-center md:justify-start mt-auto pt-8">
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={15} />
              </a>
            )}
            {profile.facebook && (
              <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
                <Facebook size={15} />
              </a>
            )}
            {profile.instagram && (
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}