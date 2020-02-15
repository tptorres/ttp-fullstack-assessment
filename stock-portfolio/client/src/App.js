import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Portfolio from './components/pages/Portfolio';
import TransactionsDisplay from './components/pages/TransactionsDisplay';

import TransactionState from './context/transactions/TransactionState';
import StockState from './context/stock/StockState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import setToken from './setToken';

if (localStorage.token) {
  setToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <StockState>
        <AlertState>
          <TransactionState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <Route exact path='/' component={Portfolio}></Route>
                    <Route exact path='/transactions' component={TransactionsDisplay}></Route>
                    <Route exact path='/register' component={Register}></Route>
                    <Route exact path='/login' component={Login}></Route>
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </TransactionState>
        </AlertState>
      </StockState>
    </AuthState>
  );
};

export default App;
