import { getStories, type Story } from "@/lib/helper-functions/backend/stories/get-stories";
import StoryCard from "@/components/dashboard/stories/story-card";

export default async function PressStoriesList() {
  let stories: Story[];
  
  try {
    stories = await getStories("press");
  } catch (error) {
    console.error("Failed to load press stories:", error);
    return <div>Error loading press stories.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Press & Communication</h1>
      {stories.length === 0 ? (
        <div>No press stories found.</div>
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