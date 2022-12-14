import { User, UserRole } from "./user.js"
import { Course, CourseInstance, CourseEnrollment, Occasion } from "./course.js"
import { StudyPlan, StudyPlanBlock } from "./studyPlan.js"
import { sequelize } from "../db/index.js"

// Define relations between different tables

User.hasMany(UserRole, { foreignKey: "userId", as: "roles" })
UserRole.belongsTo(User, { foreignKey: "userId", as: "user" })

User.hasMany(CourseInstance, { foreignKey: "lecturerId", as: "lecturerIn" })
CourseInstance.belongsTo(User, { foreignKey: "lecturerId", as: "lecturer" })

User.hasMany(StudyPlan, { foreignKey: "userId", as: "studyPlans" })
StudyPlan.belongsTo(User, { foreignKey: "userId", as: "user" })

User.hasMany(CourseEnrollment, { foreignKey: "userId", as: "enrollments" })
CourseEnrollment.belongsTo(User, { foreignKey: "userId", as: "user" })

CourseInstance.hasMany(CourseEnrollment, {
  foreignKey: "instanceId",
  as: "enrollments"
})
CourseEnrollment.belongsTo(CourseInstance, {
  foreignKey: "instanceId",
  as: "instance"
})

StudyPlanBlock.hasMany(CourseEnrollment, {
  foreignKey: "blockId",
  as: "enrollments"
})
CourseEnrollment.belongsTo(StudyPlanBlock, {
  foreignKey: "blockId",
  as: "studyPlanBlock"
})

StudyPlan.belongsTo(StudyPlanBlock, {
  foreignKey: "baseBlockId",
  as: "baseBlock"
})

StudyPlanBlock.hasMany(StudyPlanBlock, {
  foreignKey: { name: "parentId", allowNull: true },
  as: "children"
})
StudyPlanBlock.belongsTo(StudyPlanBlock, {
  foreignKey: { name: "parentId", allowNull: true },
  as: "parent"
})

Course.hasMany(CourseInstance, { foreignKey: "courseCode", as: "instances" })
CourseInstance.belongsTo(Course, {
  foreignKey: "courseCode",
  as: "parentCourse"
})

CourseInstance.hasMany(Occasion, { foreignKey: "instanceId", as: "occasions" })
Occasion.belongsTo(CourseInstance, { foreignKey: "instanceId", as: "instance" })

CourseEnrollment.hasMany(Occasion, {
  foreignKey: "instanceId",
  sourceKey: "instanceId",
  as: "occasions"
})
Occasion.hasMany(CourseEnrollment, {
  foreignKey: "instanceId",
  sourceKey: "instanceId",
  as: "enrollments"
})

sequelize.sync()

export {
  User,
  UserRole,
  Course,
  CourseInstance,
  CourseEnrollment,
  Occasion,
  StudyPlan,
  StudyPlanBlock
}
