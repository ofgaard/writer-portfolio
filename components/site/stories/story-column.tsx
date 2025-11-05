import Link from "next/link";
import Image from "next/image";

type Story = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  url?: string | null;
  tag?: string | null;        
  custom_tag?: string | null; 
};

export default function StoryColumn({ stories }: { stories: Story[] }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {stories.map((story) => (
        <Link
          key={story.id}
          href={`/stories/${story.id}`}
          className="p-6 w-full flex flex-col gap-4 text-center rounded-lg hover:shadow-lg transition-shadow"
        >
          <Image
            src={
              story.image ||
              "https://picsum.photos/500/300"
            }
            alt={story.title || 'Story image'}
            width={500}
            height={300}
            className="object-center w-full h-64 object-cover rounded"
          />
          <p className="text-blue-400 font-extrabold">
            {story.custom_tag}
          </p>
          <h2 className="text-2xl font-extrabold">
            {story.title}
          </h2>
          <p className="text-muted-foreground">
            {story.content.slice(0, 150) + "..."}
          </p>
        </Link>
      ))}
    </div>
  );
}