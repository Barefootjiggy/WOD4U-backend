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
    console.log(req.body)
    const workout = new Workout(req.body);
    try {
        const savedWorkout = await workout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateWorkout = async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteWorkout = async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getWorkout, createWorkout, updateWorkout, deleteWorkout };