import React from 'react'

const PressReleaseEditor = () => {

  return (
    <form>

      <label htmlFor='headline'>Headline</label>
      <input
        name='headline'
      >
      </input>

      <label htmlFor="post_body">Body:</label>
      <textarea
        name="post_body"
      />

      <button>SUBMIT</button>

    </form>
  ) 
}

export default PressReleaseEditor