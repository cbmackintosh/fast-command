import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import NewContactForm from '../NewContactForm/NewContactForm'
import './ContactsMenu.css'

const ContactsMenu = () => {
  return (
    <div className='contacts-menu'>
      <Navbar />
      <NewContactForm />
    </div>
  )
}

export default ContactsMenu