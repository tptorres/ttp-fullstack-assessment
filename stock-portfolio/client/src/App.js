import React, {Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import Transactions from './components/pages/Transactions';
import axios from '../node_modules/axios';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/transactions' component={Transactions}></Route>
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
