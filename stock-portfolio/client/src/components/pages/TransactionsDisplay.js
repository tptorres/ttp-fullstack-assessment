import React, { useContext, useEffect } from 'react';
import Transactions from '../transactions/Transactions';
import TransactionContext from '../../context/transactions/transactionContext';
import AuthContext from '../../context/auth/authContext';

// @info Page that shows a users past transactions
// Calls upon the /api/transactions endpoint
const TransactionsDisplay = () => {
  const transactionContext = useContext(TransactionContext);
  const { displayTransactions } = transactionContext;

  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.userLoaded();
    displayTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      <h1>Transactions</h1>
      <Transactions />
    </div>
  );
};

export default TransactionsDisplay;
