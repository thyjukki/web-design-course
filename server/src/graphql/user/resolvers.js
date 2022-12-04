import {
  CourseInstance,
  User,
  UserRole,
  StudyPlan
} from "../../models/index.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

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
    },
    getUserInfo: async (_, { userId }, context) => {
      return User.findByPk(userId, {
        attributes: { exclude: ["password"] },
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
            as: "studyPlans",
            include: { all: true }
          }
        ]
      })
    }
  },

  Mutation: {
    register: async (_, args) => {
      const { password, roles, ...rest } = args

      const salt = bcryptjs.genSaltSync()
      const hashedPassword = bcryptjs.hashSync(password, salt)
      const user = await User.create({ ...rest, password: hashedPassword })
      await Promise.all(
        roles.map(async (role) => {
          await UserRole.create({ role, userId: user.id })
        })
      )
      const userRoles = await UserRole.findAll({ where: { userId: user.id } })
      return jwt.sign(
        {
          sisu: {
            roles: userRoles
          }
        },
        process.env.TOKEN_KEY,
        { algorithm: "HS256", subject: user.id.toString(), expiresIn: "1h" }
      )
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
