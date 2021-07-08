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

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ creator: req.userId })
    console.log(posts)
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

export const getPost = async (req, res, next) => {
  const { postId } = req.params
  try {
    const post = await Post.findById(postId)
    if (!post) {
      const error = new Error('Post not found.')
      error.statusCode = 404
      throw error
    }
    if (post.creator.toString() != req.userId) {
      const error = new Error('Not authorized!')
      error.statusCode = 401
      throw error
    }
    res.status(200).json({
      message: 'Post fetched successfully.',
      post,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}