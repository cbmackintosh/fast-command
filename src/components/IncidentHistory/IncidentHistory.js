import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar } from '../Navbar/Navbar'
import { getUserIncidentsThunk } from '../Dashboard/DashboardSlice'
import IncidentsList from '../IncidentsList/IncidentsList'
import './IncidentHistory.css'

const IncidentHistory = () => {
  
  const incidents = useSelector(state => state.incidents.incidents)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!incidents.length) {
      dispatch(getUserIncidentsThunk(user.id))
    }
  }, [dispatch, user.id, incidents.length])
  
  return (
    <div className='incident-history'>
      <Navbar />
      <div>
        <h2>Ongoing Incidents</h2>
        <IncidentsList areResolved={false} />
        <h2>Resolved Incidents</h2>
        <IncidentsList areResolved={true} />
      </div>  
    </div>
  )
}

export default IncidentHistory