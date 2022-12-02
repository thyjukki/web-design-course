import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import { Provider } from "react-redux"
import store from "./reduxStore"

const graphqlUrl = `${process.env.BACKEND_URL}/graphql`

const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache()
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
