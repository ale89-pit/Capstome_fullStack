import { useNavigate } from "react-router-dom";
import { LOGIN, handleLogin } from "./loginAction";

const API_URL_LOGIN = "http://localhost:8080/api/auth/login";
const API_URL_USER = "http://localhost:8080/app/users/search?userName=";

export const GET_USER = "GET_USER";
export const GET_PASSWORD = "GET_PASSWORD";

export const GET_PROFILES = "GET_PROFILES";

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

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

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
      console.log(error);
    }
  };
};
