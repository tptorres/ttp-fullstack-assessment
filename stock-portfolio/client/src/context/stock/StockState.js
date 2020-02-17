import React, { useReducer } from 'react';
import StockReducer from './stockReducer';
import StockContext from './stockContext';
import axios from 'axios';
import {
  ADD_STOCK,
  UPDATE_STOCK,
  STOCK_ERROR,
  GET_STOCKS,
  CLEAR_STOCKS,
  CLEAR_ERRORS
} from '../types';

const StockState = props => {
  const initialState = {
    currentCash: 5000,
    error: null,
    portfolioCash: 0,
    currentStocks: [],
    loading: true
  };

  const [state, dispatch] = useReducer(StockReducer, initialState);

  // Add Stock
  // Have to add the stocks current price in BuyStock
  const addStock = async stock => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/stocks', stock, config);
      dispatch({
        type: ADD_STOCK,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: STOCK_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Update a stock
  const updateStock = async (stock, shareAmount) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/stocks/${stock._id}`, { stock, shareAmount }, config);

      dispatch({
        type: UPDATE_STOCK,
        payload: res.data
      });

      //
    } catch (err) {
      dispatch({
        type: STOCK_ERROR,
        payload: err.response.data.errors
      });
    }
  };

  // Get Stocks
  const getStocks = async () => {
    try {
      const res = await axios.get('/api/stocks');

      dispatch({
        type: GET_STOCKS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: STOCK_ERROR,
        payload: err.response.data.errors
      });
    }
  };

  const refreshStocks = async () => {
    try {
      const res = await axios.get('/api/stocks/refresh');

      dispatch({
        type: GET_STOCKS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: STOCK_ERROR,
        payload: err.response.data.errors
      });
    }
  };

  const clearStocks = () => {
    dispatch({
      type: CLEAR_STOCKS
    });
  };
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <StockContext.Provider
      value={{
        currentCash: state.currentCash,
        portfolioCash: state.portfolioCash,
        currentStocks: state.currentStocks,
        currentStock: state.currentStock,
        stockToUpdate: state.stockToUpdate,
        error: state.error,
        addStock,
        updateStock,
        getStocks,
        clearStocks,
        refreshStocks,
        clearErrors
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;
