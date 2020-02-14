import React, { useReducer } from 'react';
import StockReducer from './stockReducer';
import StockContext from './stockContext';
import { ADD_STOCK, UPDATE_STOCK, SET_CURRENT } from '../types';

const StockState = props => {
  const initialState = {
    currentCash: 5000,
    portfolioCash: 0,
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
    ],
    stockToUpdate: null
  };

  const [state, dispatch] = useReducer(StockReducer, initialState);

  // Add Stock
  // Have to add the stocks current price in BuyStock
  const addStock = stock => {
    dispatch({ type: ADD_STOCK, payload: stock });
  };

  // Update Stock
  const updateStock = newStock => {
    dispatch({ type: UPDATE_STOCK, payload: newStock });
  };

  const setCurrent = symbol => {
    dispatch({
      type: SET_CURRENT,
      payload: symbol
    });
  };

  // set stockToUpdate and remove updated stock from list ; keep immutability

  return (
    <StockContext.Provider
      value={{
        currentCash: state.currentCash,
        portfolioCash: state.portfolioCash,
        currentStocks: state.currentStocks,
        currentStock: state.currentStock,
        stockToUpdate: state.stockToUpdate,
        addStock,
        updateStock,
        setCurrent
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;
