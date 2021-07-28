import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getIncidentBySlug } from '../../api-calls'
import ChartEditor from '../ChartEditor/ChartEditor'

const IncidentManager = ({ slug }) => {
  
  const [incident, setIncident] = useState({})

  useEffect(() => {
    getIncidentBySlug(slug)
    .then(response => setIncident(response.incident))
  }, [slug])
  
  return (
    <div>
      <h1>{incident.name}</h1>
      <h4>{incident.incident_type} | {incident.location} | ACTIVE SINCE: {incident.created_at}</h4>
      <p>{incident.summary}</p>
      <Link to='/dashboard'><button>BACK</button></Link>
      <button>RESOLVE</button>
      {incident.id && <ChartEditor incident_id={incident.id} />}
    </div>
  )
}

export default IncidentManager