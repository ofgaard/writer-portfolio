"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { handleUpdatePosition } from "@/app/(admin)/dashboard/stories/actions";

interface StoryPositionProps {
  storyId: number;
  currentPosition: number | null;
}

export default function StoryPosition({ storyId, currentPosition }: StoryPositionProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onPositionChange(newPosition: string) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("storyId", storyId.toString());
      // Convert "none" to null for the database
      formData.append("position", newPosition === "none" ? "null" : newPosition);
      await handleUpdatePosition(formData);
    } catch (error) {
      console.error("Failed to update position:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        defaultValue={currentPosition?.toString() || "none"}
        onValueChange={onPositionChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Set position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No position</SelectItem>
          {[1, 2, 3, 4, 5].map((pos) => (
            <SelectItem key={pos} value={pos.toString()}>
              Position {pos}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {currentPosition && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPositionChange("none")}
          disabled={isLoading}
        >
          Remove
        </Button>
      )}
    </div>
  );
}