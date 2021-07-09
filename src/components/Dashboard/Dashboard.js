import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk } from '../App/AppSlice'
import { Navbar } from '../Navbar/Navbar'
import './Dashboard.css'

const Dashboard = () => {
  
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.user)

  const handleLogout = () => {
    dispatch(logoutUserThunk())
  }
  
  return (
    <div className='dashboard'>
      <Navbar logout={handleLogout} />
      <div className='profile-info'>
        <h1>{user.firstname} {user.lastname}</h1>
        <p>{user.jobtitle} - {user.organization}</p>
        <p>Phone: {user.phone}</p>
        <p>Email: {user.email}</p>
      </div> 
    </div>
  )
}

export default Dashboard