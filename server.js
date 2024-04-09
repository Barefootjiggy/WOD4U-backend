import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import verifyAuth from './middleware/verifyAuth.js';

// MODELS



const app = express();

const PORT = process.env.PORT || 3000
const mongoURI = process.env.mongoURI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

  app.use(express.json());
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/users', verifyAuth, userRouter);
  app.use('/api/auth', authRouter);

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Here, you would typically check the credentials against your user database
    // This is a simplified example
    if(username === 'user' && password === 'pass') {
        res.send('Login successful');
    } else {
        res.status(401).send('Login failed');
    }
});

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });