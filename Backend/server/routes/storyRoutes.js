const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

router.get("/", async (req, res) => {
  const stories = await Story.find().sort({ createdAt: -1 });
  res.json(stories);
});

router.post("/", async (req, res) => {
  const { title, genre } = req.body;
  const newStory = await Story.create({ title, genre, parts: [] });
  res.status(201).json(newStory);
});

module.exports = router;
