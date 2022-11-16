import { CourseInstance, User, UserRole } from "../../models/index.js"

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.findAll({
        include: {
          model: UserRole,
          as: "roles"
        }
      })
    },
    getUser: async (_, { id }) => {
      return await User.findByPk(id, {
        include: [
          {
            model: UserRole,
            as: "roles"
          },
          {
            model: CourseInstance,
            as: "lecturerIn"
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
