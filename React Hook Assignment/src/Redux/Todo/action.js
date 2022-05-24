export const ADD_TODO = "ADD_TODO";
export const ADD_ALL_TODO = "ADD_ALL_TODO";
export const SET_LOADING = "SET_LOADING";

export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};
export const addAllTodo = (todos) => {
  return {
    type: ADD_ALL_TODO,
    payload: todos,
  };
};

export const setLoading = (value) => {
  return {
    type: SET_LOADING,
    payload: value,
  };
};
