import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  id: Schema.ObjectId,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.model('User', userSchema)