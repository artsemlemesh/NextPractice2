const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; //get the token from the cookie
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. Token not found' });
    // return res.redirect('http://localhost:3000/auth')  //to redirect to the login page if not logged in
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //add user to the request object
    next();
  }catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = verifyToken;