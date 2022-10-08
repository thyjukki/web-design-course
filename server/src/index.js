import { port } from "./config/environment/index.js"
import app from "./app.js"
import http from "http"

const httpServer = http.createServer(app)

// start the Express server
const start = () => {
  try {
    httpServer.listen(port)
    console.log(`🚀  GraphQL server running at port: ${port}`)
  } catch {
    console.log("Not able to run GraphQL server")
  }
}

start()
