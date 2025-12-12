import { getStories, type Story } from "@/lib/helper-functions/backend/stories/get-stories";
import StoryColumn from "@/components/site/stories/story-column";

export default async function PressPage() {
  let stories: Story[];
  
  try {
    stories = await getStories("Press");
    console.log("Press stories found:", stories.length);
  } catch (error) {
    console.error("Failed to load press stories:", error);
    return <div>Error loading press stories.</div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Press & Communication</h1>

      </div>

      {stories.length > 0 ? (
        <StoryColumn stories={stories} />
      ) : (
        <div className="text-center text-muted-foreground">
          No press stories found.
        </div>
      )}
    </div>
  );
}