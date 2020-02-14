import { ADD_STOCK, UPDATE_STOCK, SET_CURRENT } from '../types';

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
        currentStocks: state.currentStocks.map(stock => (stock.symbol === action.payload.symbol ? action.payload : stock))
      };
    case ADD_STOCK:
      return {
        ...state,
        currentStocks: [...state.currentStocks, action.payload] // making a copy and adding the payload
      };
    default:
      return state;
  }
};
