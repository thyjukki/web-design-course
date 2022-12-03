import { useMutation } from "@apollo/client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { LOGIN } from "./graphql/user"

const LoginPage = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (formData) => {
    const loginData = {
      username: formData.username,
      password: formData.password
    }
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/login`,
        loginData
      )
      localStorage.setItem("token", response.data)
      setError("")
      navigate("/")
    } catch (err) {
      setError(err.response.data)
    }
  }
  return (
    <div>
      <Header>Sisäänkirjautuminen</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>Käyttäjätunnus</label>
        <input {...register("username", { required: true })} />
        <label>Salasana</label>
        <input
          type={"password"}
          {...register("password", { required: true })}
        />
        {/* errors will return when field validation fails  */}

        <input type="submit" value="Kirjaudu" />
        {error && <Error>{error}</Error>}
        {errors.username && <Error>Kirjoita käyttäjätunnuksesi</Error>}
        {errors.password && <Error>Kirjoita salasanasi</Error>}
      </Form>
    </div>
  )
}

const Error = styled.span`
  color: red;
`

const Header = styled.h3`
  text-align: center;
`

const Form = styled.form`
  flex-direction: column;
  display: flex;
  justify-self: center;
  align-items: center;
`

export default LoginPage
