import { Course, CourseInstance } from "../../models/course.js"

export const resolvers = {
  Query: {
    getCourses: async () => {
      return await Course.findAll()
    },
    getCourse: async (_, args) => {
      return await Course.findByPk(args.code)
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
    },
    createCourseInstance: async (_, args) => {
      return CourseInstance.create(args)
    },
    deleteCourseInstance: async (_, args) => {
      try {
        Course.destroy({ where: {id: args.id} })
        return `Course instance ${args.id} deleted`
      } catch (e) {
        return e
      }
    }
  }
}
