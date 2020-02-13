import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Transaction = ({transaction}) => {
  const {type, symbol, shareAmount, sharePrice} = transaction;

  return (
    <div className='trans-card bg-light'>
      <h5>{type}</h5>
      <h4>({symbol})</h4>
      <div className='shares'>
        <h4>{shareAmount} Shares @ &nbsp;</h4>
        <span> </span>
        <h4> ${sharePrice.toFixed(2)}</h4>
      </div>
    </div>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired
};

export default Transaction;
