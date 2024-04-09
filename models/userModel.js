import mongoose from "mongoose";

// TO DO hash password and return password that is entered by user in database

const userSchema = mongoose.Schema({
   username: {type: String, required: true},
   password: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

export default User;

