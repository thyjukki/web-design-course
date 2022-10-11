import Sequelize from "sequelize"
import { dbName, dbPort, dbPass } from "../config/environment/index.js"

export const sequelize = new Sequelize(dbName, "root", dbPass, {
  host: "localhost",
  port: dbPort,
  dialect: "mysql",
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