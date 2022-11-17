import {
  CourseInstance,
  User,
  UserRole,
  StudyPlan
} from "../../models/index.js"

export const resolvers = {
  Query: {
    getUsers: async () => {
      return User.findAll({
        include: [
          {
            model: UserRole,
            as: "roles"
          },
          {
            model: CourseInstance,
            as: "lecturerIn"
          },
          {
            model: StudyPlan,
            as: "studyPlans"
          }
        ]
      })
    },
    getUser: async (_, { id }) => {
      return User.findByPk(id, {
        include: [
          {
            model: UserRole,
            as: "roles"
          },
          {
            model: CourseInstance,
            as: "lecturerIn"
          },
          {
            model: StudyPlan,
            as: "studyPlans"
          }
        ]
      })
    }
  },
  Mutation: {
    register: async (_, args) => {
      return User.create(args)
    },
    deleteUser: async (_, { id }) => {
      try {
        User.destroy({ where: { id } })
        return `User ${id} deleted`
      } catch (e) {
        return e
      }
    }
  }
}
