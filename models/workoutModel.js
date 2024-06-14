import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
