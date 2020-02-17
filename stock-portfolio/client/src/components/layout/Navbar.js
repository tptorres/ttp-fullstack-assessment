import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import StockContext from '../../context/stock/stockContext';

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);
  const { logoutUser, user, isAuthenticated } = authContext;

  const stockContext = useContext(StockContext);
  const { clearStocks } = stockContext;

  const onLogout = () => {
    logoutUser();
    clearStocks();
  };

  const userLinks = (
    <Fragment>
      <li>
        <Link to='/'>Portfolio</Link>
      </li>
      <li>
        <i className='fas fa-grip-lines-vertical'></i>
      </li>
      <li>
        <Link to='/transactions'>Transactions</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>
          <i className='fas fa-sign-in-alt' />
          <span>Login</span>
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <i className='fas fa-user-plus' />
          <span>Register</span>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        {user && user.name.split(' ')[0]}'s {title}
      </h1>
      <ul>{isAuthenticated ? userLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: 'Stock Portfolio'
};

export default Navbar;
