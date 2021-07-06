import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUserThunk } from '../App/AppSlice'

const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const errors = useSelector(state => state.user.errors)
  
  const handleLogin = e => {
    e.preventDefault()
    let user = {
      email: email,
      password: password
    }
    dispatch(loginUserThunk(user))
  }

  const handleErrors = () => {
    return (
      <div>
        <ul>{errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul> 
      </div>
    )
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <label htmlFor="email">email</label>
      <input 
        type='text' 
        name='email' 
        onChange={e => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="password">password</label>
      <input 
        type='password' 
        name='password'
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      <button type="submit">LOGIN</button>

      <Link to='/signup'>Signup</Link>

      {errors.length && handleErrors()}

    </form>
  )
}

export default Login