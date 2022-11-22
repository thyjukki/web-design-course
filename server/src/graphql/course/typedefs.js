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

  type CourseEnrollment {
    id: ID!
    user: User!
    instance: CourseInstance!
    studyPlanBlock: StudyPlanBlock
  }

  type Occasion {
    id: ID!
    instance: CourseInstance!
    type: OccasionType
    enrollments: [CourseEnrollment]
    startDate: String
    endDate: String
    location: String
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
    searchCourses(word: String!): [Course]
    getCourseInstances: [CourseInstance]
    getCourseInstance(id: ID!): CourseInstance
    getCourseEnrollment(id: ID!): CourseEnrollment
    getCourseEnrollments(user: ID, instance: ID, block: ID): [CourseEnrollment]
    getOccasions(instance: ID): [Occasion]
    getOccasionsForUser(user: ID, instance: ID): [Occasion]
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

    createCourseEnrollment(
      userId: ID!
      instanceId: ID!
      blockId: ID
    ): CourseEnrollment

    updateCourseEnrollment(id: ID!, blockId: ID!): CourseEnrollment

    deleteCourseEnrollment(id: ID!): String
  }
`
