import StoryForm from "@/components/dashboard/stories/story-form";
import { handleCreateStory } from "../stories/actions";

export default function AddStoryPage() {
  return (
    <div>
      <StoryForm onSubmit={handleCreateStory} />
    </div>
  );
}