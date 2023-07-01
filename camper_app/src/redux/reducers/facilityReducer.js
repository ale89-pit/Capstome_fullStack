import { GET_ALL_FACILTY } from "../actions/facilityAction";

const initailState = {
  facility: [],
};

export const facilityReducer = (state = initailState, action) => {
  switch (action.type) {
    case GET_ALL_FACILTY:
      return {
        ...state,
        facility: action.payload,
      };
    default:
      return state;
  }
};
