import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllContacts, assignContactToIncident } from '../../api-calls'
import { BiUserCircle } from 'react-icons/bi'

const AssignRoleMenu = (props) => {
  console.log(props)
  const [availableContacts, setAvailableContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const userID = useSelector(state => state.user.user.id)

  useEffect(() => {
    getAllContacts(userID)
    .then(response => setAvailableContacts(response.contacts.filter(contact => contact.incident_id === null && contact.contact_type === 'Person')))
  }, [userID])

  const compileAvailableContacts = (qry) => {
    return availableContacts.filter(contact => {
      return contact.name.toLowerCase().includes(qry)
    })
    .map(contact => {
      return (
        <div onClick={() => setSelectedContact(contact)}>
          <BiUserCircle /> {contact.name} - {contact.jobtitle} - {contact.organization}
        </div>
      )
    })
  }

  const assignContactToRole = () => {
    assignContactToIncident(selectedContact.id, props.role.id, props.incidentID)
    .then(response => {
      if (response.status === "updated") {
        props.onHide()
      }
    })
  }

  if (props.show && !selectedContact) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Assign your {props.role.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input type="text" placeholder="search" onChange={e => setSearchQuery(e.target.value)} />
          </form>
          {compileAvailableContacts(searchQuery.toLowerCase())}
        </Modal.Body>
      </Modal>
    )
  } else if (props.show && selectedContact) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Assign your {props.role.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Assign {selectedContact.name} as {props.role.title}? </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={assignContactToRole}>CONFIRM</button>
          <button onClick={() => setSelectedContact(null)}>BACK</button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return <></>
  }
}

export default AssignRoleMenu