const Story = require("../models/Story");

exports.createStory = async (req, res) => {
  const { title, genre, prompt } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const story = await Story.create({
      title,
      genre,
      prompt,
      parts: [],
      status: "ongoing",
    });
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ error: "Failed to create story" });
  }
};

exports.contributeToStory = async (req, res) => {
  const { storyId } = req.params;
  const { text, author } = req.body;

  try {
    const story = await Story.findById(storyId);
    if (!story || story.status !== "ongoing") {
      return res.status(400).json({ error: "Story is not open for contributions" });
    }

    story.parts.push({ text, author, createdAt: new Date() });

    if (story.parts.length >= 10) {
      story.status = "completed";
    }

    await story.save();
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: "Contribution failed" });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });

    if (story.status === "completed") {
      res.json(story);
    } else {
      const lastPart = story.parts.slice(-1);
      res.json({ ...story.toObject(), parts: lastPart });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve story" });
  }
};

exports.voteOnStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findByIdAndUpdate(
      storyId,
      { $inc: { votes: 1 } },
      { new: true }
    );
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: "Voting failed" });
  }
};

exports.searchStories = async (req, res) => {
  try {
    const { genre, status } = req.query;
    const filter = {};
    if (genre) filter.genre = genre;
    if (status) filter.status = status;

    const stories = await Story.find(filter).sort({ updatedAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
};