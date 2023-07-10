import { startTransition } from "react";
import {
  GET_NAME,
  GET_COVER,
  GET_DESCRIPTION,
  GET_PHONE,
  GET_SITE,
  TOGGLE_SERVICE,
  GET_TYPE,
  GET_STREET,
  GET_STREET_NUMBER,
  GET_COMUNE_ID,
  RESET_FORM,
  GET_EMAIL,
} from "../actions/formFacilityAction";

const initailState = {
  name: "",
  cover: "",
  description: "",
  phoneNumber: "",
  officialSite: "",
  email:"",
  service: [],
  facilityType: "",
  address: {
    street: "",
    streetNumber: "",
    comune: "",
  },
};

export const formFacilityReducer = (state = initailState, action) => {
  switch (action.type) {
    case GET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case GET_COVER:
      return {
        ...state,
        cover: action.payload,
      };
    case GET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case GET_PHONE:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case GET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case GET_SITE:
      return {
        ...state,
        officialSite: action.payload,
      };
    case TOGGLE_SERVICE:
      
      return {
        ...state,
        service: action.payload,
      };
    case GET_TYPE:
      return {
        ...state,
        facilityType: action.payload,
      };
    case GET_STREET:
      return {
        ...state,

        address: {
          ...state.address,
          street: action.payload,
        },
      };
    case GET_STREET_NUMBER:
      return {
        ...state,
        address: {
          ...state.address,
          streetNumber: action.payload,
        },
      };
    case GET_COMUNE_ID:
      return {
        ...state,
        address: {
          ...state.address,
          comune: action.payload,
        },
      };
    case RESET_FORM:
      return initailState;
    default:
      return state;
  }
};
