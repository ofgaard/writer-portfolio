import { addStory } from "@/app/(admin)/stories/actions";

export default function AddStory() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    await addStory({ title, content });
  }

  return (
    <form action={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        required
      />
      <button type="submit">Add Story</button>
    </form>
  );
}
