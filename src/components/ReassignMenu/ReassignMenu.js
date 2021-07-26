import React from 'react'
import { Modal } from 'react-bootstrap';

const ReassignMenu = (props) => {
  
  console.log(props)
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Replace {props.role.contact.name} as {props.role.title}
          </Modal.Title>
        </Modal.Header>
    </Modal>
  )
}

export default ReassignMenu