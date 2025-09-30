"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { addStory } from "@/app/(admin)/stories/actions";

export function AddStoryDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Story</DialogTitle>
        </DialogHeader>
        <form action={async (formData: FormData) => {
          const title = formData.get("title") as string;
          const content = formData.get("content") as string;
          await addStory({ title, content });
          document.getElementById("close-dialog")?.click();
        }}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className="border rounded px-3 py-2"
          />
          <textarea
            name="content"
            placeholder="Content"
            required
            className="border rounded px-3 py-2"
          />
            <DialogClose id="close-dialog" className="sr-only" />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Story
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}