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
    console.log("Inside createWorkout controller...");
    try {
        const workout = new Workout({ ...req.body, user: req.user.userId });
        const savedWorkout = await workout.save();
        console.log("Workout created: ", savedWorkout);
        res.status(201).json(savedWorkout);
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(400).json({ message: error.message });
    }
};

const updateWorkout = async (req, res) => {
    console.log("Inside updateWorkout controller...");
    const { title } = req.params;
    try {
        const workout = await Workout.findOne({ title: new RegExp('^' + title + '$', 'i'), user: req.user.userId });
        if (!workout) {
            console.log('Workout not found or not authorized');
            return res.status(403).json({ message: 'You are not authorized to update this workout' });
        }

        Object.assign(workout, req.body);
        await workout.save();
        console.log('Workout updated:', workout);
        res.json({ message: 'Workout updated successfully', workout });
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({ message: 'Error updating workout', error: error.toString() });
    } 
};

const deleteWorkout = async (req, res) => {
    console.log("Inside deleteWorkout controller...");
    const { title } = req.params;
    try {
        const workout = await Workout.findOneAndDelete({ title: new RegExp('^' + title + '$', 'i'), user: req.user.userId });
        if (!workout) {
            console.log('Workout not found or not authorized');
            return res.status(403).json({ message: 'You are not authorized to delete this workout' });
        }
        console.log('Workout deleted');
        res.json({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export { getWorkout, createWorkout, updateWorkout, deleteWorkout };
