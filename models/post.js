import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
  id: Schema.ObjectId,
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

export default mongoose.model('Post', postSchema)