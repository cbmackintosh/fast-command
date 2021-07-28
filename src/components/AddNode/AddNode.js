import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap';
import { getAllContacts, updateContactAssignment } from '../../api-calls';
import { returnContactAvatar } from '../../utils';

const AddNode = (props) => {
  const [availableContacts, setAvailableContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [nodeName, setNodeName] = useState('')
  const [nodeType, setNodeType] = useState('')
  const [confirmationVisibility, setConfirmationVisibility] = useState(false)
  const [errors, setErrors] = useState([])
  const userID = useSelector(state => state.user.user.id)

  useEffect(() => {
    const refreshContacts = () => {
      getAllContacts(userID)
      .then(response => setAvailableContacts(response.contacts.filter(contact => contact.incident_id === null)))
    }
    refreshContacts()
  }, [userID])

  const compileAvailableContacts = (qry) => {
    return availableContacts.filter(contact => {
      return contact.name.toLowerCase().includes(qry)
    }).map(contact => {
      return (
        <div key={contact.id} onClick={() => setSelectedContact(contact)}>
          {returnContactAvatar(contact.contact_type)} {contact.name} - {contact.jobtitle === 'n/a' ? null : `${contact.jobtitle} -`} {contact.organization}
        </div>
      )
    })
  }

  const assignContactToRole = () => {
    let incidentTitle;
    if (!nodeType) {
      incidentTitle = nodeName
    } else {
      incidentTitle = `${nodeName} (${nodeType})`
    }
    updateContactAssignment(selectedContact.id, Date.now(), props.incident_id, props.parent.id, incidentTitle)
    .then (response => {
      if (response.status === 'updated') {
        setConfirmationVisibility(false)
        setSelectedContact(null)
        props.onHide()
      }
    })
  }

  const validateForm = e => {
    e.preventDefault()
    if (!selectedContact || !nodeName) {
      let errorArray = []
      if (!selectedContact) errorArray.push('Please select a contact to assign to this node')
      if (!nodeName) errorArray.push('Please enter a name for this node')
      setErrors(errorArray)
    } else {
      setConfirmationVisibility(true)
    }
  }

  if (confirmationVisibility) {
    return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Body>
        <div>Assign {selectedContact.name} - {selectedContact.organization} as {nodeName} {nodeType} under {props.parent.title} {props.parent.contact.name} ?</div>
        <button onClick={assignContactToRole}>CONFIRM</button>
      </Modal.Body>
    </Modal>
    )
  } else {
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
  
            <select
              onChange={e => setNodeType(e.target.value)}
              value={nodeType}
            >
              <option>Branch</option>
              <option>Division</option>
              <option>Group</option>
              <option>Unit</option>
              <option>Strike Team</option>
              <option>Task Force</option>
              <option>Single Resource</option>
              <option value=''>Other</option>
            </select>
  
            <input 
              type='text'
              placeholder="resource name"
              onChange={e => setNodeName(e.target.value)}
              value={nodeName}
            />
  
            {selectedContact && <div>{selectedContact.name} - {selectedContact.organization}</div>}
  
            <button onClick={e => validateForm(e)}>
              SUBMIT
            </button>

            {errors && errors.map(error => {
              return <p key={error}>{error}</p>
            })}
  
            <hr></hr>
  
            <input
              type='text'
              placeholder='search'
              onChange={e => setSearchQuery(e.target.value)}
            />
  
            {compileAvailableContacts(searchQuery.toLowerCase())}
  
          </form>
            
  
          </Modal.Body>
      </Modal>
    )
  }

}

export default AddNode