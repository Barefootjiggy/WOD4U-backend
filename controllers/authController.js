import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';
import dotenv from 'dotenv';
dotenv.config();


// const signin = async (req, res) => {
  //  const SECRET = process.env.SECRET_KEY;

    // try {
       // const { username, password } = req.body;
       // const user = await User.findOne({ username: username });
        
        // Check if user exists
       // if (!user) {
          //  return res.status(404).json({
                // userError: `User not found`
          //  });
      //  }

        // const passwordIsValid = await bcrypt.compare(password, user.password);

        // if (!passwordIsValid) {
          //  return res.status(401).json({
             //   passwordError: `The password was incorrect`
          //  });
       // }

       // const token = jwt.sign(
           // { username: username },
          //  SECRET,
          //  { expiresIn: '1d' }
       // );

        // res.json({
         //   token: token
       // });
   // } catch (error) {
       // console.error(error);
      //  res.status(500).json({ error: 'An error occurred during the sign in process.' });
   // }
// };   

const jwtSecret = process.env.SECRET_KEY

export const signup = async (req, res) => {
    try {
        const userData = req.body;
        // Ensure username and password are provided
        if (!userData.username || !userData.password) {
            return res.status(400).json({ errorMessage: "Username and password are required." });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ username: userData.username });
        if (existingUser) {
            return res.status(409).json({ errorMessage: "Username is already taken." });
        }

        userData.password = await bcrypt.hash(userData.password, 8);
        const user = await User.create(userData);

         // Generate a token for the new user
         const token = jwt.sign(
            { userId: user._id }, // Payload typically includes user identification
            process.env.SECRET_KEY, // Secret key for signing the token
            { expiresIn: '24h' } // Optional token expiration
        );
        res.json({
            successMessage: `The user ${user.username} has been created successfully`,
            token: token

        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'An error occurred during the signup process.' });
    }
};


export const login = async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            console.log(result)
            if (result) {
                const payload = { username: user.username };
                console.log(payload)
                const token = jwt.sign(payload,jwtSecret, { expiresIn: '1d' }); // Example: Expiring in 1 day
                console.log(token, payload)
                res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
                
             } else {
                res.status(400).json({ error: 'Password does not match' });
             }
         } else {
            res.status(400).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
     }
};

export const logout = async (req, res) => { 
    res.clearCookie('token').json({ message: 'Logout successful' });
}
