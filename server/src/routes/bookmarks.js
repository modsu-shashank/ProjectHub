const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
const { auth } = require("../middleware/auth");

// Get user bookmarks
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "bookmarks",
      populate: [
        { path: "author", select: "username" },
        { path: "category", select: "name" },
      ],
    });
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookmarks" });
  }
});

// Add bookmark
router.post("/:projectId", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = await User.findById(req.user._id);
    if (user.bookmarks.includes(project._id)) {
      return res.status(400).json({ message: "Project already bookmarked" });
    }

    user.bookmarks.push(project._id);
    await user.save();

    res.json({ message: "Project bookmarked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error bookmarking project" });
  }
});

// Remove bookmark
router.delete("/:projectId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.bookmarks = user.bookmarks.filter(
      (bookmark) => bookmark.toString() !== req.params.projectId
    );
    await user.save();

    res.json({ message: "Bookmark removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing bookmark" });
  }
});

module.exports = router;
