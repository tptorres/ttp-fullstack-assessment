import React, { Fragment, useContext } from 'react';
import Transaction from './Transaction';
import TransactionContext from '../../context/transactions/transactionContext';

const Transactions = () => {
  const transactionContext = useContext(TransactionContext);

  // getting list of transactions that occurred
  const { transactions } = transactionContext;
  transactions.sort((t1, t2) => (t1.shareAmount > t2.shareAmount ? -1 : 1));

  return (
    <Fragment>
      {transactions.map(transaction => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </Fragment>
  );
};

export default Transactions;
