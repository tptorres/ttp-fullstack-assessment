import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = ({title}) => {
  return (
    <div className='navbar'>
      <h1>{title}</h1>
      <ul>
        <li>
          <Link to='/'></Link>Portfolio
        </li>
        <li>
          <Link to='/transactions'></Link>
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
