import mongoose from "mongoose";

const workoutSchema = mongoose.Schema ({
   title: {type: String, required: true},
   description: {type: String, required: true},
})

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;