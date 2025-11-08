import Link from "next/link";
import Image from "next/image";
import { Story } from "@/lib/types/story";


export default function StoryGrid({ stories }: { stories: Story[] }) {
  // Calculate the width class based on number of stories
  const getWidthClass = () => {
    switch (stories.length) {
      case 1:
        return "md:w-full"; // Single story takes full width
      case 2:
        return "md:w-1/2"; // Two stories take half width each
      case 3:
      default:
        return "md:w-1/3"; // Three stories take third width each
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
            className="object-center w-full h-48 object-cover"
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
