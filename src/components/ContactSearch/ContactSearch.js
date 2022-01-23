import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllContacts } from '../../api-calls'

const ContactSearch = () => {
  
  const userID = useSelector(state => state.user.user.id)
  const [query, setQuery] = useState('')
  const [allContacts, setAllContacts] = useState([])

  useEffect(() => {
    getAllContacts(userID)
    .then(response => setAllContacts(response.contacts))
  }, [userID])

  const compileSearchResults = (qry) => {
    return allContacts
      .filter(contact => {
        return contact.name.toLowerCase().includes(qry) ||
          contact.jobtitle.toLowerCase().includes(qry) ||
          contact.organization.toLowerCase().includes(qry)
          // contact.incident_role.toLowerCase().includes(qry) ||
          // contact.point_of_contact.toLowerCase().includes(qry)
      })
      .map(contact => {
        return (
          <div className='search-result' key={contact.name}>
            {contact.name}
          </div>
        )
      })
  }
  
  return (
    <div>
      <input 
        type='text' 
        placeholder='search'
        onChange={e => setQuery(e.target.value)} 
        value={query}
      />
      {query.length && compileSearchResults(query.toLowerCase())}
    </div>
  )
}

export default ContactSearch