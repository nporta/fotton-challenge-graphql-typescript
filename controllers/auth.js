import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

import User from '../models/user.js'

export const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req)
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

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Validation failed, entered data is incorrect.',
        errors: errors.array(),
     })
     next()
    }
    const { email } = req.body
    const { password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error('A user with this email could not be found.')
      error.statusCode = 403
      throw error
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      const error = new Error('Wrong password')
      error.statusCode = 403
      throw error
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    user.password = undefined
    res.status(201).json({
      message: 'User logged in successfully!',
      token,
      user,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}