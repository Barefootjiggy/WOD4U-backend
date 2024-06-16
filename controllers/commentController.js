import Comment from "../models/commentModel.js";

const getComments = async (req, res) => {
    const { workoutId } = req.params;
    try {
        const comments = await Comment.find({ workout: workoutId }).populate('user', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addComment = async (req, res) => {
    const { workoutId, text } = req.body;
    console.log('Request user:', req.user); 
    console.log('Request body:', req.body); 
    try {
        const comment = new Comment({
            text,
            workout: workoutId,
            user: req.user.userId
        });
        console.log('Creating comment with:', { text, workout: workoutId, user: req.user.userId }); // Log the data used to create the comment
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error saving comment:', error); // Log the error
        res.status(400).json({ message: error.message });
    }
};

const editComment = async (req, res) => {
    const { id: commentId } = req.params;
    try {
        const comment = await Comment.findOne({ _id: commentId, user: req.user.userId });
        if (!comment) {
            return res.status(403).json({ message: 'You are not authorized to edit this comment' });
        }

        comment.text = req.body.text;
        await comment.save();
        res.json({ message: 'Comment edited successfully', comment });
    } catch (error) {
        res.status(500).json({ message: 'Error editing comment', error: error.toString() });
    }
};

const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findOneAndDelete({ _id: id, user: req.user.userId });
        if (!comment) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export { getComments, addComment, editComment, deleteComment };