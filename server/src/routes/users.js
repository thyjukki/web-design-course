import { Router } from "express"
import { sequelize } from "../models/index.js"
import { User } from "../models/user.js"

const router = Router()

router.get("/", async (req, res) => {
  await sequelize.sync()
  const rows = await User.findAll()
  console.log(rows)
  return rows ? rows : []
})

export default router
