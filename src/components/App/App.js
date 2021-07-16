import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import IncidentRoute from '../PrivateRoute/IncidentRoute'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import ContactsMenu from '../ContactsMenu/ContactsMenu'
import NewIncidentForm from '../NewIncidenForm/NewIncidentForm'
import IncidentHistory from '../IncidentHistory/IncidentHistory'

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
      <PrivateRoute
        exact path='/contacts'
        component={ContactsMenu}
      />
      <PrivateRoute
        exact path='/new-incident'
        component={NewIncidentForm}
      />
      <PrivateRoute
        exact path='/incident-history'
        component={IncidentHistory}
      />
      <IncidentRoute
        path='/:slug'
      />
    </Switch>
  );
}

export default App;