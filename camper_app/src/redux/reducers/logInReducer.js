import { LOGIN } from "../actions/loginAction";

const initailState = {
  isLogged: false,
};

export const loginReducer = (state = initailState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("sto nell'action");
      return {
        ...state,

        isLogged: action.payload,
      };
    default:
      return state;
  }
};
