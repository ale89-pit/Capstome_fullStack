export const GET_NAME = "GET_NAME";
export const GET_COVER = "GET_COVER";
export const GET_DESCRIPTION = "GET_DESCRIPTION";
export const GET_PHONE = "GET_PHONE";
export const GET_EMAIL = "GET_EMAIL";
export const GET_SITE = "GET_SITE";
export const TOGGLE_SERVICE = "TOGGLE_SERVICE";
export const GET_TYPE = "GET_TYPE";
export const GET_STREET = "GET_STREET";
export const GET_STREET_NUMBER = "GET_STREET_NUMBER";
export const GET_COMUNE_ID = "GET_COMUNE_ID";
export const RESET_FORM = "RESET_FORM";

export const handlerName = (paylo) => {
  return {
    type: GET_NAME,
    payload: paylo,
  };
};
export const handlercover = (paylo) => {
  return {
    type: GET_COVER,
    payload: paylo,
  };
};
export const handlerDescr = (paylo) => {
  return {
    type: GET_DESCRIPTION,
    payload: paylo,
  };
};
export const handlerPhone = (paylo) => {
  return {
    type: GET_PHONE,
    payload: paylo,
  };
};
export const handlerEmail = (paylo) => {
  return {
    type: GET_EMAIL,
    payload: paylo,
  };
};
export const handlerSite = (paylo) => {
  return {
    type: GET_SITE,
    payload: paylo,
  };
};
export const toggleService = (paylo) => {
  console.log(paylo);
  return {
    type: TOGGLE_SERVICE,
    payload: paylo,
  };
};
export const handlerType = (paylo) => {
  return {
    type: GET_TYPE,
    payload: paylo,
  };
};
export const handlerStreet = (paylo) => {
  return {
    type: GET_STREET,
    payload: paylo,
  };
};
export const handlerStreetNumber = (paylo) => {
  return {
    type: GET_STREET_NUMBER,
    payload: paylo,
  };
};
export const handlerComune = (paylo) => {
  return {
    type: GET_COMUNE_ID,
    payload: paylo,
  };
};
export const resetForm = () => {
  return {
    type: RESET_FORM,
  };
};
