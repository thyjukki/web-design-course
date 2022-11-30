import { hash } from "argon2"

export const hashPassword = (password) => {
  return hash(password)
}
