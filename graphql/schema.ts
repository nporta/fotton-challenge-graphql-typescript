import { buildSchema } from 'graphql'
import { importSchema } from 'graphql-import'

const schema = importSchema('graphql/schema.graphql')

export default buildSchema(schema)
