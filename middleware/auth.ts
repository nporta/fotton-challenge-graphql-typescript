import { RequestHandler } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface JWTPayload extends JwtPayload {
  userId: string
}

const auth: RequestHandler = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')[1]
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
  } catch(err) {
    req.isAuth = false
    return next()
  }
  if (!decodedToken) {
    req.isAuth = false
    return next()
  }
  req.userId = decodedToken.userId
  req.isAuth = true
  next()
}

export default auth
