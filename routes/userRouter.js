import express from 'express';
import { signup,login, logout } from '../controllers/authController.js';
import isUserLoggedIn from '../utils/auth.js';

const router = express.Router();

export default router;