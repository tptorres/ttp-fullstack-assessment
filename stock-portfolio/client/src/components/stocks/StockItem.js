import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const StockItem = ({ stock }) => {
  const { symbol, shareAmount, sharePrice, color } = stock;

  var textColor = '';

  if (color === 1) {
    textColor = (
      <Fragment>
        <span className='text-over'>
          ${sharePrice} <i className='fas fa-arrow-up' />
        </span>
      </Fragment>
    );
  } else if (color === -1) {
    textColor = (
      <Fragment>
        <span className='text-under'>
          ${sharePrice} <i className='fas fa-arrow-down' />
        </span>
      </Fragment>
    );
  } else {
    textColor = (
      <Fragment>
        <span className='text-over'>
          ${sharePrice} <i className='fas fa-arrow-right' />
        </span>
      </Fragment>
    );
  }

  return (
    <div className='stock-card'>
      <div className='stock-shares'>
        <h3>{symbol.toUpperCase()} - &nbsp;</h3>
        <h3>{shareAmount} Shares</h3>
      </div>
      <h3>{textColor}</h3>
    </div>
  );
};

StockItem.propTypes = {
  stock: PropTypes.object.isRequired
};

export default StockItem;
