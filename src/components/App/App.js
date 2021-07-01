import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('http://localhost:3005/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user || data.data.user
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>

            <Route 
              exact path='/' 
              render={props => (
              <Home {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
              )}
            />

            <Route 
              exact path='/dashboard' 
              render={props => (
              <Dashboard {...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} user={this.state.user} />
              )}
            />

            <Route 
              exact path='/signup' 
              render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
              )}
            />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;