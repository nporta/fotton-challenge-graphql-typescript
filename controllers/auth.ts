import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user'

export const signup = async (data : { email: string, password: string}) => {
  const { email, password } = data
  const isUserExists = await User.findOne({ email })
  if (isUserExists) {
    const error = new Error('User already exists.')
    // @ts-ignore
    error.statusCode = 409
    throw error
  }
  const hashedPw = await bcrypt.hash(password, 12)
  const user = new User({
    email,
    password: hashedPw,
  })
  const result = await user.save()
  return result
}

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('A user with this email could not be found.')
    // @ts-ignore
    error.statusCode = 403
    throw error
  }
  const isEqual = await bcrypt.compare(password, user.password)
  if (!isEqual) {
    const error = new Error('Wrong password')
    // @ts-ignore
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
  return { token, userId: user._id }
}