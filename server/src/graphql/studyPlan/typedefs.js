import { gql } from "apollo-server-express"

// Type definitions for course related stuff
export const typeDefs = gql`
  type StudyPlan {
    id: ID!
    name: String!
    user: User
    baseBlock: StudyPlanBlock
  }

  type StudyPlanBlock {
    id: ID!
    name: String!
    parent: StudyPlanBlock
  }

  type Query {
    getStudyPlans: [StudyPlan]
    getStudyPlanBlocks: [StudyPlanBlock]
  }

  type Mutation {
    createStudyPlan(name: String!, userId: ID!): StudyPlan

    createStudyPlanBlock(name: String!, parentId: ID): StudyPlanBlock
    updateStudyPlanBaseBlock(studyPlanId: ID!, baseBlockId: ID!): StudyPlan

    deleteStudyPlan(id: ID!): String
    deleteStudyPlanBlock(id: ID!): String
  }
`
