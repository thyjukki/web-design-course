import { User, Course, CourseInstance, Occasion } from "../../models/index.js"
import { GraphQLError } from "graphql"

export const resolvers = {
  Query: {
    getCourses: async () => {
      return Course.findAll({
        include: {
          model: CourseInstance,
          as: "instances"
        }
      })
    },
    getCourse: async (_, { code }) => {
      return Course.findByPk(code)
    },
    getCourseInstances: async () => {
      return CourseInstance.findAll({
        include: [
          {
            model: Course,
            as: "parentCourse"
          },
          {
            model: User,
            as: "lecturer"
          },
          {
            model: Occasion,
            as: "occasions"
          }
        ]
      })
    },
    getCourseInstance: async (_, { id }) => {
      return CourseInstance.findByPk(id, {
        include: [
          {
            model: Course,
            as: "parentCourse"
          },
          {
            model: User,
            as: "lecturer"
          },
          {
            model: Occasion,
            as: "occasions"
          }
        ]
      })
    },
    getOccasions: async () => {
      return Occasion.findAll({
        include: {
          model: CourseInstance,
          as: "instanceId"
        }
      })
    }
  },

  Mutation: {
    createCourse: async (_, args) => {
      return Course.create(args)
    },
    deleteCourse: async (_, { code }) => {
      try {
        Course.destroy({ where: { code } })
        return `${code} deleted`
      } catch (e) {
        return e
      }
    },
    createCourseInstance: async (_, args) => {
      const lecturer = await User.findOne({
        where: { username: args.lecturerUser }
      })
      if (!lecturer) {
        throw new GraphQLError("Lecturer not found", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      args.lecturerId = lecturer.id
      console.log(args)
      return CourseInstance.create(args)
    },
    deleteCourseInstance: async (_, { id }) => {
      try {
        CourseInstance.destroy({ where: { id } })
        return `Course instance ${id} deleted`
      } catch (e) {
        return e
      }
    },
    createOccasion: async (_, args) => {
      const instance = await CourseInstance.findOne({
        where: { id: args.instanceId }
      })
      if (!instance) {
        throw new GraphQLError("Course instance not found", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      console.log(args)
      return Occasion.create(args)
    },
    deleteOccasion: async (_, { id }) => {
      try {
        Occasion.destroy({ where: { id } })
        return `Occasion ${id} deleted`
      } catch (e) {
        return e
      }
    }
  }
}
