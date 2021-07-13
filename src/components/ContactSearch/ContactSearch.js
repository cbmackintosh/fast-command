import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllContacts } from '../../api-calls'

const ContentSearch = () => {
  
  const userID = useSelector(state => state.user.user.id)
  const [query, setQuery] = useState('')
  const [allContacts, setAllContacts] = useState([])

  useEffect(() => {
    getAllContacts(userID)
    .then(response => setAllContacts(response.contacts))
  }, [userID])

  const compileSearchResults = (qry) => {
    return allContacts
      .filter(contact => contact.name.toLowerCase().includes(qry.toLowerCase()))
      .map(contact => {
        return (
          <div>
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
      {query.length && compileSearchResults(query)}
    </div>
  )
}

export default ContentSearch