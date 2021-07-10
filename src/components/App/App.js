import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'

import './App.css';

const App = () => {
  
  return (
    <Switch>
      <Route 
        exact path='/' 
        render={props => (
          <Login {...props} />
        )} 
      />
      <Route 
        exact path='/signup'
        render={props => (
          <Signup {...props} />
        )} 
      />
      <PrivateRoute
        exact path='/dashboard'
        component={Dashboard}
      />
    </Switch>
  );
}

export default App;