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
    roles: [UserRole]
    lecturerIn: [CourseInstance]
    studyPlans: [StudyPlan]
    createdOn: String
    lastLogin: String
  }

  type UserRole {
    id: Int!
    userId: Int!
    role: String!
  }

  input userInput {
    username: String!
    password: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: Int!): User
    getUserInfo(userId: Int!): User
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      fullName: String
      roles: [String]
    ): String

    login(username: String!, password: String!): String

    deleteUser(id: Int!): String
  }
`
