import Link from "next/link";

type Story = {
  id: number;
  title: string;
  content: string;
  frontpageTitle?: string;
  frontpageDescription?: string;
  frontpageImage?: string;
};

export default function LargeStory({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.id}`} className="block">
      <div className="flex flex-col md:flex-row justify-between w-full lg:w-[70%] h-auto md:h-96 p-5 mx-auto">
        <div className="w-full md:w-1/2">
          <img
            src={
              story.frontpageImage ||
              "https://placehold.co/600x400?text=No+Image"
            }
            className="object-cover h-64 md:h-full w-full"
            alt={story.frontpageDescription || story.title}
          />
        </div>
        <div className="w-full md:w-3/6 text-center flex flex-col gap-6 p-5">
          <p className="font-extrabold">ARTICLE SERIES</p>
          <h1 className="text-3xl font-extrabold">
            {story.frontpageTitle || story.title}
          </h1>
          <p>
            {story.frontpageDescription || story.content.slice(0, 120) + "..."}
          </p>
        </div>
      </div>
    </Link>
  );
}