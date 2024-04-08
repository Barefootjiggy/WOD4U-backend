import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'

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

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });