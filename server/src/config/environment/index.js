import dotenv from "dotenv"

dotenv.config()

const port = process.env.BACKEND_PORT
const dbHost = process.env.MYSQL_HOST
const dbName = process.env.MYSQL_DB
const dbPort = process.env.MYSQL_PORT
const dbPass = process.env.MYSQL_ROOT_PASS

const env = {
  development: process.env.NODE_ENV === "development",
  staging: process.env.NODE_ENV === "staging",
  production: process.env.NODE_ENV === "production"
}

export { port, env, dbHost, dbName, dbPort, dbPass }
