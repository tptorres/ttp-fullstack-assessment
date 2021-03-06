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

export default (state, action) => {
  switch (action.type) {
    case ADD_STOCK:
      return {
        ...state,
        currentStocks: [...state.currentStocks, action.payload] // making a copy and adding the payload
      };
    case GET_STOCKS:
    case UPDATE_STOCK:
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
    case ASSET_ERROR:
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
        portfolio: action.payload.portfolio,
        cash: action.payload.cash
      };
    default:
      return state;
  }
};
