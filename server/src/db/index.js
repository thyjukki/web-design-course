import Sequelize from "sequelize"
import mysql from "mysql2/promise"
import { dbHost, dbName, dbPort, dbUser, dbPass } from "../config/environment/index.js"

const connection = await mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass
})
await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`)

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
  logging: true,
  define: {
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
  operatorsAliases: false
})
