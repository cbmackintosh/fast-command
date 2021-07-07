
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import { loginStatusThunk } from '../App/AppSlice'

const Home = () => {
  
  const loginStatus = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loginStatusThunk())
  }, [dispatch])

  if (loginStatus.isLoggedIn) {
    return (
      <Dashboard />
    )
  } else {
    return (
      <Login />
    )
  }

}

export default Home