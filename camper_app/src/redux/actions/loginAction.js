import { resetUser } from "./userAction";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const handleLogin = () => {
  return {
    type: LOGIN,
    payload: true,
  };
};

export const logOut = () => {
  resetUser();
  return {
    type: LOGOUT,
  };
};
