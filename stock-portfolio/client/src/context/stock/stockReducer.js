import {
  ADD_STOCK,
  UPDATE_STOCK,
  STOCK_ERROR,
  GET_STOCKS,
  CLEAR_STOCKS,
  REFRESH_STOCKS,
  CLEAR_ERRORS,
  GET_ASSETS,
  ASSET_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_STOCK:
      return {
        ...state,
        currentStocks: [
          action.payload,
          ...state.currentStocks.filter(stock => stock.symbol !== action.payload.symbol)
        ]
      };
    case ADD_STOCK:
      return {
        ...state,
        currentStocks: [action.payload, ...state.currentStocks] // making a copy and adding the payload
      };
    case REFRESH_STOCKS:
    case GET_STOCKS:
      return {
        ...state,
        currentStocks: action.payload,
        loading: false
      };
    case CLEAR_STOCKS:
      return {
        ...state,
        currentStocks: null,
        error: null
      };
    case STOCK_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case GET_ASSETS:
      return {
        ...state,
        cash: action.payload.cash
      };
    default:
      return state;
  }
};
