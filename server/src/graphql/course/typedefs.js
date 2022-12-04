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
    id: Int!
    parentCourse: Course!
    lecturer: User
    startDate: String!
    endDate: String!
    signupStart: String
    signupEnd: String
    occasions: [Occasion]
  }

  type CourseEnrollment {
    id: Int!
    user: User!
    instance: CourseInstance!
    studyPlanBlock: StudyPlanBlock
  }

  type Occasion {
    id: Int!
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
    searchCourseInstances(word: String!): [CourseInstance]
    getCourseInstance(id: Int!): CourseInstance
    getCourseEnrollment(id: Int!): CourseEnrollment
    getCourseEnrollments(
      user: Int
      instance: Int
      block: Int
    ): [CourseEnrollment]
    getOccasions(instance: Int): [Occasion]
    getOccasionsForUser(user: Int, instance: Int): [Occasion]
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

    deleteCourseInstance(id: Int!): String

    createOccasion(
      type: OccasionType!
      startDate: String!
      endDate: String!
      location: String!
      instanceId: Int
    ): Occasion

    deleteOccasion(id: Int!): String

    createCourseEnrollment(userId: Int!, instanceId: Int!, blockId: Int): String

    updateCourseEnrollment(id: Int!, blockId: Int!): CourseEnrollment

    deleteCourseEnrollment(userId: Int!, instanceId: Int!): String
  }
`
