const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')

// Get profile + posts
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 })
    res.json({ user, posts })
  } catch (err) {
    res.status(500).json({ message: 'User not found' })
  }
})

module.exports = router
