import Sequelize from "sequelize"
import { sequelize } from "../db/index.js"

// Define course related tables with Sequelize

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
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  signupStart: Sequelize.DATE,
  signupEnd: Sequelize.DATE,
  courseCode: {
    type: Sequelize.STRING,
    references: {
      model: {
        tableName: "Course"
      },
      key: "code"
    }
  }
})

export const CourseEnrollment = sequelize.define("CourseEnrollment", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: {
        tableName: "User"
      },
      key: "id"
    }
  },
  instanceId: {
    type: Sequelize.INTEGER,
    references: {
      model: {
        tableName: "CourseInstance"
      },
      key: "id"
    }
  },
  blockId: {
    type: Sequelize.INTEGER,
    references: {
      model: {
        tableName: "StudyPlanBlock"
      },
      key: "id"
    }
  }
})

export const Occasion = sequelize.define("Occasion", {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  type: Sequelize.ENUM("Lecture", "Excercise", "Session", "Exam"),
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  location: Sequelize.STRING,
  instanceId: {
    type: Sequelize.INTEGER,
    references: {
      model: {
        tableName: "CourseInstance"
      },
      key: "id"
    }
  }
})
