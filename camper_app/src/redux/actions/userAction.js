import { useNavigate } from "react-router-dom";
import { LOGIN, handleLogin } from "./loginAction";

const API_URL_LOGIN = "http://localhost:8080/api/auth/login";
const API_URL_USER = "http://localhost:8080/app/users/search?userName=";

export const GET_USER = "GET_USER";
export const GET_PASSWORD = "GET_PASSWORD";

export const GET_PROFILE = "GET_PROFILE";

export const RESET_USER = "RESET_USER";

export const handleUser = (paylo) => {
  return {
    type: GET_USER,
    payload: paylo,
  };
};
export const handlePassword = (paylo) => {
  return {
    type: GET_PASSWORD,
    payload: paylo,
  };
};

export const handleProfile = (paylo) => {
  return {
    type: GET_PROFILE,
    payload: paylo,
  };
};

export const resetUser = () => {
  return {
    type: RESET_USER,
  };
};

export const myHeaders = {
  "Content-Type": "application/json",
};

export const token = window.localStorage.getItem("token");

export const myHeadersToken = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
export const myHeadersTokenPhoto = {
  Authorization: `Bearer ${token}`,
};

export const logInThunk = (userLogin) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(API_URL_LOGIN, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(userLogin),
        redirect: "follow",
      });
      if (response.ok) {
        const authControll = await response.json();
        console.log(authControll, getState);
        window.localStorage.setItem("token", authControll.accessToken);
        dispatch(handleLogin());
      } else if (response.status === 400 || response.status === 500) {
        alert("credenziali non valide");
      }
    } catch (error) {
      console.log(error + " sono l'errore");
    }
  };
};

export const userProfile = (userName) => {
  return async (dispatch, getState) => {
    console.log(userName);
    console.log(token);
    console.log(myHeadersToken);
    try {
      const response = await fetch(API_URL_USER + userName, {
        method: "GET",
        headers: myHeadersToken,
        redirect: "follow",
      });
      if (response.ok) {
        const profile = await response.json();
        dispatch(handleProfile(profile));
      } else if (response.status === 500) {
        alert("errore nella chiamata");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
