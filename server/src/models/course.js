import { User } from "./user.js"
import Sequelize from "sequelize"
import { sequelize } from "./index.js"

export const Course = sequelize.define("Course", {
  code: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  credits: Sequelize.INTEGER
})

export const CourseInstance = sequelize.define("CourseInstance", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  lecturer: Sequelize.STRING,
  startDate: Sequelize.TIME,
  endDate: Sequelize.TIME,
  signupStart: Sequelize.TIME,
  signupEnd: Sequelize.TIME
})

export const CourseEnrollment = sequelize.define("CourseEnrollment", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
})

export const Event = sequelize.define("Event", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  type: Sequelize.ENUM("Lecture", "Excercise", "Session", "Exam"),
  startDate: Sequelize.TIME,
  endDate: Sequelize.TIME,
  location: Sequelize.STRING
})

Course.hasMany(CourseInstance, {
  foreignKey: "courseId"
})
CourseInstance.belongsTo(Course)

CourseInstance.hasMany(Event, {
  foreignKey: "CourseInstanceId"
})
Event.belongsTo(CourseInstance)

// sync all models with the db
sequelize.sync()