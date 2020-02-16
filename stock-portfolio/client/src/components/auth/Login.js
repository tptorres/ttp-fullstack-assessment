import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  // Alerts
  const alertContext = useContext(AlertContext);
  const { setAlert, removeAlerts } = alertContext;

  // Authentication
  const authContext = useContext(AuthContext);
  const { clearErrors, loginUser, error, isAuthenticated } = authContext;

  useEffect(() => {
    // Redirecting after a successful registration
    if (isAuthenticated) {
      removeAlerts();
      props.history.push('/');
    }

    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();

    if (email === '' || password === '') {
      setAlert('All fields not filled', 'danger');
    } else {
      loginUser({
        email,
        password
      });
    }
  };

  return (
    <div className='register-login-form'>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='input-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={onChange} />
        </div>
        <input type='submit' value='Login' className='btn stock-btn' />
      </form>
    </div>
  );
};

export default Login;
