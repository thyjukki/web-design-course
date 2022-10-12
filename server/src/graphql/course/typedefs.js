import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type Course {
    code: String!
    name: String!
    description: String
    credits: Int!
    instances: [CourseInstance]
  }

  type CourseInstance {
    id: ID!
    CourseCode: String!
    lecturer: String!
    startDate: String!
    endDate: String!
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
      credits: Int!
    ): Course
    
    deleteCourse(
      code: String!
    ): String

    createCourseInstance(
      CourseCode: String!
      lecturer: String!
      startDate: String!
      endDate: String!
      signupStart: String
      signupEnd: String
    ): CourseInstance

    deleteCourseInstance(
      id: ID!
    ): String
  }
`