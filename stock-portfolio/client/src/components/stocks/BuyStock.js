import React, {useContext, useState} from 'react';
import StockContext from '../../context/stock/stockContext';

const BuyStock = () => {
  const stockContext = useContext(StockContext);
  const {currentCash} = stockContext;

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

  return (
    <form>
      <h1>Cash - ${currentCash}</h1>
      <input type='text' name='ticker' placeholder='Ticker' />
      <input type='text' name='qty' placeholder='Qty' />
      <div>
        <input type='submit' value='Buy Stock' className='btn stock-btn' />
      </div>
    </form>
  );
};

export default BuyStock;
