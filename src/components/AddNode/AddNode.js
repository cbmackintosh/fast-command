import React from 'react'
import { Modal } from 'react-bootstrap';

const AddNode = (props) => {

  console.log(props)

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Add Node menu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>

          <select>
            <option>Branch</option>
            <option>Division</option>
            <option>Group</option>
            <option>Unit</option>
            <option>Strike Team</option>
            <option>Task Force</option>
            <option>Single Resource</option>
            <option>Other</option>
          </select>

          <input placeholder="resource name"></input>

        </form>
          

        </Modal.Body>
    </Modal>
  )

}

export default AddNode