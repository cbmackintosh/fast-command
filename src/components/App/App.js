import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route 
        exact path='/' 
        render={() => (
          <Home />
        )} 
      />
      <Route 
        exact path='/signup'
        render={props => (
          <Signup {...props} />
        )} 
      />
    </Switch>
  );
}

export default App;