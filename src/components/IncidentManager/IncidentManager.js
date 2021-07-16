import React, { useEffect, useState } from 'react'
import { getIncidentBySlug } from '../../api-calls'

const IncidentManager = ({ slug }) => {
  
  const [incident, setIncident] = useState({})

  useEffect(() => {
    getIncidentBySlug(slug)
    .then(response => setIncident(response.incident))
  }, [slug])
  
  return (
    <div>
      This is the incident manager for:
      {incident.name}
      {incident.incident_type}
      {incident.location}
      {incident.summary}
      <textarea />
    </div>
  )
}

export default IncidentManager