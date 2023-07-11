

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const handleLogin = () => {
  return {
    type: LOGIN,
    payload: true,
  };
};

export const logOut = () => {
  
  return {
    type: LOGOUT,
  };
};
