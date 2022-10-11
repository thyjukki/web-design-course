import Sequelize from "sequelize"
import { sequelize } from "./index.js"

export const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  fullName: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  createdOn: Sequelize.TIME,
  lastLogin: Sequelize.TIME
})

export const UserRole = sequelize.define("UserRole", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role: Sequelize.STRING,
})

User.hasMany(UserRole, {
  foreignKey: "userId"
})


sequelize.sync()
