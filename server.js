import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import verifyAuth from './middleware/verifyAuth.js';
import Workout from './models/workoutModel.js';
import workoutRouter from './routes/workoutRouter.js';

// MODELS



const app = express();
const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'http://localhost:3000', 'https://wod4u-cfaebfd65d57.herokuapp.com', 'https://wod4u.netlify.app'], 
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000
const mongoURI = process.env.mongoURI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

 // const insertWorkoutData = async () => {
  //  try {
   //   const workoutData = await import('./benchmarks.json', {
   //     assert: {type: 'json'}
    //   });

    //   for (const item of workoutData.default) {
    //     const newWorkoutEntry = new Workout (item);
    //     await newWorkoutEntry.save();
    //   }
    //   console.log('All workout data inserted successfully');
    // } catch (error) {
    //   console.error('Error inserting workout data:', error);
    //   throw error;
    // }
    // };
    
    // app.post('/insertWorkoutData', async (req,res) => {
    //   try {
    //     await insertWorkoutData();
    //     res.json({ message: 'Workout data inserted successfully' });
    //   } catch (error) {
    //     console.error('Error inserting workout data via route:', error);
    //     res.status(500).json({ error: 'Internal server error'});
    //   }
    //   }
    // )
  

  app.use(express.json());
  app.use(express.static('public'));
  app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`, req.body);
    next();
});

// Define a route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.redirect('/api/workouts'); // Redirect to the /api/workouts endpoint
});

app.get('/api/workouts', async (req, res) => {
  try {
      // Fetch workouts from your database
      const workouts = await Workout.find(); // Assuming Workout is your Mongoose model

      // Send the workouts as a response
      res.status(200).json(workouts);
  } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error fetching workouts:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



  app.use('/api/users', verifyAuth, userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/workouts', workoutRouter);
  


//   app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     // Here, you would typically check the credentials against your user database
//     // This is a simplified example
//     if(username === 'user' && password === 'pass') {
//         res.send('Login successful');
//     } else {
//         res.status(401).send('Login failed');
//     }
// });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });