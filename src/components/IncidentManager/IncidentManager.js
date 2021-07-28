import React, { useEffect, useState } from 'react'
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
      {incident.id && <ChartEditor incident_id={incident.id} />}
    </div>
  )
}

export default IncidentManager