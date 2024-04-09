import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET_KEY;

const verifyAuth = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  
  // Check if the authorization header exists
  if (!tokenHeader) {
    return res.status(401).json({
      tokenError: "No token provided, please log in."
    });
  }

  // Assuming your token is in the format "Bearer <token>", extract the actual token
  const token = tokenHeader.split(' ')[1]; // Split the header on space and take the second part

  try {
    // Verify the token - jwt.verify throws an error if the token is invalid or expired
    const decoded = jwt.verify(token, SECRET);
    // Optionally, attach the decoded user to the request object
    req.user = decoded;
    next();
  } catch (error) {
    // Handle invalid token or token expiration errors
    res.status(498).json({
      tokenError: "Invalid token or expired, please re-authenticate."
    });
  }
};

export default verifyAuth;
