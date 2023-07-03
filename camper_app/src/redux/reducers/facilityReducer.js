import {
  GET_ALL_FACILTY,
  GET_SINGLE_FACILITY,
} from "../actions/facilityAction";

const initailState = {
  facility: [],
  singleFacility: [],
};

export const facilityReducer = (state = initailState, action) => {
  switch (action.type) {
    case GET_ALL_FACILTY:
      return {
        ...state,
        facility: action.payload,
      };
    case GET_SINGLE_FACILITY:
      return {
        ...state,
        singleFacility: action.payload,
      };
    default:
      return state;
  }
};
