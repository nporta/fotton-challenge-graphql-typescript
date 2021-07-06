import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

mongoose.connect(
  process.env.MONGO_URL,
  {
    useCreateIndex: true,
  }
).then(result => {
  app.listen(3000)
})
.catch(err => console.log(err))