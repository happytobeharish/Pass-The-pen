const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: String,
  genre: String,
  parts: [{ text: String, author: String, createdAt: Date }],
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
}, { timestamps: true });

module.exports = mongoose.model("Story", StorySchema);
