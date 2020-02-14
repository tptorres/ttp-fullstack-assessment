import React, { useContext } from 'react';
import BuyStock from '../stocks/BuyStock';
import Stocks from '../stocks/Stocks';
import StockContext from '../../context/stock/stockContext';

const Portfolio = () => {
  const stockContext = useContext(StockContext);
  const { currentCash } = stockContext;
  return (
    <div className='container'>
      <h1>Portfolio (${currentCash})</h1>
      <div className='grid-3-cols'>
        <div className='stocks-list'>
          <Stocks />
        </div>
        <div className='vert-line'>
          <div className='middle-vert-line'></div>
        </div>
        <BuyStock />
      </div>
    </div>
  );
};

export default Portfolio;
