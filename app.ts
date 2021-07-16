import express, { ErrorRequestHandler } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { graphqlHTTP } from 'express-graphql'

import auth from './middleware/auth'
import graphqlSchema from './graphql/schema'
import graphqlResolver from './graphql/resolvers'


const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(auth)

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.statusCode
  const message = error.message
  const data = error.data
  res.status(status).json({
    message,
    data,
  })
}

app.use(errorHandler)

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: {
      headerEditorEnabled: true,
    },
    formatError(err) {
      if (!err.originalError) {
        return err
      }
      // @ts-ignore need to type originalError
      const data = err.originalError.data
      const message = err.message || 'An error occurred!'
      // @ts-ignore
      const code = err.originalError.statusCode || 500
      return { message, status: code, data }
    }
  })
)

mongoose.connect(
  process.env.MONGO_URL,
  {
    useCreateIndex: true,
  }
).then(result => {
  app.listen(3000)
})
.catch(err => console.log(err))