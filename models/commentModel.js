import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
