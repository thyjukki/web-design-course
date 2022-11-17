import { User, UserRole } from "./user.js"
import { Course, CourseInstance, CourseEnrollment, Occasion, StudyPlan } from "./course.js"
import { sequelize } from "../db/index.js"

// Define relations between different tables

User.hasMany(UserRole, { foreignKey: "userId", as: "roles" })
UserRole.belongsTo(User, { foreignKey: "userId", as: "user" })

User.hasMany(CourseInstance, {  foreignKey: "lecturerId", as: "lecturerIn" })
CourseInstance.belongsTo(User, { foreignKey: "lecturerId", as: "lecturer" });

User.hasMany(StudyPlan, {foreignKey: "userId", as: "studyPlans"})
StudyPlan.belongsTo(User, {foreignKey: "userId", as: "user"})

Course.hasMany(CourseInstance, { foreignKey: "courseCode", as: "instances" })
CourseInstance.belongsTo(Course, {
  foreignKey: "courseCode",
  as: "parentCourse"
})

CourseInstance.hasMany(Occasion, { foreignKey: "instanceId", as: "occasions" })
Occasion.belongsTo(CourseInstance, { foreignKey: "instanceId", as: "instance" })

sequelize.sync()

export { User, UserRole, Course, CourseInstance, CourseEnrollment, Occasion, StudyPlan }
