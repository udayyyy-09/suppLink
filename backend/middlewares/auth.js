const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('Token received:', token);  // Log token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error in authMiddleware:', error);  // Log error
        res.status(401).json({ message: 'Authentication required' });
    }
};

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
      }
  
      req.user = user;
      next(); 
    });
  };
  


module.exports = authMiddleware;