import { LOGIN } from "../actions/loginAction";
import { GET_PROFILE } from "../actions/userAction";
const initailState = {
  isLogged: false,
  profile: null,
};

export const loginReducer = (state = initailState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("sto nell'action");
      return {
        ...state,

        isLogged: action.payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: [action.payload],
      };
    default:
      return state;
  }
};
