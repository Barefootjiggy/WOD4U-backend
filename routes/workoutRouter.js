// import express from 'express'; 
// const router = express.Router(); 

// import { getWorkout, createWorkout, updateWorkout, deleteWorkout } from '../controllers/workoutController.js';

// router.get('/', getWorkout); 

// router.post('/', createWorkout);

// router.put('/:title', updateWorkout);

// router.delete('/:title', deleteWorkout);

// export default router;

import express from 'express';
import { getWorkout, createWorkout, updateWorkout, deleteWorkout } from '../controllers/workoutController.js';
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router();

router.get('/', verifyAuth, getWorkout);
router.post('/', verifyAuth, createWorkout);
router.put('/:title', verifyAuth, updateWorkout);
router.delete('/:title', verifyAuth, deleteWorkout);

export default router;
