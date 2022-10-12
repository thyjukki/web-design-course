import React from "react"
import "./FrontPage.css"
import TopMenu from "./TopMenu"
import { useForm } from "react-hook-form"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

const FooBar = "Test"

const FrontPage = () => {
  return (
    <div>
      <TopMenu />
      Hello World! Updated!
    </div>
  )
}

export default FrontPage