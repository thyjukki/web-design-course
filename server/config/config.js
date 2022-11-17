export default {
  development: {
    username: "root",
    password: process.env.MYSQL_ROOT_PASS,
    database: process.env.MYSQL_DB,
    host: "localhost",
    port: process.env.MYSQL_PORT,
    dialect: "mysql"
  }
}
