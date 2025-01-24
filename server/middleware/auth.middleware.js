const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Please login first' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(`Decoded Token: ${JSON.stringify(decoded)}`);
    req.body.userId = decoded.userId;
    req.body.username = decoded.username;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = auth;
