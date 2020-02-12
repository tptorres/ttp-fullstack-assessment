import React, {Fragment} from 'react';
import Trades from '../trades/Transactions';

const TransactionsDisplay = () => {
  return (
    <div className='container'>
      <h1>Transactions</h1>
      <Trades />
    </div>
  );
};

export default TransactionsDisplay;
