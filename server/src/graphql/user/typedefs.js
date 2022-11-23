import { gql } from "apollo-server-express"

// Type definitions for user related stuff
export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    fullName: String
    password: String
    token: String
    email: String
    roles: [String]
    lecturerIn: [CourseInstance]
    studyPlans: [StudyPlan]
    createdOn: String
    lastLogin: String
  }

  input userInput {
    username: String!
    password: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }
  

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      fullName: String
    ): User

    login(input: userInput): User

    deleteUser(id: ID!): String
  }
`
