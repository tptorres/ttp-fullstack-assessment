import React, { useReducer } from 'react';
import TransactionReducer from './transactionReducer';
import TransactionContext from './transactionContext';

// display list of trades
const TransactionState = props => {
  const initialState = {
    transactions: []
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
