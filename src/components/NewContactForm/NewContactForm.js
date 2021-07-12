import React, { useState } from 'react'
import Input from 'react-phone-number-input/input'
import { useSelector } from 'react-redux'
import { createNewContact } from '../../api-calls'

const NewContactForm = () => {
  
  const [name, setName] = useState('')
  const [jobtitle, setJobtitle] = useState('')
  const [organization, setOrganization] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)
  const userID = useSelector(state => state.user.user.id)
  
  const handleSubmit = e => {
    e.preventDefault()
    const contact = {
      user_id: userID,
      name: name,
      jobtitle: jobtitle,
      organization: organization,
      phone: phone,
      email: email,
    }
    createNewContact(contact)
    .then(response => {
      if (response.status === 'created') {
        clearInputs()
        setSuccess(true)
        setErrors([])
        setTimeout(() => {
          setSuccess(false)
        }, 2500)
      } else {
        setErrors(response.errors)
      }
    })
  }

  const clearInputs = () => {
    setName('')
    setJobtitle('')
    setOrganization('')
    setPhone('')
    setEmail('')
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
    <form onSubmit={handleSubmit}>

      Create new contact:

      <label htmlFor="name">Name:</label>
      <input
        type='text'
        name='name'
        onChange={e => setName(e.target.value)}
        value={name}
      />

      <label htmlFor='jobtitle'>Job Title</label>
      <input
        type='text'
        name='name'
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
        onChange={e => setPhone(e)}
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

      <button type="submit">SUBMIT</button>

      {success && <p>New contact created!</p>}
      {errors.length && handleErrors()}

    </form>
  )
}

export default NewContactForm