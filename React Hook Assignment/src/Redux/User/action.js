export const ADD_USER = "ADD_USER";
export const ADD_TOKEN = "ADD_TOKEN";
export const LOGOUT_USER = "LOGOUT_USER";

export const addUser = (data) => {
  return {
    type: ADD_USER,
    payload: data,
  };
};

export const addToken = (token) => {
  return {
    type: ADD_TOKEN,
    payload: token,
  };
};

export const logOutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
