import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import workoutRouter from './routes/workoutRouter.js';
import verifyAuth from './middleware/verifyAuth.js';
import Workout from './models/workoutModel.js'; // Ensure the Workout model is imported

const app = express();

const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'http://localhost:3000', 'https://wod4u-cfaebfd65d57.herokuapp.com', 'https://wod4u.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`, req.body);
  next();
});

app.get('/', (req, res) => {
  res.redirect('/api/workouts');
});

app.get('/api/workouts', async (req, res) => {
  console.log("Fetching workouts...");
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('/api/users', verifyAuth, userRouter);
app.use('/api/auth', authRouter);
app.use('/api/workouts', workoutRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
