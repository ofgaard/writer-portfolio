import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { Bold, Heading1, Heading2, Heading3, Italic } from "lucide-react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  const Options = [
    { icon: <Heading1 />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: editor.isActive('heading', { level: 1 }) },
    { icon: <Heading2 />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: editor.isActive('heading', { level: 2 }) },
    { icon: <Heading3 />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: editor.isActive('heading', { level: 3 }) },
    { icon: <Bold />,
    onClick: () => editor.chain().focus().toggleBold().run(),
    isActive: editor.isActive('bold') },
    { icon: <Italic />,
    onClick: () => editor.chain().focus().toggleItalic().run(),
    isActive: editor.isActive('italic') },
  ]

  return (
    <div className="flex items-center border rounded-md p-2 mb-1 space-x-2 z-50">
      {Options.map((option, index) => (
        <Toggle key={index}
        pressed={option.isActive}
        onPressedChange={option.onClick}
        >
          {option.icon}

        </Toggle>
    
      ))}
    </div>
  )
}

export default MenuBar;