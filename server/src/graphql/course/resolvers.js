import {
  User,
  Course,
  CourseInstance,
  CourseEnrollment,
  Occasion,
  StudyPlanBlock
} from "../../models/index.js"
import { GraphQLError } from "graphql"
import { Op } from "sequelize"

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
    searchCourses: async (_, { word }) => {
      var whereBuilder = {}
      if (word) {
        whereBuilder = {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + word + "%"
              }
            },
            {
              code: {
                [Op.like]: "%" + word + "%"
              }
            }
          ]
        }
      }
      return Course.findAll({
        where: whereBuilder,
        include: [
          {
            model: CourseInstance,
            as: "instances",
            include: [
              {
                model: User,
                as: "lecturer"
              }
            ]
          }
        ]
      })
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
    searchCourseInstances: async (_, { word }) => {
      var whereBuilder = {}
      if (word) {
        whereBuilder = {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + word + "%"
              }
            },
            {
              code: {
                [Op.like]: "%" + word + "%"
              }
            }
          ]
        }
      }
      const courses = await Course.findAll({
        where: whereBuilder,
        include: [
          {
            model: CourseInstance,
            as: "instances"
          }
        ]
      })
      const instances = await Promise.all(
        courses.map(async (course) => {
          const rows = await CourseInstance.findAll({
            where: { courseCode: course.code },
            include: {
              model: Course,
              as: "parentCourse"
            }
          })
          return [...rows]
        })
      )
      return instances.flat()
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
    getOccasions: async (_, args) => {
      const whereBuilder = {}
      if (args.instance) {
        whereBuilder["instanceId"] = args.instance
      }
      return Occasion.findAll({
        where: whereBuilder,
        include: [
          {
            model: CourseEnrollment,
            as: "enrollments",
            include: { all: true }
          },
          {
            model: CourseInstance,
            as: "instance",
            include: { all: true }
          }
        ]
      })
    },
    getOccasionsForUser: async (_, args) => {
      const whereBuilder = {}
      if (args.instance) {
        whereBuilder["instanceId"] = args.instance
      }

      return Occasion.findAll({
        where: whereBuilder,
        include: [
          {
            model: CourseEnrollment,
            as: "enrollments",
            where: { userId: args.user },
            include: { all: true }
          },
          {
            model: CourseInstance,
            as: "instance",
            include: { all: true }
          }
        ]
      })
    },
    getCourseEnrollment: async (_, { id }) => {
      const enrollment = await CourseEnrollment.findByPk(id, {
        include: [
          {
            model: CourseInstance,
            as: "instance"
          },
          {
            model: User,
            as: "user"
          },
          {
            model: StudyPlanBlock,
            as: "studyPlanBlock"
          }
        ]
      })
      return enrollment
    },
    getCourseEnrollments: async (_, args) => {
      const whereBuilder = {}
      if (args.user) {
        whereBuilder["userId"] = args.user
      }
      if (args.instance) {
        whereBuilder["instanceId"] = args.instance
      }
      if (args.block) {
        whereBuilder["blockId"] = args.block
      }
      return CourseEnrollment.findAll({
        include: [
          {
            model: CourseInstance,
            as: "instance",
            include: { all: true }
          },
          {
            model: User,
            as: "user"
          },
          {
            model: StudyPlanBlock,
            as: "studyPlanBlock"
          }
        ],
        where: whereBuilder
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
      const occasion = await Occasion.create(args)
      return occasion.reload({ include: { all: true } })
    },
    deleteOccasion: async (_, { id }) => {
      try {
        Occasion.destroy({ where: { id } })
        return `Occasion ${id} deleted`
      } catch (e) {
        return e
      }
    },
    createCourseEnrollment: async (_, { userId, instanceId, blockId }) => {
      const result = await CourseEnrollment.findAll({
        where: { userId: userId, instanceId: instanceId }
      })
      if (result.length == 0) {
        const enrollment = await CourseEnrollment.create({
          userId,
          instanceId,
          blockId
        })
        return `Enrollment ${enrollment.id}`
      }
      return "Already enrolled"
    },
    updateCourseEnrollment: async (_, { id, blockId }) => {
      const enrollment = await CourseEnrollment.findOne({
        where: { id: id }
      })
      const studyPlanBlock = await StudyPlanBlock.findOne({
        where: { id: blockId }
      })

      if (!enrollment) {
        throw new GraphQLError("Enrollment not found!", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      if (!studyPlanBlock) {
        throw new GraphQLError("Study plan block not found", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }

      await enrollment.update({ blockId: studyPlanBlock.id })
      return enrollment.reload({
        include: [
          {
            model: StudyPlanBlock,
            as: "studyPlanBlock"
          },
          {
            model: User,
            as: "user"
          },
          {
            model: CourseInstance,
            as: "instance"
          }
        ]
      })
    },
    deleteCourseEnrollment: async (_, { userId, instanceId }) => {
      try {
        CourseEnrollment.destroy({ where: { userId, instanceId } })
        return `CourseEnrollment deleted`
      } catch (e) {
        console.error(e)
        return e
      }
    }
  }
}
