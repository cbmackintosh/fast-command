import React, { useEffect, useState } from 'react'
import { getPressReleases } from '../../api-calls'

const PressReleaseList = (props) => {

  const [pressReleases, setPressReleases] = useState([])

  useEffect(() => {
    getPressReleases(props.incident_id)
    .then(response => setPressReleases(response.posts.reverse()))
  }, [props.incident_id])

  const compileList = () => {
    return pressReleases.map(pressRelease => {
      return (
        <div key={pressRelease.id}>
          <h3>{pressRelease.title}</h3>
          <p>{pressRelease.updated_at}</p>
          <p>{pressRelease.body}</p>
        </div>
      )
    })
  }

  return (
    <div>
      Press Releases
      {compileList()}
    </div>
  )

}

export default PressReleaseList