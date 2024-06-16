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
    const title = decodeURIComponent(req.params.title.trim());
    try {
        const result = await Workout.findOneAndUpdate(
            { title: new RegExp('^' + title + '$', 'i') }, 
            req.body, 
            { new: true } 
        );

        if (!result) {
            return res.status(404).json({ message: "Workout not found" });
        }
        
        res.json({ message: "Workout edited successfully", workout: result });
    } catch (error) {
        res.status(500).json({ message: "Error updating workout", error: error.toString() });
    } 
};

 const deleteWorkout = async (req, res) => {
    const title = decodeURIComponent(req.params.title.trim());
    try {
        const result = await Workout.findOneAndDelete({ title: new RegExp('^' + title + '$', 'i') });
        if (!result) {
            return res.status(404).json({ message: "Workout not found" });
        }
        res.json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export { getWorkout, createWorkout, updateWorkout, deleteWorkout };