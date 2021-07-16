import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from '../Navbar/Navbar'
import { createNewIncident } from '../../api-calls'

const NewIncidentForm = () => {

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [summary, setSummary] = useState('')
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)

  const userID = useSelector(state => state.user.user.id)

  const handleSubmit = e => {
    e.preventDefault()
    const incident = {
      user_id: userID,
      name: name,
      type: type,
      location: location,
      summary: summary
    }
    createNewIncident(incident)
    .then(response => {
      if (response.status === 'created') {
        clearInputs()
        setSuccess(true)
        setErrors([])
        setTimeout(() => {
          setSuccess(false)
        }, 2500)
      } else {
        setErrors(response.errors)
      }
    })
  }

  const clearInputs = () => {
    setName('')
    setType('')
    setLocation('')
    setSummary('')
  }

  const handleErrors = () => {
    return (
      <div>
        <ul>{errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul> 
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>

        DECLARE NEW INCIDENT:

        <label htmlFor="name">Incident name:</label>
        <input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          value={name}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          onChange={e => setLocation(e.target.value)}
          value={location}
        />

        <label htmlFor="type">Incident type:</label>
        <input
          type="text"
          name="type"
          onChange={e => setType(e.target.value)}
          value={type}
        />

        <label htmlFor="summary">Summary:</label>
        <textarea
          name="summary"
          onChange={e => setSummary(e.target.value)}
          value={summary}
        />

        <button type="submit">DECLARE INCIDENT</button>

        {success && <p>INCIDENT DECLARED SUCCESSFULLY</p>}
        {errors.length && handleErrors()}

      </form>
    </div>
  )

}

export default NewIncidentForm