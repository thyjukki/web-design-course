import {
  CourseInstance,
  User,
  UserRole,
  StudyPlan
} from "../../models/index.js"
import { hashPassword } from "../../utils/hashPassword.js"
import { signToken } from "../../utils/signToken.js"

import { login } from "./mutations/index.js"

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
      console.log(args)
      const { password, ...rest } = args
      const hashedPassword = await hashPassword(password)
      const result = await User.create({ ...rest, password: hashedPassword })

      return {
        id: result.id,
        username: result.username,
        password: result.password,
        token: signToken({ userId: result.id })
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        User.destroy({ where: { id } })
        return `User ${id} deleted`
      } catch (e) {
        return e
      }
    },
    login
  }
}
