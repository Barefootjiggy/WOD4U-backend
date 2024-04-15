import express from 'express';
import { signup,login, logout } from '../controllers/authController.js';
import isUserLoggedIn from '../utils/auth.js';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

// Inside userRouter.js
router.get('/profile', verifyAuth, (req, res) => {
    // Your logic to return the user profile
    res.json({ message: "User profile data" });
});


export default router;