import React, {useReducer} from 'react';
import StockReducer from './stockReducer';
import StockContext from './stockContext';

const StockState = props => {
  const initialState = {
    currentCash: 5000,
    currentStocks: [
      {
        symbol: 'AAPL',
        shareAmount: 7,
        // sharePrice is the current price, has to be red or green if it is over/under open price
        sharePrice: 2000
      },
      {
        symbol: 'AMZN',
        shareAmount: 7,
        sharePrice: 5000
      },
      {
        symbol: 'MSFT',
        shareAmount: 7,
        sharePrice: 300
      }
    ]
  };

  const [state, dispatch] = useReducer(StockReducer, initialState);

  // Add Stocks

  return (
    <StockContext.Provider
      value={{
        currentCash: state.currentCash,
        currentStocks: state.currentStocks
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;
