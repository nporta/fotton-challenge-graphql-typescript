import validator from 'validator'
import { Request } from 'express'

import { signup, login } from '../controllers/auth'
import { createPost, getPosts, getPost, PostData } from '../controllers/feed'

export interface UserInput {
  email: string
  password: string
}

export default {
  async createUser ({ userInput }: { userInput: UserInput }) {
    const errors = []
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: 'Email is invalid.' })
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: 'Password too short!' })
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.')
      // @ts-ignore
      error.data = errors
      // @ts-ignore
      error.statusCode = 422
      throw error
    }
    return signup(userInput)
  },
  async login ({ email, password }: { email: string, password: string }) {
    return login(email, password)
  },
  async createPost({ postInput } : { postInput: PostData }, req: Request) {
    const errors = []
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: 'Title is invalid.' })
    }
    if (
      validator.isEmpty(postInput.description) ||
      !validator.isLength(postInput.description, { min: 5 })
    ) {
      errors.push({ message: 'Description is invalid.' })
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.')
      // @ts-ignore
      error.data = errors
      // @ts-ignore
      error.statusCode = 422
      throw error
    }
    return createPost(postInput, req)
  },
  async posts(_: any, req: Request) {
    return getPosts(req)
  },
  async post({ id } : { id: string }, req: Request) {
    return getPost(id, req)
  },
}