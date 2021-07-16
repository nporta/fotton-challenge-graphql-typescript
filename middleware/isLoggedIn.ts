import { Request } from 'express'

const isLoggedIn = (req: Request) => {
  if (!req.isAuth) {
    const error = new Error('Not Authorized!')
    // @ts-ignore
    error.statusCode = 401
    throw error
  }
}

export default isLoggedIn