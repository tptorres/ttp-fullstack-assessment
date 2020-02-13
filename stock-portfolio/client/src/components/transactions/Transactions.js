import React, {Fragment, useContext} from 'react';
import Transaction from './Transaction';
import TransactionContext from '../../context/transactions/transactionContext';

const Transactions = () => {
  const transactionContext = useContext(TransactionContext);

  // getting list of transactions that occurred
  const {transactions} = transactionContext;

  return (
    <Fragment>
      {transactions.map(transaction => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </Fragment>
  );
};

export default Transactions;
