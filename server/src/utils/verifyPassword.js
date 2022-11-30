import { verify } from "argon2"

export const verifyPassword = (hash, password) => {
  return verify(hash, password)
}
