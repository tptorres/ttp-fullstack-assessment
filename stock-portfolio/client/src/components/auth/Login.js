import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
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
