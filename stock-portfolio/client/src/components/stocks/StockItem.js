import React from 'react';
import PropTypes from 'prop-types';

const StockItem = ({stock}) => {
  const {symbol, shareAmount, sharePrice} = stock;
  return (
    <div className='stock-card'>
      <div className='stock-shares'>
        <h3>{symbol} - &nbsp;</h3>
        <h3>{shareAmount} Shares</h3>
      </div>
      <h3>${sharePrice}</h3>
    </div>
  );
};

StockItem.propTypes = {
  stock: PropTypes.object.isRequired
};

export default StockItem;
