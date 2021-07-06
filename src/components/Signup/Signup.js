import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signupUserThunk } from '../App/AppSlice'
import Input from 'react-phone-number-input/input'

const Signup = () => {
  
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [jobtitle, setJobtitle] = useState('')
  const [organization, setOrganization] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')

  const dispatch = useDispatch()
  const errors = useSelector(state => state.user.errors)

  const handleSignup = e => {
    e.preventDefault()
    let user = {
      firstname: firstname,
      lastname: lastname,
      jobtitle: jobtitle,
      organization: organization,
      phone: phone,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
    dispatch(signupUserThunk(user))
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
    <form onSubmit={handleSignup}>
      <h1>Signup</h1>

      <label htmlFor='firstname'>First Name</label>
      <input
        type='text'
        name='firstname'
        onChange={e => setFirstname(e.target.value)}
        value={firstname}
      />

      <label htmlFor='firstname'>Last Name</label>
      <input
        type='text'
        name='lastname'
        onChange={e => setLastname(e.target.value)}
        value={lastname}
      />

      <label htmlFor='jobtitle'>Job Title</label>
      <input
        type='text'
        name='jobtitle'
        onChange={e => setJobtitle(e.target.value)}
        value={jobtitle}
      />

      <label htmlFor='organization'>Organization</label>
      <input
        type='text'
        name='organization'
        onChange={e => setOrganization(e.target.value)}
        value={organization}
      />

      <label htmlFor="phone">Phone</label>
      <Input
        country='US'
        name='phone'
        onChange={e => setPhone(e.target.value)}
        value={phone}
        maxLength="14"
      />

      <label htmlFor='email'>Email</label>
      <input
        type='text'
        name='email'
        onChange={e => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor='password_confirmation'>Password</label>
      <input
        type='password'
        name='password_confirmation'
        onChange={e => setPassword_confirmation(e.target.value)}
        value={password_confirmation}
      />

      <label htmlFor='password'>Password</label>
      <input
        type='password'
        name='password'
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      <button type="submit">SUBMIT</button>

      <Link to='/'>Login</Link>

      {errors.length && handleErrors()}

    </form>
  )

}

export default Signup