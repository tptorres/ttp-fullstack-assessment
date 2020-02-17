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
  CLEAR_ERRORS,
  GET_ASSETS,
  ASSET_ERROR
} from '../types';

const StockState = props => {
  const initialState = {
    cash: null,
    portfolio: null,
    error: null,
    currentStocks: [],
    transactions: [],
    loading: true
  };

  const [state, dispatch] = useReducer(StockReducer, initialState);

  // Add Stock
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
      dispatch({
        type: STOCK_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Update a stock
  const updateStock = async (stockToUpdate, newStock) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/stocks/${stockToUpdate._id}`, newStock, config);

      dispatch({
        type: UPDATE_STOCK,
        payload: res.data
      });

      //
    } catch (err) {
      dispatch({
        type: STOCK_ERROR,
        payload: err.response.data.msg
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

  // Getting User cash and portfolio
  // Still have to error check
  const getUserAssets = async () => {
    try {
      const res = await axios.get('/api/users');

      dispatch({
        type: GET_ASSETS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ASSET_ERROR,
        payload: err.response.data.msg
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
        cash: state.cash,
        portfolio: state.portfolio,
        currentStocks: state.currentStocks,
        error: state.error,
        addStock,
        updateStock,
        getStocks,
        clearStocks,
        clearErrors,
        getUserAssets
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;
