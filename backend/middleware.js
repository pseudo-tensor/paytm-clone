const jwt = require('jsonwebtoken')
const connectionString = require('./con.json')

function authMiddleware(req, res, next) {

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, connectionString.SECRET_TOKEN);
    req.userId = decoded.userId;
    next();

  } catch(err) {
    console.log("error in authmiddleware");
  }
}

module.exports = {
  authMiddleware
}

