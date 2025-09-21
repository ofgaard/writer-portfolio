import Link from "next/link";


type Story = {
  id: number;
  title: string;
  content: string;
  frontpageTitle?: string;
  frontpageDescription?: string;
  frontpageImage?: string;
  frontpageTag?: string;
};

export default function StoryGrid({ stories }: { stories: Story[] }) {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full lg:w-[70%] gap-3 mt-10 mx-auto">
      {stories.map((story) => (
        <Link
          key={story.id}
          href={`/stories/${story.id}`}
          className="p-4 w-full md:w-1/3 flex flex-col gap-3 text-center"
        >
          <img
            src={
              story.frontpageImage ||
              "https://placehold.co/400x300?text=No+Image"
            }
            className="object-center w-full h-48 object-cover"
            alt={story.frontpageDescription || story.title}
          />
          <p className="text-blue-400 font-extrabold">
            {story.frontpageTag || "Expert Analysis"}
          </p>
          <h2 className="text-2xl font-extrabold">
            {story.frontpageTitle || story.title}
          </h2>
          <p>
            {story.frontpageDescription ||
              story.content.slice(0, 100) + "..."}
          </p>
        </Link>
      ))}
    </div>
  );
}
