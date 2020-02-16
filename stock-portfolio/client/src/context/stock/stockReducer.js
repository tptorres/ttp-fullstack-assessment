import {
  ADD_STOCK,
  UPDATE_STOCK,
  SET_CURRENT,
  STOCK_ERROR,
  GET_STOCKS,
  CLEAR_STOCKS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_CURRENT:
      return {
        ...state,
        currentStock: state.currentStocks.filter(stock => stock.symbol === action.payload)[0]
      };
    case UPDATE_STOCK:
      return {
        ...state,
        currentStocks: state.currentStocks.map(stock =>
          stock.symbol === action.payload.symbol ? action.payload : stock
        )
      };
    case ADD_STOCK:
      return {
        ...state,
        currentStocks: [action.payload, ...state.currentStocks] // making a copy and adding the payload
      };
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
    default:
      return state;
  }
};
