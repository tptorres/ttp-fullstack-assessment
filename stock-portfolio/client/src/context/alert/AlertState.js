import React, { useReducer } from 'react';
import AlertReducer from './alertReducer';
import AlertContext from './alertContext';
import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from '../types';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (message, type, timeoutLength = 500000) => {
    // creates a random id
    const id = uuid.v4();

    dispatch({
      type: SET_ALERT,
      payload: { message, type, id }
    });

    // have the alert disappear after a certain amount of time
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeoutLength);
  };

  const removeAlerts = () => dispatch({ type: REMOVE_ALL_ALERTS });
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        removeAlerts
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
