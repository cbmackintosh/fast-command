import React, { useState } from 'react'
import PressReleaseList from '../PressReleaseList/PressReleaseList'
import { postPressRelease } from '../../api-calls'

const PressReleaseEditor = (props) => {

  const [headline, setHeadline] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState([])

  const postNewPressRelease = e => {
    e.preventDefault()
    postPressRelease(props.incident_id, headline, body)
    .then(response => {
      if (response.status === 'created') {
        setHeadline('')
        setBody('')
        setErrors([])
      } else {
        setErrors(response.errors)
      }
    })
  }

  const compileErrors = () => {
    return errors.map(error => {
      return <p>{error}</p>
    })
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

        {errors && compileErrors()}

      </form>

      <PressReleaseList incident_id={props.incident_id} />
    </div>
  ) 
}

export default PressReleaseEditor