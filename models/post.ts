import mongoose, { PopulatedDoc, Document } from 'mongoose'
import { User } from './user'

const Schema = mongoose.Schema

interface Post {
  title: string
  description: string
  creator: PopulatedDoc<User & Document>
}

const postSchema = new Schema<Post>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

export default mongoose.model<Post>('Post', postSchema)