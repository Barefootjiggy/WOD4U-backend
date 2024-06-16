import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET_KEY;

const verifyAuth = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  
  if (!tokenHeader) {
    console.error('No token provided');
    return res.status(401).json({
      tokenError: "No token provided, please log in."
    });
  }

  const token = tokenHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log('Decoded token:', decoded); // Logging the decoded token
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(498).json({
      tokenError: "Invalid token or expired, please re-authenticate."
    });
  }
};

export default verifyAuth;
