import { useEffect, useState } from "react";
import { getStoryById, contributeToStory, voteOnStory } from "../Api/storyApi";

export default function StoryViewer({ storyId }) {
  const [story, setStory] = useState(null);
  const [contribution, setContribution] = useState("");

  useEffect(() => {
    async function loadStory() {
      const data = await getStoryById(storyId);
      setStory(data);
    }
    loadStory();
  }, [storyId]);

  async function handleContribute() {
    const newStory = await contributeToStory(storyId, {
      text: contribution,
      author: "Anonymous",
    });
    setStory(newStory);
    setContribution("");
  }

  async function handleVote() {
    const updated = await voteOnStory(storyId);
    setStory(updated);
  }

  if (!story) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{story.title}</h1>
      <p className="text-gray-500 mb-4">Genre: {story.genre}</p>
      <div className="bg-white rounded p-4 shadow mb-4">
        {story.parts.map((part, index) => (
          <p key={index} className="mb-2">{part.text}</p>
        ))}
      </div>
      {story.status === "ongoing" && (
        <div className="mb-4">
          <textarea
            className="w-full border rounded p-2"
            rows="4"
            placeholder="Write the next part..."
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
          />
          <button
            onClick={handleContribute}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
      <button
        onClick={handleVote}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Upvote ({story.votes || 0})
      </button>
    </div>
  );
}
