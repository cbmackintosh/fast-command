import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { loginStatusThunk } from '../App/AppSlice'
import PublicPage from '../PublicPage/PublicPage'
import IncidentManager from '../IncidentManager/IncidentManager'

const IncidentRoute = (props) => {

  const loginStatus = useSelector(state => state.user.isLoggedIn)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loginStatusThunk())
  }, [dispatch])

  if (loginStatus) {
    return (
      <Route 
        exact path={props.path} 
        render={({match}) => (
          <IncidentManager slug={match.params.slug} />
        )} 
      />
    )
  } else {
    return (
      <PublicPage slug={props.computedMatch.params.slug} />
    )
  }
  
}

export default IncidentRoute