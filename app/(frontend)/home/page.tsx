import LargeStory from "@/components/site/stories/large-story";
import StoryGrid from "@/components/site/stories/story-grid";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();


  const { data: rows, error } = await supabase
    .from("frontpage_positions")
    .select("position, story_id")
    .order("position", { ascending: true });

  if (error) return <div>Error loading frontpage layout.</div>;


  const grouped = rows.reduce((acc, row) => {
    acc[row.position] = acc[row.position] || [];
    acc[row.position].push(row.story_id);
    return acc;
  }, {} as Record<number, number[]>);


  const allStoryIds = Array.from(new Set(rows.map(r => r.story_id)));
  const { data: stories, error: storiesError } = await supabase
    .from("stories")
    .select("*")
    .in("id", allStoryIds);

  if (storiesError) return <div>Error loading stories.</div>;

  const storyMap = Object.fromEntries(stories.map(story => [story.id, story]));

  return (
    <div className="flex flex-col items-center mt-10 gap-16 w-full min-h-screen py-2">
      {Object.entries(grouped).map(([position, storyIds]) => {
        const rowStories = storyIds.map(id => storyMap[id]).filter(Boolean);
        if (rowStories.length === 1) {
          return <LargeStory key={position} story={rowStories[0]} />;
        }
        if (rowStories.length > 1) {
          return <StoryGrid key={position} stories={rowStories} />;
        }
        return null;
      })}
    </div>
  );
}

// const mockStories = [
//   {
//     id: 1,
//     title: "How Parking Spaces Shaped the Mayoral Election of Copenhagen",
//     content:
//       "An article series for B.T. covering the recent mayoral election in Copenhagen, focusing on the impact of parking space policies on voter behavior and election outcomes.",
//     frontpageTitle: "Parking Spaces & The Mayoral Election",
//     frontpageDescription:
//       "How parking policies influenced the outcome of Copenhagen's mayoral race.",
//     frontpageImage:
//       "https://assets.thelocal.com/cdn-cgi/rs:fit:850/quality:75/plain/https://apiwp.thelocal.com/wp-content/uploads/2024/09/20210929-121208-2-1920x1280web-1.jpg",
//     frontpageTag: "Article Series",
//   },
//   {
//     id: 2,
//     title: "Ekspert gennemhuller EU-lov om håndbagage",
//     content:
//       "Interviews with several economists talking about the consequences of making hand luggage free in EU airlines.",
//     frontpageTitle: "EU Hand Luggage Law Critiqued",
//     frontpageDescription:
//       "Economists discuss the impact of new EU hand luggage regulations.",
//     frontpageImage:
//       "https://bt.bmcdn.dk/media/cache/resolve/image_1240/image/231/2319090/24985767-airport-employees-carry-luggages-at-the-new-tempor.jpg",
//     frontpageTag: "Expert Analysis",
//   },
//   {
//     id: 3,
//     title: "The Rise of Green Urban Spaces",
//     content:
//       "A look at how cities are transforming unused lots into vibrant green spaces for communities.",
//     frontpageTitle: "Green Urban Spaces",
//     frontpageDescription:
//       "Cities are turning empty lots into parks and gardens for all.",
//     frontpageImage:
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
//     frontpageTag: "Urban Development",
//   },
// ];

// const featuredStory = {
//   id: 1,
//   title: "How Parking Spaces Shaped the Mayoral Election of Copenhagen",
//   content:
//     "An article series for B.T. covering the recent mayoral election in Copenhagen, focusing on the impact of parking space policies on voter behavior and election outcomes.",
//   frontpageTitle: "How Parking Spaces Shaped the Mayoral Election of Copenhagen",
//   frontpageDescription:
//     "An article series for B.T. covering the recent mayoral election in Copenhagen, focusing on the impact of parking space policies on voter behavior and election outcomes.",
//   frontpageImage:
//     "https://assets.thelocal.com/cdn-cgi/rs:fit:850/quality:75/plain/https://apiwp.thelocal.com/wp-content/uploads/2024/09/20210929-121208-2-1920x1280web-1.jpg",
// };