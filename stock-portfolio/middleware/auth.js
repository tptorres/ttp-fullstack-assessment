const jwt = require('jsonwebtoken');
const config = require('config');

// @info Auth middleware that checks token and validates if the current user can access a private route
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token found, authorization not allowed' });
  }

  try {
    const verified = jwt.verify(token, config.get('jwtSecret'));
    req.user = verified.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token not valid' });
  }
};
