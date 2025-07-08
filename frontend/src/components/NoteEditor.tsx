import React, { useState, FormEvent } from "react";

interface NoteEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
  onCancel?: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  initialContent = "",
  onSave,
  onCancel,
}) => {
  const [content, setContent] = useState<string>(initialContent);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (trimmed === "") return;
    onSave(trimmed);
    setContent("");
  };

  const handleCancel = () => {
    setContent(initialContent); // Revert changes
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded resize-none"
        rows={4}
        placeholder="Write your note here..."
      />
      <div className="flex gap-4 mt-2">
        <button
          type="submit"
          disabled={content.trim() === ""}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Save Note
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;
