import { createClient } from "@/lib/supabase/server";

export default async function StoryPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: story, error } = await supabase
    .from("stories")
    .select("id, title, content, created_at, image, url, tag, custom_tag, subheader")
    .eq("id", params.id)
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
          <h1 className="text-7xl">{story.title}</h1>
          <div className="text-2xl max-w-sm">
            <p>{story.custom_tag && <span className="font-extrabold">{story.custom_tag}.</span>} {story.subheader}</p>
          </div>
        </div>
          {story.image && (
          <img 
            src={story.image} 
            alt={story.title} 
            className="w-full md:w-1/2 h-full object-cover"
          />  
        )}
      </div>
      <div className="text-xl lg:text-2xl max-w-[80%] md:max-w-[50%] mt-10 mx-auto">
        <p className="mb-10 text-lg font-mono">This story was originally published in B.T. This is a nicer looking, ad-free version. To read the original, <a href={story.url?.startsWith('http') ? story.url : `https://${story.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">click here</a>.</p>
        <p>{story.content}</p>
      </div>
    </div>
  );
}