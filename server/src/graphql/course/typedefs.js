import { gql } from "apollo-server-express"

// Type definitions for course related stuff
export const typeDefs = gql`
  type Course {
    code: String!
    name: String!
    description: String
    credits: Int!
    instances: [CourseInstance!]
  }

  type CourseInstance {
    id: ID!
    parentCourse: Course!
    lecturer: User
    startDate: String!
    endDate: String!
    signupStart: String
    signupEnd: String
    occasions: [Occasion]
  }

  type Occasion {
    id: ID!
    instanceId: ID!
    type: OccasionType
    startDate: String
    endDate: String
    location: String
  }

  type StudyPlan {
    id: ID!
    name: String!
    user: User
  }

  enum OccasionType {
    LECTURE
    EXCERCISE
    SESSION
    EXAM
  }

  type Query {
    getCourses: [Course]
    getCourse(code: String!): Course
    getCourseInstances: [CourseInstance]
    getCourseInstance(id: ID!): CourseInstance
    getOccasions: [Occasion]
    getStudyPlans: [StudyPlan]
  }

  type Mutation {
    createCourse(
      code: String!
      name: String!
      description: String
      credits: Int!
    ): Course

    deleteCourse(code: String!): String

    createCourseInstance(
      courseCode: String!
      lecturerUser: String
      startDate: String!
      endDate: String!
      signupStart: String
      signupEnd: String
    ): CourseInstance

    deleteCourseInstance(id: ID!): String

    createOccasion(
      type: OccasionType!
      startDate: String!
      endDate: String!
      location: String!
      instanceId: ID
    ): Occasion

    deleteOccasion(id: ID!): String

    createStudyPlan(
      name: String!
      userId: ID!
    ): StudyPlan

    deleteStudyPlan(id: ID!): String
  }
`
