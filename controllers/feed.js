import { validationResult } from 'express-validator'

import Post from '../models/post.js'

export const createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Validation failed, entered data is incorrect.',
        errors: errors.array(),
     })
     next()
    }
    const { title, description } = req.body
    const post = new Post({ title, description, creator: req.userId })
    await post.save()
    res.status(201).json({
      message: 'Post created successfully!',
      post,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}