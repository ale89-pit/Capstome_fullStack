import { myHeaders, token, myHeadersToken } from "./userAction";

const API_URL_FACILITY = "http://localhost:8080/app";

export const GET_ALL_FACILTY = "GET_ALL_FACILITY";
export const GET_SINGLE_FACILITY = "GET_SINGLE_FACILITY";
export const SET_SINGLE_FACILITY = "RESET_FACILITY";

export const handlerFacility = (paylo) => {
  return {
    type: GET_ALL_FACILTY,
    payload: paylo,
  };
};
export const handlerSingleFacility = (paylo) => {
  return {
    type: GET_SINGLE_FACILITY,
    payload: paylo,
  };
};
export const setSingleFacility = () => {
  return {
    type: SET_SINGLE_FACILITY,
  };
};

export const getAllFacility = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL_FACILITY, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      });
      if (response.ok) {
        const allFacility = await response.json();

        dispatch(handlerFacility(allFacility));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getSingleFacility = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL_FACILITY + `/${id}`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      });
      if (response.ok) {
        const Facility = await response.json();

        dispatch(handlerSingleFacility(Facility));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
