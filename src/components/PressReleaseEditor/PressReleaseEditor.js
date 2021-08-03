import React, { useState } from 'react'
import PressReleaseList from '../PressReleaseList/PressReleaseList'
import { postPressRelease } from '../../api-calls'

const PressReleaseEditor = (props) => {

  const [headline, setHeadline] = useState('')
  const [body, setBody] = useState('')

  const postNewPressRelease = e => {
    e.preventDefault()
    postPressRelease(props.incident_id, headline, body)
    .then(response => console.log(response))
  }

  return (
    <div>
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

      <PressReleaseList incident_id={props.incident_id} />
    </div>
  ) 
}

export default PressReleaseEditor