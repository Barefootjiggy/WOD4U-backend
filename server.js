import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import verifyAuth from './middleware/verifyAuth.js';
import workoutRouter from './routes/workoutRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`, req.body);
  next();
});

app.get('/api/workouts', (req, res) => {
  fs.readFile(path.join(__dirname, 'benchmarks.json'), 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ message: "Failed to load workout data." });
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.use('/api/users', verifyAuth, userRouter);
app.use('/api/auth', authRouter);
app.use('/api/workouts', workoutRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
