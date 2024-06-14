import Workout from "../models/workoutModel.js";

const getWorkout = async (req, res) => {
    console.log("Inside getWorkout controller...");
    try {
        const workouts = await Workout.find({ user: req.user.userId });
        console.log("Workouts fetched: ", workouts);
        res.status(200).json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ message: error.message });
    }
};

const createWorkout = async (req, res) => {
    try {
        const workout = new Workout({ ...req.body, user: req.user.userId });
        const savedWorkout = await workout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
