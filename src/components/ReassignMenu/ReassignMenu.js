import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap';
import { getAllContacts, updateContactAssignment } from '../../api-calls'
import { returnContactAvatar } from '../../utils'

const ReassignMenu = (props) => {
  const [availableContacts, setAvailableContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const userID = useSelector(state => state.user.user.id)

  useEffect(() => {
    const refreshContacts = () => {
      getAllContacts(userID)
      .then(response => setAvailableContacts(response.contacts.filter(contact => contact.incident_id === null && contact.contact_type === 'Person')))
    }  
    refreshContacts()
  }, [userID])

  const compileAvailableContacts = (qry) => {
    return availableContacts.filter(contact => {
      return contact.name.toLowerCase().includes(qry)
    }).map(contact => {
      return (
        <div key={contact.id} onClick={() => setSelectedContact(contact)}>
          {returnContactAvatar(contact.contact_type)} {contact.name} - {contact.jobtitle} - {contact.organization}
        </div>
      )
    })
  }

  const reassignContact = () => {
    Promise.all([
      updateContactAssignment(selectedContact.id, props.role.id, props.incident_id, props.role.parent, props.role.title),
      updateContactAssignment(props.role.contact.id, null, null, null, null) 
    ])
    .then(response => {
      if (response[0].status === "updated" && response[1].status === "updated") {
        setSelectedContact(null)
        // refreshContacts()
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
            Replace {props.role.contact.name} as {props.role.title}
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
            Replace {props.role.title}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Replace {props.role.contact.name} with {selectedContact.name} as {props.role.title}? </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => reassignContact()}>CONFIRM</button>
          <button onClick={() => setSelectedContact(null)}>BACK</button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return <></>
  }
}

export default ReassignMenu