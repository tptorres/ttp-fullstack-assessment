import { DISPLAY_TRANSACTIONS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case DISPLAY_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions
      };
    default:
      return state;
  }
};
