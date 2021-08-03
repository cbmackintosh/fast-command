import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getIncidentBySlug } from '../../api-calls'
import ChartEditor from '../ChartEditor/ChartEditor'
import PressReleaseEditor from '../PressReleaseEditor/PressReleaseEditor'

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
      <h1>{incident.name}</h1>
      <h4>{incident.incident_type} | {incident.location} | ACTIVE SINCE: {incident.created_at}</h4>
      <p>{incident.summary}</p>
      <Link to='/dashboard'><button>BACK</button></Link>
      <button onClick={toggleView}>{view === 'chart' ? 'Press Release Editor' : 'Chart Editor'}</button>
      {incident.id && view === 'chart' ? <ChartEditor incident_id={incident.id} /> : null}
      {incident.id && view === 'posts' ? <PressReleaseEditor incident_id={incident.id} /> : null}
    </div>
  )
}

export default IncidentManager