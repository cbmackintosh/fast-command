import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from '../Navbar/Navbar'
import IncidentsList from '../IncidentsList/IncidentsList'
import './Dashboard.css'

const Dashboard = () => {

  const user = useSelector(state => state.user.user)
  
  return (
    <div className='dashboard'>
      <Navbar />
      <div className='profile-container'>
        <div className='profile-info'>
          <h1>{user.firstname} {user.lastname}</h1>
          <p>{user.jobtitle} - {user.organization}</p>
          <p>Phone: {user.phone}</p>
          <p>Email: {user.email}</p>
        </div>
        <IncidentsList areResolved={false} /> 
      </div>
    </div>
  )
}

export default Dashboard