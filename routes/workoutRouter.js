import express from 'express'; 
const router = express.Router(); 

import { getWorkout, createWorkout, updateWorkout, deleteWorkout } from '../controllers/workoutController.js';

router.get('/', getWorkout); 

router.post('/', createWorkout);

router.put('/:id', updateWorkout);

router.delete('/:id', deleteWorkout);

export default router;