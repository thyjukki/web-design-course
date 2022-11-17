import Sequelize from "sequelize"
import { sequelize } from "../db/index.js"

export const StudyPlan = sequelize.define("StudyPlan", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  baseBlockId: {
    type: Sequelize.INTEGER,
    references: {
      model: {
        tableName: "StudyPlanBlock"
      },
      key: "id"
    }
  }
})

export const StudyPlanBlock = sequelize.define("StudyPlanBlock", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  parentId: {
    type: Sequelize.INTEGER,
    references: {
      model: {
        tableName: "StudyPlanBlock"
      },
      key: "id"
    }
  }
})
