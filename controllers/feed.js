import Post from '../models/post.js'
import User from '../models/user.js'
import isLoggedIn from '../middleware/isLoggedIn.js'

export const createPost = async (data, req) => {
  isLoggedIn(req)
  const { title, description } = data
  const post = new Post({ title, description, creator: req.userId })
  await post.save()
  const user = await User.findById(req.userId)
  return { ...post._doc, creator: user }
}

export const getPosts = async (req) => {
  isLoggedIn(req) // TODO check if there is a better place to check if logged in
  const posts = await Post.find({ creator: req.userId }).populate('creator')
  return posts
}

export const getPost = async (postId, req) => {
  isLoggedIn(req)
  const post = await Post.findById(postId).populate('creator')
  if (!post) {
    const error = new Error('Post not found.')
    error.statusCode = 404
    throw error
  }
  if (post.creator._id.toString() != req.userId) {
    const error = new Error('Not authorized!')
    error.statusCode = 401
    throw error
  }
  return post
}