import { useEffect, useState } from "react";
import { searchStories } from "../Api/storyApi";

export default function StoryList({ onSelectStory }) {
  const [stories, setStories] = useState([]);
  const [filters, setFilters] = useState({ genre: "", status: "" });

  useEffect(() => {
    async function loadStories() {
      const data = await searchStories(filters);
      setStories(data);
    }
    loadStories();
  }, [filters]);

  return ( 
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Browse Stories</h2>
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Genre"
          className="border p-2 rounded w-1/3"
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
        />
        <select
          className="border p-2 rounded w-1/3"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul className="space-y-2">
        {stories.map((story) => (
          <li
            key={story._id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-50"
            onClick={() => onSelectStory(story._id)}
          >
            <div className="font-bold text-lg">{story.title}</div>
            <div className="text-sm text-gray-600">Genre: {story.genre} | Status: {story.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}