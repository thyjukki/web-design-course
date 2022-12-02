import { ApolloServer } from "apollo-server-express"
import express from "express"
import pkg from "express-jwt"
import morgan from "morgan"
import bp from "body-parser"
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway"
import { errorHandler } from "./middlewares/errors.js"
import userRouter from "./routes/users.js"
import { typeDefs, resolvers } from "./graphql/index.js"

const { expressjwt, ExpressJwtRequest } = pkg
const app = express()
app.disable("x-powered-by")

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(
  expressjwt({
    secret: process.env.TOKEN_KEY,
    algorithms: ["HS256"],
    credentialsRequired: false
  })
)

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
  cache: "bounded",
  context: ({ req }) => ({
    user: req.auth
  })
})
await apollo.start()
apollo.applyMiddleware({
  app,
  cors: {
    origin: [
      "https://sisu.jukk.it",
      "https://sisu-server.cap.jukk.it",
      "https://sisu-client.cap.jukk.it",
      `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`,
      "https://studio.apollographql.com"
    ],
    credentials: true
  },
  path: "/graphql"
})

app.use("/users", userRouter)
app.use(errorHandler)

export default app
