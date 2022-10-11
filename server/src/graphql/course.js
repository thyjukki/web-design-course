import { gql } from "apollo-server-express"
import { Course } from "../models/course.js"

export const typeDefs = gql`
  type Course {
    code: String!
    name: String!
    description: String
    credits: Int
    instances: [CourseInstance]
  }

  input CourseInput {
    code: String!
    name: String!
    description: String
    credits: Int
  }

  type CourseInstance {
    id: ID!
    lecturer: String
    startDate: String
    endDate: String
    signupStart: String
    signupEnd: String
  }

  type Query {
    getCourses: [Course]
    getCourse(code: String!): Course
  }

  type Mutation {
    createCourse(
      code: String!
      name: String!
      description: String
      credits: Int
    ): Course
    deleteCourse(
      code: String!
    ): String
  }
`

export const resolvers = {
  Query: {
    getCourses: async () => {
      const rows = Course.findAll()
      return rows
    },
    getCourse: async (_, args) => {
      const rows = await Course.findByPk(args.code)
      return rows
    },
  },
  Mutation: {
    createCourse: async (_, args) => {
      return Course.create(args)
    },
    deleteCourse: async (_, args) => {
      try {
        Course.destroy({ where: {code: args.code} })
        return `${args.code} deleted`
      } catch (e) {
        return e
      }
    }
  }
}
