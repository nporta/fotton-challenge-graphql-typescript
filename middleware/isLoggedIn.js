const isLoggedIn = (req) => {
  if (!req.isAuth) {
    const error = new Error('Not Authorized!')
    error.statusCode = 401
    throw error
  }
}

export default isLoggedIn