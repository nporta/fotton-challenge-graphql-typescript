const isLoggedIn = (req, res, next) => {
  if (req.isAuth) {
    next()
  } else {
    const error = new Error('Not Authorized!')
    error.statusCode = 401
    throw error
  }  
}

export default isLoggedIn