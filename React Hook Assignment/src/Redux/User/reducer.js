import { ADD_TOKEN, ADD_USER, LOGOUT_USER } from "./action";

const init = {
  user: {},
  token: "",
  loggedin: false,
};

export const userReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER:
      return {
        ...state,
        user: payload,
        loggedin: true,
      };

    case ADD_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loggedin: false,
      };

    default:
      return state;
  }
};
