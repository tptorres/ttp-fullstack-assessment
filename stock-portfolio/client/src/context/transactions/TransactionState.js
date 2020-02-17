import React, { useReducer } from 'react';
import TransactionReducer from './transactionReducer';
import TransactionContext from './transactionContext';
import axios from 'axios';

// display list of trades
const TransactionState = props => {
  const initialState = {
    transactions: [
      {
        id: 1,
        type: 'BUY',
        symbol: 'AAPL',
        shareAmount: 100,
        sharePrice: 300
      },
      {
        id: 2,
        type: 'BUY',
        symbol: 'AMZN',
        shareAmount: 20,
        sharePrice: 2000
      },
      {
        id: 3,
        type: 'BUY',
        symbol: 'MSFT',
        shareAmount: 20,
        sharePrice: 700
      }
    ]
  };

  const [state] = useReducer(TransactionReducer, initialState);

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
