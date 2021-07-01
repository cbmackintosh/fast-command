import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Home from '../Home/Home' 

const Dashboard = (props) => {
  
  const handleClick = () => {
    axios.delete('http://localhost:3005/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  if (props.loggedInStatus) {
    return (
      <div>
        <h1>Welcome {props.user.fullname}</h1>
        <Link to='/logout' onClick={handleClick}>Log Out</Link>
      </div>     
    )
  } else {
    return (
      <Home {...props} handleLogin={props.handleLogin} loggedInStatus={false}/>
    )
  }

};

export default Dashboard;