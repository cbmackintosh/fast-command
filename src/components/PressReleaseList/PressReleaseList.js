import React, { useEffect } from 'react'
import { getPressReleases } from '../../api-calls'

const PressReleaseList = (props) => {

  useEffect(() => {
    getPressReleases(props.incident_id)
    .then(response => console.log(response))
  })

  return (
    <div>
      Press Releases
    </div>
  )

}

export default PressReleaseList