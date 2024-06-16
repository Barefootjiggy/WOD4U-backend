// import express from 'express';
// import verifyAuth from '../middleware/verifyAuth.js';

// const router = express.Router();

// router.get('/profile', verifyAuth, (req, res) => {
//     res.json({ message: "User profile data" });
// });

// export default router;

import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log('Signup request:', req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log('User created:', newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request:', req.body);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password does not match');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    console.log('Token generated:', token);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

export default router;
