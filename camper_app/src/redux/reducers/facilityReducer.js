import {
  GET_ALL_FACILTY,
  GET_SINGLE_FACILITY,
  SET_SINGLE_FACILITY,
} from "../actions/facilityAction";

const initailState = {
  facility: [],
  isLoadingAll: true,
  singleFacility: [],
  isLoading: true,
};

export const facilityReducer = (state = initailState, action) => {
  switch (action.type) {
    case GET_ALL_FACILTY:
      return {
        ...state,
        facility: action.payload,
        isLoadingAll: false,
      };
    case GET_SINGLE_FACILITY:
      return {
        ...state,
        singleFacility: action.payload,
        isLoading: false,
      };
    case SET_SINGLE_FACILITY:
      return {
        ...state,
        singleFacility: [],
        isLoading: true,
      };
    default:
      return state;
  }
};
