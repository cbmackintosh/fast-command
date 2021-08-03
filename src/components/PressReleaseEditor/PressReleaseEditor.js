import React, { useState } from 'react'
import { postPressRelease } from '../../api-calls'

const PressReleaseEditor = (props) => {

  console.log(props)
  const [headline, setHeadline] = useState('')
  const [body, setBody] = useState('')

  const postNewPressRelease = e => {
    e.preventDefault()
    postPressRelease(props.incident_id, headline, body)
    .then(response => console.log(response))
  }

  return (
    <form onSubmit={e => postNewPressRelease(e)}>

      <label htmlFor='headline'>Headline</label>
      <input
        name='headline'
        onChange={e => setHeadline(e.target.value)}
        value={headline}
      >
      </input>

      <label htmlFor="post_body">Body:</label>
      <textarea
        name="post_body"
        onChange={e => setBody(e.target.value)}
        value={body}
      />

      <button type='submit'>SUBMIT</button>

    </form>
  ) 
}

export default PressReleaseEditor