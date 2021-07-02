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
        <h1>Welcome {props.user.firstname} {props.user.lastname}</h1>
        <p>{props.user.jobtitle} - {props.user.organization}</p>
        <p>Phone: {props.user.phone}</p>
        <p>Email: {props.user.email}</p>
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