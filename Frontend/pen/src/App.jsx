import CreateStoryForm from "./components/CreateStoryForm";
import StoryViewer from "./components/StoryViewer";
import StoryList from "./components/StoryList";
import LoginSignup from "./components/LoginSignup";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📖 Pass-the-Pen</h1>
      <Routes>
        <Route path="/" element={<StoryList />} />
        <Route path="/create" element={<CreateStoryForm />} />
        <Route path="/story/:id" element={<StoryViewer />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/mystories" element={<MyStories />} />
      </Routes>
    </div>
  );
}

export default App;
