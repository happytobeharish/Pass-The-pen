import { useState } from "react";
import { createStory } from "../Api/storyApi";

export default function CreateStoryForm({ onStoryCreated }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [prompt, setPrompt] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const newStory = await createStory({ title, genre, prompt });
    onStoryCreated(newStory);
    setTitle("");
    setGenre(""); 
    setPrompt("");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create New Story</h2>
      <input
        type="text"
        className="w-full mb-2 border rounded p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        className="w-full mb-2 border rounded p-2"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <textarea
        className="w-full mb-2 border rounded p-2"
        rows="3"
        placeholder="Prompt or Introduction"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Start Story
      </button>
    </form>
  );
}
