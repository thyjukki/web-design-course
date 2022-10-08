import { gql } from "apollo-server-express"
import * as db from "../models/index.js"

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
    users: async () => {
      const rows = db.users.findAll()
      console.log(rows);
      return rows ? rows : []
    },
    user: async (obj, args, context, info) => {
      const rows = db.users.findByPk(args.id)
      return rows ? rows : {}
    },
  }
}
