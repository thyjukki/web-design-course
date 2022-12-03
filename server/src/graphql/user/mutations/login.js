import { User, UserRole } from "../../../models/index.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const login = async (_, { username, password }) => {
  const user = await User.findOne({ where: { username } })

  if (!user) {
    throw new Error("Invalid password or username")
  }

  const isValidPassword = bcrypt.compareSync(password, user.password)

  if (!isValidPassword) {
    throw new Error("Invalid password or username")
  }
  const roleRows = await UserRole.findAll({ where: { userId: user.id } })
  const roles = roleRows.map((role) => role.role)

  return jwt.sign(
    {
      sisu: {
        roles: roles
      }
    },
    process.env.TOKEN_KEY,
    { algorithm: "HS256", subject: user.id.toString(), expiresIn: "1h" }
  )
}
