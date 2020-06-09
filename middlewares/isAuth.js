require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // check if there is an Authorization header on the request
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    return next()
  }

  // split token from Bearer
  const token = authHeader.split(' ')[1]
  if (!token || token === '') {
    req.isAuth = false
    return next()
  }

  // check if token is valid
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (err) {
    req.isAuth = false
    return next()
  }

  if (!decodedToken) {
    req.isAuth = false
    return next()
  }

  // if we have a valid decoded token, set req.isAuth to true
  req.isAuth = true
  req.userRoles = decodedToken.roles
  req.userId = decodedToken.userId
  next()
}