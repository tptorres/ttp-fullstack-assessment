import React, { useContext, useState, useEffect } from 'react';
import StockContext from '../../context/stock/stockContext';
import AlertContext from '../../context/alert/alertContext';

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
    clearErrors,
    error,
    getStocks
  } = stockContext;

  const [stock, setStock] = useState({
    symbol: '',
    shareAmount: ''
  });
  const { symbol, shareAmount } = stock;

  useEffect(() => {
    if (error === 'Unknown symbol') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (error === 'Only whole shares can be bought') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  const onChange = event => setStock({ ...stock, [event.target.name]: event.target.value });

  const onSubmit = async event => {
    event.preventDefault();
    if (symbol === '' || shareAmount === '') {
      setAlert('All fields not filled', 'danger');
    }

    // Need to cast shareAmount as the input is a string
    stock.shareAmount = Number(shareAmount);

    var stockToUpdate = currentStocks.find(updatedStock => updatedStock.symbol === stock.symbol);
    if (stockToUpdate !== undefined) {
      updateStock(stockToUpdate, stock);
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
