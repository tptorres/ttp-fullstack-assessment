import React, {useReducer} from 'react';
import StockReducer from './stockReducer';
import StockContext from './stockContext';
import {ADD_STOCK, UPDATE_STOCK} from '../types';

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

  // Add Stock
  const addStock = stock => {
    dispatch({
      type: ADD_STOCK,
      payload: stock
    });
  };

  const updateStock = modifiedStock => {
    var stockToUpdate = {};
    for (var i = 0; i < state.currentStocks.length; i++) {
      if (modifiedStock.symbol === state.currentStocks[i].symbol) {
        state.currentStocks[i].shareAmount += Number(modifiedStock.shareAmount);
        stockToUpdate = state.currentStocks[i];
        break;
      }
    }
    // Force the rerender of the newly computed # of shares
    dispatch({
      type: UPDATE_STOCK
    });
  };

  // Helpers
  // Check if Stock exists

  // CHange to for loop
  const stockExists = symbol => {
    var flag = false;
    state.currentStocks.map(stock => {
      if (symbol === stock.symbol) {
        flag = true;
      }
    });
    return flag;
  };

  return (
    <StockContext.Provider
      value={{
        currentCash: state.currentCash,
        currentStocks: state.currentStocks,
        addStock,
        stockExists,
        updateStock
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;
