import React, { useContext } from 'react';
import Transactions from '../transactions/Transactions';
import TransactionContext from '../../context/transactions/transactionContext';

const TransactionsDisplay = () => {
  const transactionContext = useContext(TransactionContext);
  const { test } = transactionContext;

  return (
    <div className='container'>
      <h1>Transactions</h1>
      <button onClick={test}>hELLO</button>
      <div></div>
      <Transactions />
    </div>
  );
};

export default TransactionsDisplay;
