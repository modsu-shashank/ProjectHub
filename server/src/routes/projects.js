const express = require("express");
const router = express.Router();
const { validate, projectValidation } = require('../middleware/validate');
const { projectSearchRules } = require('../middleware/queryValidation');
const { cacheMiddleware, clearCache } = require('../middleware/cache');
const Project = require("../models/Project");
const { auth } = require("../middleware/auth");

// Get all projects with filtering and search
router.get("/", projectSearchRules, validate, cacheMiddleware(5 * 60 * 1000), async (req, res) => {
  try {
    const { search, category, difficulty, sort = '-createdAt', page = 1, limit = 10 } = req.query;
    
    // Convert page and limit to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Build query
    const query = { status: "published" };
    
    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    // Execute query with sorting
    const projects = await Project.find(query)
      .populate("author", "username")
      .populate("category", "name")
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Add metadata to response
    const total = await Project.countDocuments(query);
    res.json({
      projects,
      metadata: {
        total,
        count: projects.length,
        pages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        hasNextPage: skip + projects.length < total,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ 
      message: "Error fetching projects",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("author", "username")
      .populate("category", "name");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ 
      message: "Error fetching project",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Create project
router.post("/", [auth, projectValidation, validate], async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      author: req.user._id,
    });

    await project.save();
    clearCache('/api/projects');
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation Error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: "Error creating project",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update project
router.put("/:id", [auth, projectValidation, validate], async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(project, req.body);
    await project.save();
    clearCache('/api/projects');
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation Error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: "Error updating project",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete project
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await project.remove();
    clearCache('/api/projects');
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ 
      message: "Error deleting project",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
