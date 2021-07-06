import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk } from '../App/AppSlice'

const Dashboard = () => {
  
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.user)

  const handleLogout = () => {
    dispatch(logoutUserThunk())
  }
  
  return (
    <div>
      <h1>Welcome {user.firstname} {user.lastname}</h1>
      <p>{user.jobtitle} - {user.organization}</p>
      <p>Phone: {user.phone}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard