import React, { useState } from 'react'
import Input from 'react-phone-number-input/input'
import { useSelector } from 'react-redux'
import { createNewContact } from '../../api-calls' 
import { AiOutlineUser, AiOutlineTeam } from 'react-icons/ai'
import { FiTruck } from 'react-icons/fi'
import { GiHelicopter, GiCrane, GiSittingDog } from 'react-icons/gi'
import { IoMdBoat } from 'react-icons/io'
import './NewContactForm.css'

const NewContactForm = () => {
  
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [jobtitle, setJobtitle] = useState('')
  const [organization, setOrganization] = useState('')
  const [pointOfContact, setPointOfContact] = useState('')
  const [pointOfContactTitle, setPointOfContactTitle] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)
  const userID = useSelector(state => state.user.user.id)
  
  const handleSubmit = e => {
    e.preventDefault()
    const contact = {
      user_id: userID,
      contact_type: type,
      name: name,
      jobtitle: jobtitle,
      organization: organization,
      point_of_contact: pointOfContact,
      point_of_contact_title: pointOfContactTitle,
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
    setPointOfContact('')
    setPointOfContactTitle('')
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

  const selectType = (e) => {
    setType(e.target.value)
    if (e.target.value === 'Person') {
      setPointOfContact('n/a')
      setPointOfContactTitle('n/a')
      setJobtitle('')
    } else {
      setPointOfContact('')
      setPointOfContactTitle('')
      setJobtitle('n/a')
    }
  }

  return (
    <form className='new-contact-form' onSubmit={handleSubmit}>

      Create new contact:

      <label htmlFor="type">Contact Type:</label>
      <select
        name="type"
        onChange={e => selectType(e)}
        value={type}
      >
        <option value=''>--select--</option>
        <option>Person</option>
        <option>Team</option>
        <option>Vehicle</option>
        <option>Aircraft</option>
        <option>Watercraft</option>
        <option>Machinery</option>
        <option>Animal</option>
      </select>

      <label htmlFor="name">{type === 'Person' ? 'Name:' : 'Asset Name:'}</label>
      <input
        type='text'
        name='name'
        onChange={e => setName(e.target.value)}
        value={name}
      />

      {type === 'Person' && <label htmlFor='jobtitle'>Job Title</label>}
      {type === 'Person' && <input
        type='text'
        name='name'
        onChange={e => setJobtitle(e.target.value)}
        value={jobtitle}
      />}

      <label htmlFor='organization'>Organization</label>
      <input
        type='text'
        name='organization'
        onChange={e => setOrganization(e.target.value)}
        value={organization}
      />

      {type !== 'Person' && <label htmlFor="poc">Point of contact:</label>}
      {type !== 'Person' && <input
        type='text'
        name='poc'
        onChange={e => setPointOfContact(e.target.value)}
        value={pointOfContact}
      />}

      {type !== 'Person' && <label htmlFor="poc-title">Point of contact title:</label>}
      {type !== 'Person' && <input
        type='text'
        name='poc-title'
        onChange={e => setPointOfContactTitle(e.target.value)}
        value={pointOfContactTitle}
      />}

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