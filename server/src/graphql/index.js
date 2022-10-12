import pkg from "lodash"
const { merge } = pkg
import { typeDefs as CourseDefs } from "./course/typedefs.js"
import { resolvers as courseResolvers } from "./course/resolvers.js"

export const typeDefs = [CourseDefs]
export const resolvers = merge(courseResolvers)
