import React, { Fragment, useContext, useEffect } from 'react';
import StockContext from '../../context/stock/stockContext';
import StockItem from './StockItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Stocks = () => {
  const stockContext = useContext(StockContext);
  const {
    currentStocks,
    getStocks,
    loading,
    getUserAssets,
    cash,
    portfolio,
    error,
    transactions
  } = stockContext;

  useEffect(() => {
    getStocks();
    console.log('STOCK');
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {currentStocks !== null && !loading ? (
        <TransitionGroup>
          {currentStocks.map(stock => (
            <CSSTransition key={stock._id} timeout={500} classNames='item'>
              <StockItem stock={stock} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Stocks;
