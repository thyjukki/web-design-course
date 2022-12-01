export default {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASS,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql"
  }
}
