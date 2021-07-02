import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Input from 'react-phone-number-input/input'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      firstname: '',
      lastname: '',
      jobtitle: '',
      organization: '',
      phone: '',
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

  handlePhoneInput = (event) => {
    this.setState({ phone: event })
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    const {firstname, lastname, jobtitle, organization, phone, email, password, password_confirmation} = this.state
    console.log(this.state)
    let user = {
      firstname: firstname,
      lastname: lastname,
      jobtitle: jobtitle,
      organization: organization,
      phone: phone,
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
    const {firstname, lastname, jobtitle, organization, phone, email, password, password_confirmation} = this.state

    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="first name"
            type="text"
            name="firstname"
            value={firstname}
            onChange={this.handleChange}
          />
          <input
            placeholder="last name"
            type="text"
            name="lastname"
            value={lastname}
            onChange={this.handleChange}
          />
          <input
            placeholder="job title"
            type="text"
            name="jobtitle"
            value={jobtitle}
            onChange={this.handleChange}
          />
          <input
            placeholder="agency or organization"
            type="text"
            name="organization"
            value={organization}
            onChange={this.handleChange}
          />
          <Input
            country="US"
            name="phone"
            value={phone}
            onChange={this.handlePhoneInput}
            maxLength="14"
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