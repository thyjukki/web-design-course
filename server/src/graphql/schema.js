import pkg from "lodash"
const { merge } = pkg
import {
  typeDefs as CourseDefs,
  resolvers as courseResolvers
} from "./course.js"

export const typeDefs = [CourseDefs]
export const resolvers = merge(courseResolvers)
