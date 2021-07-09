import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import './Navbar.css'

export const Navbar = () => {

  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(visualViewport.width)
    window.addEventListener("resize", () => {
      setScreenWidth(visualViewport.width)
    })
  }, [])

  return (
    <div className='navbar'>
      {screenWidth < 600 && <GiHamburgerMenu />}
      <Link>Home</Link>
      <Link>Contacts</Link>
      <Link>New Incident</Link>
      <Link>Incident History</Link>
      <Link>Logout</Link>
    </div>
  )
}