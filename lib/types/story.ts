export interface Story {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  url?: string | null;
  tag?: string | null;
  custom_tag?: string | null;
  position?: number | null;
  row_position?: number | null; // 1=left, 2=middle, 3=right
  created_at: string;
  subheader?: string | null;
}

export interface StoryData {
  title: string;
  content: string;
  image?: string | null;
  url?: string | null;
  tag?: string | null;
  custom_tag?: string | null;
  position?: number | null;
  row_position?: number | null; // 1=left, 2=middle, 3=right
  subheader?: string | null;
}
