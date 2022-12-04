import { User } from "../../../models/index.js"
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

  return user.id
}
