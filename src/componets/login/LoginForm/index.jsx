import Cookies from "js-cookie"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../../store/auth";
import { login } from "../../../services/login";
import "./index.css";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const setToken = useAuthStore(state => state.setToken)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setLoading(true)

    const { email, password } = data
    if(email === '' || password === ''){
      setError('Error')
      setLoading(false)
      return  'error'
    }

    // Realizamos la validacion de las credenciales proporcionadas
    const response = await login({ email, password }) 
    
    if(!response.token){
      setError('Error')
      setLoading(false)
      return  'error'
    }

    Cookies.set('access_token', response.token)
    setToken(response)
    setLoading(false)
    navigate('/hotels')
    
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
        {/* Email */}
        <div className="input-field">
          <input
            type="email"
            id="email"
            { ...register("email") }
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        {/* Password */}
        <div className="input-field">
          <input 
            type="password" 
            id="password"
            {...register("password")} 
            required
          /> 
          <label htmlFor="password">Contraseña</label>
        </div>

        <button type="submit" disabled={loading}>Ingresar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  )
}

export default LoginForm