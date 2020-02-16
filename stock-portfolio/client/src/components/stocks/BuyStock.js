import React, { useContext, useState } from 'react';
import StockContext from '../../context/stock/stockContext';

const BuyStock = () => {
  const stockContext = useContext(StockContext);
  const { currentCash, updateStock, addStock, currentStocks } = stockContext;

  const [stock, setStock] = useState({
    symbol: '',
    shareAmount: '',
    // Get price from symbol
    sharePrice: 1000
  });
  const { symbol, shareAmount } = stock;

  const onChange = event => setStock({ ...stock, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();

    /* var stockExists = currentStocks.some(storedStock => {
      return storedStock.symbol == stock.symbol;
    }); */

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
      shareAmount: '',
      sharePrice: 1000
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

/* const fetchTickerPrice = async () => {
    const res = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.symbol}&apikey=PV28K0ZS6QT49SGT`
    );

    console.log(res.data);
    var test = res.data['Global Quote']['02. open'];
    console.log(test);
    var cash = 5000;
     if (test * 10 > cash) {
    } else {
    }
  }; */
