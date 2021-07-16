import React, { useEffect, useState } from 'react'
import { getIncidentBySlug } from '../../api-calls'

const PublicPage = ({ slug }) => {
  
  const [incident, setIncident] = useState({})

  useEffect(() => {
    getIncidentBySlug(slug)
    .then(response => setIncident(response.incident))
  }, [slug])
  

  console.log(incident)
  return (
    <div>
      This is a public incident page for {incident.name}
      {incident.incident_type}
      {incident.location}
      {incident.summary}
    </div>
  )
}

export default PublicPage