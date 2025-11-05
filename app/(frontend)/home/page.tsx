import LargeStory from "@/components/site/stories/large-story";
import StoryGrid from "@/components/site/stories/story-grid";
import { getStoryPositions } from "@/lib/helper-functions/frontend/stories/get-story-positions";

export default async function Home() {
  try {
    const groupedStories = await getStoryPositions();

    if (Object.keys(groupedStories).length === 0) {
      return <div>No stories found.</div>;
    }

    return (
      <div className="flex flex-col items-center mt-10 gap-16 w-full min-h-screen py-2">
        {Object.entries(groupedStories).map(([position, stories]) => (
          stories.length === 1 
            ? <LargeStory key={position} story={stories[0]} />
            : <StoryGrid key={position} stories={stories} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Error loading stories.</div>;
  }
}