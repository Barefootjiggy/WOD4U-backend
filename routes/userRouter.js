import express from 'express';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

router.get('/profile', verifyAuth, (req, res) => {
    res.json({ message: "User profile data" });
});

export default router;