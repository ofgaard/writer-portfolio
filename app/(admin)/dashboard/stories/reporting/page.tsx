import { getStories, type Story } from "@/lib/helper-functions/backend/stories/get-stories";
import StoryCard from "@/components/dashboard/stories/story-card";

export default async function ReportingStoriesList() {
  let stories: Story[];
  
  try {
    stories = await getStories("journalism");
  } catch (error) {
    console.error("Failed to load reporting stories:", error);
    return <div>Error loading reporting stories.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reporting Stories</h1>
      {stories.length === 0 ? (
        <div>No reporting stories found.</div>
      ) : (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}