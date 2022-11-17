import { Router } from "express"
import { sequelize } from "../db/index.js"
import { User } from "../models/user.js"

const router = Router()

router.get("/", async (req, res) => {
  await sequelize.sync()
  const rows = await User.findAll()
  return rows ? rows : []
})

export default router
