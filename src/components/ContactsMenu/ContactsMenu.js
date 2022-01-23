import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import NewContactForm from '../NewContactForm/NewContactForm'
import ContactSearch from '../ContactSearch/ContactSearch'
import './ContactsMenu.css'

const ContactsMenu = () => {
  return (
    <div className='contacts-menu'>
      <Navbar />
      <div>
        <NewContactForm />
        <ContactSearch />
      </div>
    </div>
  )
}

export default ContactsMenu