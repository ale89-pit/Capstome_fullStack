import { myHeaders, token, myHeadersToken } from "./userAction";

const API_URL_FACILITY = "http://localhost:8080/app";

export const GET_ALL_FACILTY = "GET_ALL_FACILITY";

export const handlerFacility = (paylo) => {
  return {
    type: GET_ALL_FACILTY,
    payload: paylo,
  };
};

export const getAllFacility = () => {
  console.log("inizio fetch");
  console.log(myHeaders);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL_FACILITY, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      });
      if (response.ok) {
        const allFacility = await response.json();
        console.log(allFacility);
        dispatch(handlerFacility(allFacility));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
