import Sequelize from "sequelize"
import { sequelize } from "../db/index.js"

// Define user related tables with Sequelize

export const User = sequelize.define("User", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: {
    unique: true,
    type: Sequelize.STRING
  },
  email: {
    unique: true,
    type: Sequelize.STRING
  },
  fullName: Sequelize.STRING,
  password: Sequelize.STRING,
  lastLogin: Sequelize.TIME
})

export const UserRole = sequelize.define("UserRole", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  role: Sequelize.STRING
})
