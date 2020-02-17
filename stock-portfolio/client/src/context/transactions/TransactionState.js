import React, { useReducer } from 'react';
import TransactionReducer from './transactionReducer';
import TransactionContext from './transactionContext';
import { DISPLAY_TRANSACTIONS } from '../types';
import axios from 'axios';

// display list of trades
const TransactionState = props => {
  const initialState = {
    transactions: []
  };

  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  const displayTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions');

      dispatch({
        type: DISPLAY_TRANSACTIONS,
        payload: res.data
      });
    } catch (err) {
      console.log('Display Failed');
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        displayTransactions
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
