import express from 'express'
import { body } from 'express-validator'

import { signup } from '../controllers/auth.js'

const router = express.Router()

router.post(
  '/signup',
  body('email').isEmail().withMessage('Please, enter a valid email.').normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Please, enter a password with at least 5 characteres.')
    .isAlphanumeric()
    .withMessage('Please, enter a password with only numbers and letters'), 
  signup)

export { router as authRoutes }