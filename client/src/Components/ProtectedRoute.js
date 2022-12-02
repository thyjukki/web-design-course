import React from "react"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
  !localStorage.getItem("token") ? <Navigate replace to="/login" /> : children
}
