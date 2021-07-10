import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../App/AppSlice'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import './Navbar.css'

export const Navbar = (props) => {

  const [screenWidth, setScreenWidth] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(true)

  useEffect(() => {
    setScreenWidth(visualViewport.width)
    window.addEventListener("resize", () => {
      setScreenWidth(visualViewport.width)
    })
  }, [])

  const toggleNavbar = () => {
    isCollapsed === true ? setIsCollapsed(false) : setIsCollapsed(true)
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUserThunk())
  }

  if (screenWidth > 600) {
    return (
      <div className='navbar'>
        <Link to='/dashboard'>Home</Link>
        <Link to='/contacts'>Contacts</Link>
        <Link>New Incident</Link>
        <Link>Incident History</Link>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    )
  } else if (isCollapsed === true) {
    return (
      <div className='collapse-nav'>
        <GiHamburgerMenu onClick={toggleNavbar} />
      </div>
    )
  } else {
    return (
      <div className='navbar'>
        <GiHamburgerMenu onClick={toggleNavbar} />
        <Link to='/dashboard'>Home</Link>
        <Link to='/contacts'>Contacts</Link>
        <Link>New Incident</Link>
        <Link>Incident History</Link>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    )
  }
}