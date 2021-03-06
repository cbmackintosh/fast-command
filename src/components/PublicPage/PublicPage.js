import React, { useEffect, useState } from 'react'
import { getIncidentBySlug } from '../../api-calls'
import PublicChart from '../PublicChart/PublicChart'
import PressReleaseList from '../PressReleaseList/PressReleaseList'
import { Link } from 'react-router-dom'

const IncidentManager = ({ slug }) => {
  
  const [incident, setIncident] = useState({})
  const [view, setView] = useState('chart')

  useEffect(() => {
    getIncidentBySlug(slug)
    .then(response => setIncident(response.incident))
  }, [slug])

  const toggleView = () => {
    if (view === 'chart') {
      setView('posts')
    } else {
      setView('chart')
    }
  }
  
  return (
    <div>
      <Link to='/'><button>LOGIN</button></Link>
      <h1>{incident.name}</h1>
      <h4>{incident.incident_type} | {incident.location} | ACTIVE SINCE: {incident.created_at}</h4>
      <p>{incident.summary}</p>
      <button onClick={toggleView}>{view === 'chart' ? 'Press Releases' : 'Incident Command Chart'}</button>
      {incident.id && view === 'chart' ? <PublicChart incident_id={incident.id} /> : null}
      {incident.id && view === 'posts' ? <PressReleaseList incident_id={incident.id} /> : null}
    </div>
  )
}

export default IncidentManager