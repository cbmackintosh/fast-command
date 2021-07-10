import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginStatusThunk } from '../App/AppSlice'
import Login from '../Login/Login'

const PrivateRoute = (props) => {

  const loginStatus = useSelector(state => state.user.isLoggedIn)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loginStatusThunk())
  }, [dispatch])

  if (loginStatus) {
    return (
      <Route exact path={props.path} component={props.component} />
    )
  } else {
    return (
      <Login />
    )
  }
  
}

export default PrivateRoute