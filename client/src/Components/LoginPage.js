import React from "react"
import { useForm } from "react-hook-form"

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)
  return (
    <div>
      <div>Login</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>username</label>
        <input {...register("username", { required: true })} />
        <label>password</label>
        <input type={"password"} {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.username && <span>Please type your username</span>}
        {errors.password && <span>Please type your password</span>}
        
        <input type="submit" />
      </form>

    </div>
  )
}

export default LoginPage