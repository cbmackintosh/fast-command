import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={Signup} />
    </Switch>
  );
}

export default App;