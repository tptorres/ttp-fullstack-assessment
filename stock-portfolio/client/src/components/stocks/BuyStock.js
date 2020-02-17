import React, { useContext, useState, useEffect } from 'react';
import StockContext from '../../context/stock/stockContext';
import AlertContext from '../../context/alert/alertContext';
import { CLEAR_ERRORS } from '../../context/types';

const BuyStock = () => {
  // Alerts
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const stockContext = useContext(StockContext);
  const {
    currentCash,
    updateStock,
    addStock,
    currentStocks,
    getStocks,
    clearErrors,
    error
  } = stockContext;

  const [stock, setStock] = useState({
    symbol: '',
    shareAmount: ''
  });
  const { symbol, shareAmount } = stock;

  useEffect(() => {
    console.log(error);
    if (error === 'Unknown symbol') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error]);

  const onChange = event => setStock({ ...stock, [event.target.name]: event.target.value });

  const onSubmit = async event => {
    event.preventDefault();

    if (symbol === '' || shareAmount === '') {
      setAlert('All fields not filled', 'danger');
    }

    var stockToUpdate = currentStocks.find(updatedStock => updatedStock.symbol === stock.symbol);

    // Set an alert for when fields are not filled in //
    if (stockToUpdate !== undefined) {
      updateStock(stockToUpdate, stock.shareAmount);
    } else {
      addStock(stock);
    }
    // Resets the form after submission
    setStock({
      symbol: '',
      shareAmount: ''
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Cash - ${currentCash}</h1>
      <input type='text' name='symbol' placeholder='Ticker' value={symbol} onChange={onChange} />
      <input
        type='text'
        name='shareAmount'
        placeholder='Qty'
        value={shareAmount}
        onChange={onChange}
      />
      <div>
        <input type='submit' value='Buy Stock' className='btn stock-btn' />
      </div>
    </form>
  );
};

export default BuyStock;
