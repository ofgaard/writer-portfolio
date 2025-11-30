import Link from "next/link";
import Image from "next/image";
import { Story } from "@/lib/types/story";


export default function StoryGrid({ stories }: { stories: Story[] }) {
  const getWidthClass = () => {
    if (stories.length === 1) {
      return "md:w-full"; 
    } else if (stories.length === 2) {
      return "md:w-1/2"; 
    } else {
      return "md:w-1/3";
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full lg:w-[70%] gap-3 mt-10 mx-auto">
      {stories.map((story) => (
        <Link
          key={story.id}
          href={`/stories/${story.id}`}
          className={`p-4 w-full ${getWidthClass()} flex flex-col gap-3 text-center`}
        >
          <Image
            src={
              story.image ||
              "https://picsum.photos/500/300"
            }
            alt={story.title || 'Story image'}
            width={500}
            height={300}
            className="object-center w-full h-56 md:h-72 object-cover"
          />
          <p className="font-extrabold uppercase">
            {story.custom_tag}
          </p>
          <h2 className="text-2xl font-extrabold">
            {story.title}
          </h2>
          <p>
            {story.subheader}
          </p>
        </Link>
      ))}
    </div>
  );
}
