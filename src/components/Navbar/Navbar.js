import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import './Navbar.css'

export const Navbar = () => {


  return (
    <div className='navbar'>
      <GiHamburgerMenu />
      <Link>Home</Link>
      <Link>Contacts</Link>
      <Link>New Incident</Link>
      <Link>Incident History</Link>
      <Link>Logout</Link>
    </div>
  )
}