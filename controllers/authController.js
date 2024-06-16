import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.SECRET_KEY

export const signup = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData.username || !userData.password) {
            return res.status(400).json({ errorMessage: "Username and password are required." });
        }
        
        const existingUser = await User.findOne({ username: userData.username });
        if (existingUser) {
            return res.status(409).json({ errorMessage: "Username is already taken." });
        }

        userData.password = await bcrypt.hash(userData.password, 8);
        const user = await User.create(userData);

         const token = jwt.sign(
            { userId: user._id }, 
            process.env.SECRET_KEY, 
            { expiresIn: '24h' } 
        );
        res.json({
            successMessage: `The user ${user.username} has been created successfully`,
            token: token

        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'An error occurred during the signup process.' });
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const payload = { userId: user._id, username: user.username };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
            console.log('Generated token:', token); 
            return res.json({
                message: 'Login successful',
                token: token 
            });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in', error); 
        return res.status(500).json({ error: 'Error logging in' });
    }
};

export const logout = async (req, res) => { 
    res.clearCookie('token').json({ message: 'Logout successful' });
}
