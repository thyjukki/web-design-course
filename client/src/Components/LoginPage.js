import React from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <div>
      <Header>Sisäänkirjautuminen</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>username</label>
        <input {...register("username", { required: true })} />
        <label>password</label>
        <input
          type={"password"}
          {...register("password", { required: true })}
        />
        {/* errors will return when field validation fails  */}

        <input type="submit" value="Kirjaudu" />
        {errors.username && <span>Please type your username</span>}
        {errors.password && <span>Please type your password</span>}
      </Form>
    </div>
  )
}

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
