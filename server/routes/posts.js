const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const verifyToken = require('../middleware/auth')

// Create Post
router.post('/', verifyToken, async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      author: req.userId,
    })
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post' })
  }
})

// Get All Posts (with author name)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'name')
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: 'Failed to get posts' })
  }
})

module.exports = router
