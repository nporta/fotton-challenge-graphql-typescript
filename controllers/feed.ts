import { Request } from 'express'

import Post from '../models/post'
import User from '../models/user'
import isLoggedIn from '../middleware/isLoggedIn'

export interface PostData {
  title: string
  description: string
}

export const createPost = async (data: PostData, req: Request) => {
  isLoggedIn(req)
  const { title, description } = data
  const post = new Post({ title, description, creator: req.userId })
  await post.save()
  const user = await User.findById(req.userId)
  // @ts-ignore
  return { ...post._doc, creator: user }
}

export const getPosts = async (req: Request) => {
  isLoggedIn(req) // TODO check if there is a better place to check if logged in
  const posts = await Post.find({ creator: req.userId }).populate('creator')
  return posts
}

export const getPost = async (postId: string, req: Request) => {
  isLoggedIn(req)
  const post = await Post.findById(postId).populate('creator')
  if (!post) {
    const error = new Error('Post not found.')
    // @ts-ignore
    error.statusCode = 404
    throw error
  }
  if (post.creator._id.toString() !== req.userId) {
    const error = new Error('Not authorized!')
    // @ts-ignore
    error.statusCode = 401
    throw error
  }
  return post
}