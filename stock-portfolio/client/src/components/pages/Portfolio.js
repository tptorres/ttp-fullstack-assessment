import React, { useContext, useEffect } from 'react';
import BuyStock from '../stocks/BuyStock';
import Stocks from '../stocks/Stocks';
import StockContext from '../../context/stock/stockContext';
import AuthContext from '../../context/auth/authContext';

const Portfolio = () => {
  const authContext = useContext(AuthContext);
  const stockContext = useContext(StockContext);

  const { portfolio, currentStocks, getUserAssets, cash } = stockContext;

  useEffect(() => {
    console.log('Page');
    // Authenticates the user and makes sure the correct one is in state by looking at the token
    authContext.userLoaded();
    getUserAssets();
    // eslint-disable-next-line
  }, [currentStocks, portfolio]);

  return (
    <div className='container'>
      <h1>Portfolio ( ${portfolio} )</h1>
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
