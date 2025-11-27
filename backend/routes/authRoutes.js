const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
  const { rollNumber, name, password } = req.body;

  try {
    const existing = await User.findOne({ rollNumber });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ rollNumber, name, password });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { rollNumber, password } = req.body;

  try {
    const user = await User.findOne({ rollNumber });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Proper response format expected by frontend
    res.status(200).json({
      user: {
        name: user.name,
        rollNumber: user.rollNumber,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
