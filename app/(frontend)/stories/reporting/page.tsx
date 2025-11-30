import { getStories, type Story } from "@/lib/helper-functions/backend/stories/get-stories";
import StoryColumn from "@/components/site/stories/story-column";

export default async function ReportingPage() {
  let stories: Story[];
  
  try {
    stories = await getStories("Journalism");
  } catch (error) {
    console.error("Failed to load reporting stories:", error);
    return <div>Error loading reporting stories.</div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Reporting</h1>
      </div>

      {stories.length > 0 ? (
        <StoryColumn stories={stories} />
      ) : (
        <div className="text-center text-muted-foreground">
          No reporting stories found.
        </div>
      )}
    </div>
  );
}