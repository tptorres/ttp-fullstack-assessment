import React, { useState, useContext, useEffect } from 'react';
import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { set } from 'mongoose';

const Register = props => {
  // Alerts
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // Authentication
  const authContext = useContext(AuthContext);
  const { clearErrors, registerUser, error, isAuthenticated } = authContext;

  useEffect(() => {
    // Redirecting after a successful registration
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'A user with that email already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { name, email, password, confirmPassword } = user;

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();

    // Validating Registration input
    if (email === '' || password === '' || name === '') {
      setAlert('All fields not completed', 'danger');
    } else if (password !== confirmPassword) {
      setAlert('Make sure passwords match', 'danger');
    } else {
      registerUser({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className='register-login-form'>
      <h1 className='text-center'>Register</h1>
      <form onSubmit={onSubmit}>
        <div className='input-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='input-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={onChange} />
        </div>
        <div className='input-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type='password' name='confirmPassword' value={confirmPassword} onChange={onChange} />
        </div>
        <input type='submit' value='Register' className='btn stock-btn' />
      </form>
    </div>
  );
};

export default Register;
