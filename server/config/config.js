export default {
  development: {
    username: "root",
    password: process.env.MYSQL_ROOT_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql"
  }
}
