const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");

router.post("/", storyController.createStory);
router.post("/:storyId/contribute", storyController.contributeToStory);
router.get("/:id", storyController.getStoryById);
router.post("/:storyId/vote", storyController.voteOnStory);
router.get("/", storyController.searchStories);

module.exports = router;