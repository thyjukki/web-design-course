import Sequelize from "sequelize"
import { dbName, dbPort, dbPass } from "../config/environment/index.js"
import { users } from "../models/users.js"

var db = {}

const sequelize = new Sequelize(dbName, "root", dbPass, {
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

let models = [users]

// Initialize models
models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize)
  db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach((key) => {
  if ("associate" in db[key]) {
    db[key].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
