import React from 'react'
import { Modal } from 'react-bootstrap';
import { updateContactAssignment } from '../../api-calls'
import 'bootstrap/dist/css/bootstrap.min.css';

const UnassignMenu = (props) => {
  
  const unassignContact = () => {

    updateContactAssignment(props.role.contact.id, null, null, null, null)
    .then(response => {
      if (response.status === 'updated') {
        props.onHide()
      }
    })
  }

  if (props.role) {
    return(
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <p>Unassign {props.role.contact.name} as {props.role.title}?</p>
          <button onClick={unassignContact}>CONFIRM</button>
        </Modal.Body>
      </Modal>
    )
  } else {
    return <></>
  }
}

export default UnassignMenu