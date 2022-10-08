export const users = (sequelize, DataTypes) =>
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING,
    fullName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    createdOn: DataTypes.TIME,
    lastLogin: DataTypes.TIME
  })
