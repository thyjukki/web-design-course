import { gql } from "apollo-server-express"
import * as db from "../db/db.js"

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    fullName: String
    password: String
    email: String
    roles: [String]
    createdOn: String
    lastLogin: String
  }
  type Query {
    users: [User]
    user(id: ID!): User
  }
`

export const resolvers = {
  Query: {
    users: async () => db.users.findAll(),
    user: async (obj, args, context, info) => db.users.findByPk(args.id)
  }
}
