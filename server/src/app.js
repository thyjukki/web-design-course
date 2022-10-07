import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"
import morgan from "morgan"
import bp from "body-parser"
import { errorHandler } from "./middlewares/errors.js"
import userRouter from "./routes/users.js"
import { typeDefs, resolvers } from "./graphql/users.js"

const app = express()

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
  cache: "bounded"
})
await apollo.start()
apollo.applyMiddleware({
  app,
  cors: {
    origin: "https://studio.apollographql.com"
  },
  path: "/graphql"
})

app.use("/users", userRouter)
app.use(errorHandler)

export default app