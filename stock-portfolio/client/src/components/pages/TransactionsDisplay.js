import React, { useContext, useEffect } from 'react';
import Transactions from '../transactions/Transactions';
import TransactionContext from '../../context/transactions/transactionContext';

const TransactionsDisplay = () => {
  const transactionContext = useContext(TransactionContext);
  const { displayTransactions } = transactionContext;

  useEffect(() => {
    displayTransactions();
  }, []);

  return (
    <div className='container'>
      <h1>Transactions</h1>
      <button>HELLO</button>
      <div></div>
      <Transactions />
    </div>
  );
};

export default TransactionsDisplay;
