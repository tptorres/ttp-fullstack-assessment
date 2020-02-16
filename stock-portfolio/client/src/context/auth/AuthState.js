import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import axios from 'axios';
import setToken from '../../utilities/setToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  AUTH_ERROR
} from '../types';

const AuthState = props => {
  const initialState = {
    isAuthenticated: null,
    loading: true,
    error: null,
    token: localStorage.getItem('token'),
    user: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Register a User
  const registerUser = async formInfo => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', formInfo, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      userLoaded();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // Login a User
  const loginUser = async formInfo => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formInfo, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      userLoaded();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT });
  };

  const userLoaded = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        loading: state.loading,
        error: state.error,
        registerUser,
        clearErrors,
        userLoaded,
        loginUser,
        logoutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
