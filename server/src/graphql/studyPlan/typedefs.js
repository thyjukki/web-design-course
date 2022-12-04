import { gql } from "apollo-server-express"

// Type definitions for course related stuff
export const typeDefs = gql`
  type StudyPlan {
    id: Int!
    name: String!
    user: User
    children: [StudyPlanBlock]
    baseBlock: StudyPlanBlock
  }

  type StudyPlanBlock {
    id: Int!
    name: String!
    parent: StudyPlanBlock
    enrollments: [CourseEnrollment]
  }

  type Query {
    getStudyPlans: [StudyPlan]
    getStudyPlanBlocks: [StudyPlanBlock]
  }

  type Mutation {
    createStudyPlan(name: String!, userId: Int!): StudyPlan

    createStudyPlanBlock(name: String!, parentId: Int): StudyPlanBlock
    updateStudyPlanBaseBlock(studyPlanId: Int!, baseBlockId: Int!): StudyPlan

    deleteStudyPlan(id: Int!): String
    deleteStudyPlanBlock(id: Int!): String
  }
`
