"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { Story } from "@/lib/types/story";
import { deleteStory, handleUpdatePosition } from "@/app/(admin)/dashboard/stories/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoryCard({ story }: { story: Story }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingPosition, setIsUpdatingPosition] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this story?")) {
      setIsDeleting(true);
      try {
        await deleteStory(story.id);
        router.refresh();
      } catch (error) {
        console.error("Failed to delete story:", error);
        alert("Failed to delete story");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handlePositionUpdate = async (position: string) => {
    setIsUpdatingPosition(true);
    try {
      const formData = new FormData();
      formData.append("storyId", story.id.toString());
      formData.append("position", position);
      await handleUpdatePosition(formData);
      router.refresh();
    } catch (error) {
      console.error("Failed to update position:", error);
      alert("Failed to update position");
    } finally {
      setIsUpdatingPosition(false);
    }
  };


  const getPositionDisplay = (position: number | null, rowPosition: number | null) => {
    if (!position) return "None";
    const positionNames = ['', 'Left', 'Middle', 'Right'];
    const positionText = rowPosition ? positionNames[rowPosition] : '';
    return `Row ${position}${positionText ? ` - ${positionText}` : ''}`;
  };


  const getCurrentPositionValue = () => {
    if (!story.position) return "none";
    if (!story.row_position) return story.position.toString();
    return `${story.position}-${story.row_position}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`story-${story.id}`} className="border-none">
          <div className="flex flex-col">
            <div className="flex flex-col gap-5">
              <div className="relative h-48 w-full">
                <Image
                  src={story.image || "https://picsum.photos/500/400"}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
                {story.position && (
                  <div className="absolute top-0 left-0 right-0 bg-black/60 px-3 py-2">
                    <p className="text-xs text-white font-medium">
                      {getPositionDisplay(story.position, story.row_position || null)}
                    </p>
                  </div>
                )}
              </div>
              <CardContent className="flex flex-col">
                <h2 className="text-xl font-bold mb-1 text-left">{story.title}</h2>
                <p className="text-xs text-blue-500 mb-2 text-left">{story.custom_tag}</p>
                <p className="text-muted-foreground mb-2 text-left">{story.content.slice(0, 100)}...</p>
                <p className="text-xs text-muted-foreground text-left">
                  {story.created_at?.slice(0, 10)} | {story.tag}
                </p>
              </CardContent>
            </div>
            
            <AccordionTrigger className="hover:no-underline px-6 py-3 text-sm text-muted-foreground">
              Show options
            </AccordionTrigger>
          </div>
          
          <AccordionContent>
            <CardContent className="flex flex-col gap-4 pt-4">
              <div className="space-y-3">
                <Link href={`/dashboard/stories/${story.id}/edit`}>
                  <Button className="w-full" variant="outline">
                    Edit Story
                  </Button>
                </Link>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Frontpage Position:</label>
                  <Select 
                    value={getCurrentPositionValue()} 
                    onValueChange={handlePositionUpdate}
                    disabled={isUpdatingPosition}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Remove from frontpage</SelectItem>
                      <SelectItem value="1-1">Row 1 - Left</SelectItem>
                      <SelectItem value="1-2">Row 1 - Middle</SelectItem>
                      <SelectItem value="1-3">Row 1 - Right</SelectItem>
                      <SelectItem value="2-1">Row 2 - Left</SelectItem>
                      <SelectItem value="2-2">Row 2 - Middle</SelectItem>
                      <SelectItem value="2-3">Row 2 - Right</SelectItem>
                      <SelectItem value="3-1">Row 3 - Left</SelectItem>
                      <SelectItem value="3-2">Row 3 - Middle</SelectItem>
                      <SelectItem value="3-3">Row 3 - Right</SelectItem>
                      <SelectItem value="4-1">Row 4 - Left</SelectItem>
                      <SelectItem value="4-2">Row 4 - Middle</SelectItem>
                      <SelectItem value="4-3">Row 4 - Right</SelectItem>
                      <SelectItem value="5-1">Row 5 - Left</SelectItem>
                      <SelectItem value="5-2">Row 5 - Middle</SelectItem>
                      <SelectItem value="5-3">Row 5 - Right</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choose the position for your story on the frontpage.
                  </p>
                </div>

                <Button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full" 
                  variant="destructive"
                >
                  {isDeleting ? "Deleting..." : "Delete Story"}
                </Button>
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
