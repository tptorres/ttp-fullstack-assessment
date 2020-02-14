import React, { Fragment, useContext } from 'react';
import StockContext from '../../context/stock/stockContext';
import StockItem from './StockItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Stocks = () => {
  const stockContext = useContext(StockContext);
  const { currentStocks } = stockContext;

  return (
    <Fragment>
      <TransitionGroup>
        {currentStocks.map(stock => (
          <CSSTransition key={stock.symbol} timeout={500} classNames='item'>
            <StockItem stock={stock} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Stocks;
