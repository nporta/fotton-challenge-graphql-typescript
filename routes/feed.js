import express from 'express'
import { body } from 'express-validator'

import { createPost } from '../controllers/feed.js'

const router = express.Router()

router.post(
  '/create',
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Please, enter a title with at least 3 characteres.'),
  body('description')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Please, enter a description with at least 5 characteres.'),
  createPost)

export { router as feedRoutes }