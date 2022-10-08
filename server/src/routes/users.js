import { Router } from "express"
import db from "../models/index.js"

const router = Router()

router.get("/", async (req, res) => {
  await db.sequelize.sync()
  const rows = await db.sequelize.query("SELECT * FROM users;")
  console.log(rows)
  return rows ? rows : []
})

export default router
