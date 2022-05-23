import { ADD_TODO, SET_LOADING } from "./action";

const init = {
  loading: true,
  todos: [],
};

export const todoReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...todos, payload],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
