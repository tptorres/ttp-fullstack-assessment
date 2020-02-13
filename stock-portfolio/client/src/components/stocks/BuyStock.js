import React, {useContext, useState} from 'react';
import StockContext from '../../context/stock/stockContext';

const BuyStock = () => {
  const stockContext = useContext(StockContext);
  const {currentCash} = stockContext;

  const [stock, setStock] = useState({
    symbol: '',
    shareAmount: '',
    sharePrice: 1000
  });

  const {symbol, shareAmount} = stock;

  const onChange = event => setStock({...stock, [event.target.name]: event.target.value});

  const onSubmit = event => {
    event.preventDefault();

    //check if it exists and return a boolean
    var check = stockContext.stockExists(stock.symbol);
    if (check) {
      stockContext.updateStock(stock);
    } else {
      stockContext.addStock(stock);
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
      <input type='text' name='shareAmount' placeholder='Qty' value={shareAmount} onChange={onChange} />
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
