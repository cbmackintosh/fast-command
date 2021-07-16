import React from 'react'

const IncidentsList = (areResolved) => {

  if (!areResolved) {
    return (
      <div>
        Showing ongoing incidents
      </div>
    )
  } else {
    return (
      <div>
        Showing resolved incidents
      </div>
    )
  }

}

export default IncidentsList