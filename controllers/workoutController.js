import Workout from "../models/workoutModel.js";

const getWorkout = async (req, res) => {
    try {
        const workout = await Workout.find();
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorkout = async (req, res) => {
    const { title, description } = req.body;
    const user = req.user; 
    console.log('Request user:', user); 
    console.log('Request body:', req.body); 
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const workout = new Workout({ title, description, user: user.userId });
        const savedWorkout = await workout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(500).json({ message: 'Error saving workout', error: error.toString() });
    }
};

const updateWorkout = async (req, res) => {
    const { title } = req.params;
    try {
        const workout = await Workout.findOne({ title: new RegExp('^' + title + '$', 'i'), user: req.user.userId });
        if (!workout) {
            return res.status(403).json({ message: 'You are not authorized to update this workout' });
        }

        Object.assign(workout, req.body);
        await workout.save();
        res.json({ message: 'Workout updated successfully', workout });
    } catch (error) {
        res.status(500).json({ message: 'Error updating workout', error: error.toString() });
    }
};

const deleteWorkout = async (req, res) => {
    const { title } = req.params;
    try {
        const workout = await Workout.findOneAndDelete({ title: new RegExp('^' + title + '$', 'i'), user: req.user.userId });
        if (!workout) {
            return res.status(403).json({ message: 'You are not authorized to delete this workout' });
        }
        res.json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export { getWorkout, createWorkout, updateWorkout, deleteWorkout };