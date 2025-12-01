export interface Profile {
  id: string;
  user_id: string;
  photo: string | null;
  header: string | null;
  bio: string | null;
  linkedin: string | null;
  facebook: string | null;
  instagram: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileFormData {
  photo: string;
  header: string;
  bio: string;
  linkedin: string;
  facebook: string;
  instagram: string;
}
