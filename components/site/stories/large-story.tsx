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
  subheader?: string | null;
};

export default function LargeStory({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.id}`} className="block w-full">
      <div className="flex flex-col md:flex-row justify-between w-full lg:w-[70%] h-auto md:h-96 p-4 md:p-5 mx-auto">
        <div className="w-full md:w-1/2">
          <Image
            src={
              story.image ||
              "https://picsum.photos/500/300"
            }
            alt={story.title}
            width={500}
            height={300}
            className="object-cover h-64 md:h-full w-full"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 text-center flex flex-col gap-6 p-5">
          <p className="font-extrabold">{story.custom_tag?.toUpperCase()}</p>
          <h1 className="text-3xl font-extrabold">
            {story.title}
          </h1>
          <p>
            {story.subheader}
          </p>
        </div>
      </div>
    </Link>
  );
}