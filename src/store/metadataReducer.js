import * as actionTypes from './actions';

export const initialState = {
  provinces: [],
  genders: [],
  weekday: [],
};

const metadataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.METADATA:
      return {
        ...state,
        provinces: action.provinces,
        genders: action.genders,
        weekday: action.weekday
      };
    default:
      return state;
  }
};

export default metadataReducer;
