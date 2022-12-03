import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  from
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import { Provider } from "react-redux"
import store from "./reduxStore"

const graphqlUrl = `${process.env.BACKEND_URL}/graphql`

const errorLink = onError(({ networkError }) => {
  if ([401, 403].includes(networkError.statusCode)) {
    localStorage.removeItem("token")
    client.resetStore()
  }
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})
const link = createHttpLink({ uri: graphqlUrl })
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, link]),
  headers: {
    authorization: localStorage.getItem("token") || "",
    "Access-Control-Allow-Origin": "*"
  },
  credentials: "include"
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
)
