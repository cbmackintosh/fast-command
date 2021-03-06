import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const IncidentsList = ({ areResolved }) => {

  const incidents = 
    useSelector(state => state.incidents.incidents)
    .filter(incident => areResolved ? incident.resolved_at : !incident.resolved_at)


  const compileIncidentList = () => {
    return incidents.map(incident => {
      return (
        <Link to={`/${incident.slug}`} key={incident.id}>
          <h2>{incident.name}</h2>
          <p>{incident.incident_type}</p>
          <p>{incident.location}</p>
          <p>DECLARED: {incident.created_at}</p>
          {incident.resolved_at && <p>RESOLVED: {incident.resolved_at}</p>}
        </Link>
      )
    })
  }

  return (
    <div>
      Your {areResolved ? 'resolved' : 'ongoing'} incidents:
      {compileIncidentList()}
    </div>
  )

}

export default IncidentsList