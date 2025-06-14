import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stories")
      .then(res => setStories(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Ongoing Stories</h1>
      <ul className="space-y-2">
        {stories.map(story => (
          <li key={story._id} className="border p-4 rounded-lg">
            <strong>{story.title}</strong>
            <p>{story.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
