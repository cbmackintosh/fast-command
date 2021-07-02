import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      fullname: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
  }
  
  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
  
  handleSubmit = (event) => {
    event.preventDefault()
    const {fullname, email, password, password_confirmation} = this.state
    console.log(this.state)
    let user = {
      fullname: fullname,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    axios.post('http://localhost:3005/users', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul> 
      </div>
    )
  }
  render() {
    const {fullname, email, password, password_confirmation} = this.state

    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="what's your name?"
            type="text"
            name="fullname"
            value={fullname}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input 
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
        
          <button placeholder="submit" type="submit">
            Sign Up
          </button>
          <div>
            or <Link to='/'>login</Link>
          </div>
      
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }

}
export default Signup;