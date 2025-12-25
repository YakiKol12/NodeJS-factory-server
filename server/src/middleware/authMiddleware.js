const jwt = require('jsonwebtoken');
const userDBRepo = require('../repositories/userDbRepo');

const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decoded.username;
        
        const user = await userDBRepo.getUserByUsername(decoded.username);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        
        next();
    } catch (err) {
        console.error('JWT verify error:', err.name, err.message);
        if (err.name === 'TokenExpiredError') 
            return res.status(401).json({ message: 'Token expired' });
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { 
    verifyToken 
};
