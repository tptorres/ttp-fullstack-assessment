import React, {Fragment, useContext} from 'react';
import StockContext from '../../context/stock/stockContext';
import StockItem from './StockItem';

const Stocks = () => {
  const stockContext = useContext(StockContext);
  const {currentStocks} = stockContext;

  return (
    <Fragment>
      {currentStocks.map(stock => (
        <StockItem key={stock.symbol} stock={stock} />
      ))}
    </Fragment>
  );
};

export default Stocks;
