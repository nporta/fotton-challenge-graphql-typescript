import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'

import User from '../models/user.js'

export const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Validation failed, entered data is incorrect.',
        errors: errors.array(),
     })
     next()
    }
    const { email, password } = req.body
    const isUserExists = await User.findOne({ email })
    if (isUserExists) {
      const error = new Error('User already exists.')
      error.statusCode = 409
      throw error
    }
    const hashedPw = await bcrypt.hash(password, 12)
    const user = new User({
      email,
      password: hashedPw,
    })
    const result = await user.save()
    result.password = undefined
    res.status(201).json({
      message: 'User created successfully!',
      user: result,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}