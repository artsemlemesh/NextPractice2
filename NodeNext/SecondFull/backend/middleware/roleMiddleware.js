// const verifyToken = require('./cookieMiddleware');

const checkRole = (role) => (req, res, next) => {
    

    // Check if roles is an array
    if (Array.isArray(req.user.roles)) {
        if (!req.user.roles.includes(role)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' }); // Deny access
        }
    } 
    // Check if roles is an object
    else if (typeof req.user.roles === 'object') {
        if (!req.user.roles[role]) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' }); // Deny access
        }
    } else {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' }); // Deny access if roles is neither
    }

    next(); // Proceed to the next middleware or route handler
};

module.exports = { checkRole };
