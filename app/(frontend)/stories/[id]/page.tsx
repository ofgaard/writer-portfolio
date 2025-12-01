import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  const { data: story, error } = await supabase
    .from("stories")
    .select("id, title, content, created_at, image, url, tag, custom_tag, subheader")
    .eq("id", id)
    .single();


  if (error || !story) {
    return <div>Story not found.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6 border-b h-screen">
        <div className="flex flex-col gap-3 items-center text-center justify-center p-10 w-full md:w-1/2">
          <div className="text-sm uppercase font-bold">
            <p>{story.tag}</p>
          </div>
          <h1 className="text-4xl md:text-7xl">{story.title}</h1>
          <div className="text-2xl mt-10">
            <p>{story.custom_tag && <span className="font-extrabold">{story.custom_tag}.</span>} {story.subheader}</p>
          </div>
        </div>
          {story.image && (
          <div className="relative w-full hidden md:block h-full">
            <Image 
              src={story.image} 
              alt={story.title}
              fill
              quality={100}
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div className="text-xl lg:text-2xl max-w-[80%] md:max-w-[50%] mt-10 mx-auto">
        <p className="mb-10 text-lg font-mono">This story was originally published elsewhere. This is a nicer looking, ad-free version. To read the original, <a href={story.url?.startsWith('http') ? story.url : `https://${story.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">click here</a>.</p>
        <div className="whitespace-pre-line">
          {story.content}
        </div>
      </div>
    </div>
  );
}