import {ADD_STOCK, UPDATE_STOCK} from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_STOCK:
      return {
        ...state
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
