import React, { useState, useContext } from 'react';
import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

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
      console.log('Submitted successfully');
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
