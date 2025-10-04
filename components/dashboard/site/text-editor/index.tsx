"use client"
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ content, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[200px] border rounded-md py-2 px-3"
      },
    },
  onUpdate: ({ editor }) => {
    onChange(editor.getText());
  },
  immediatelyRender: false,
  });

  return (
  <div>
    <MenuBar editor={editor} />
    <EditorContent editor={editor} />

  </div>
  )
}