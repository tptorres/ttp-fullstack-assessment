import React, { useContext, useEffect } from 'react';
import BuyStock from '../stocks/BuyStock';
import Stocks from '../stocks/Stocks';
import StockContext from '../../context/stock/stockContext';
import AuthContext from '../../context/auth/authContext';

const Portfolio = () => {
  const authContext = useContext(AuthContext);
  // Authenticates the user and makes sure the correct one is in state by looking at the token
  useEffect(() => {
    authContext.userLoaded();
    // eslint-disable-next-line
  }, []);

  const stockContext = useContext(StockContext);
  const { cash } = stockContext;
  console.log(cash);
  return (
    <div className='container'>
      <h1>Portfolio ${cash}</h1>
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
