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
      console.log(word)
      return Course.findAll({
        where: {
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
        },
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
    },
    getCourseEnrollment: async (_, { id }) => {
      var enrolment = await CourseEnrollment.findByPk(id, {
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
      console.log(enrolment)
      return enrolment
    },
    getCourseEnrollments: async (_, args) => {
      var whereBuilder = {}
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
      return Occasion.create(args)
    },
    deleteOccasion: async (_, { id }) => {
      try {
        Occasion.destroy({ where: { id } })
        return `Occasion ${id} deleted`
      } catch (e) {
        return e
      }
    },
    createCourseEnrollment: async (_, args) => {
      const enrolment = await CourseEnrollment.create(args)
      return enrolment.reload({ include: { all: true } })
    },
    updateCourseEnrollment: async (_, { id, blockId }) => {
      const enrolment = await CourseEnrollment.findOne({
        where: { id: id }
      })
      const studyPlanBlock = await StudyPlanBlock.findOne({
        where: { id: blockId }
      })

      if (!enrolment) {
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

      await enrolment.update({ blockId: studyPlanBlock.id })
      return enrolment.reload({
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
    deleteCourseEnrollment: async (_, { id }) => {
      try {
        console.log(id)
        CourseEnrollment.destroy({ where: { id } })
        return `CourseEnrollment ${id} deleted`
      } catch (e) {
        console.log(e)
        return e
      }
    }
  }
}
