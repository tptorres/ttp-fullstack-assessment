import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
  return (
    <div className='navbar bg-primary'>
      <h1>{title}</h1>
      <ul>
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
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <i className='fas fa-grip-lines-vertical'></i>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
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
