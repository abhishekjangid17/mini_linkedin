const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, bio } = req.body

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, bio })

    res.status(201).json({ message: 'User created' })
  } catch (err) {
    res.status(500).json({ message: 'Registration error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid email or password' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid email or password' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' })
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      }
    })
  } catch (err) {
    res.status(500).json({ message: 'Login error' })
  }
})

module.exports = router
