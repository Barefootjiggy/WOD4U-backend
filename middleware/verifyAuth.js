import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET_KEY;

const verifyAuth = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  
  if (!tokenHeader) {
    return res.status(401).json({
      tokenError: "No token provided, please log in."
    });
  }

  const token = tokenHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(498).json({
      tokenError: "Invalid token or expired, please re-authenticate."
    });
  }
};

export default verifyAuth;
