import pkg from "lodash"
const { merge } = pkg
import { typeDefs as courseDefs } from "./course/typedefs.js"
import { resolvers as courseResolvers } from "./course/resolvers.js"
import { typeDefs as userDefs } from "./user/typedefs.js"
import { resolvers as userResolvers } from "./user/resolvers.js"
import { typeDefs as StudyPlanDefs } from "./studyPlan/typedefs.js"
import { resolvers as StudyPlanResolvers } from "./studyPlan/resolvers.js"

export const typeDefs = [courseDefs, userDefs, StudyPlanDefs]
export const resolvers = merge(
  courseResolvers,
  userResolvers,
  StudyPlanResolvers
)
