import { FETCH_MINERALS } from '../constants/mineralConstants';

const initialState = {
  minerals: [],
};

export const mineralReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MINERALS:
      return {
        ...state,
        minerals: action.payload,
      };

    default:
      return state;
  }
}
