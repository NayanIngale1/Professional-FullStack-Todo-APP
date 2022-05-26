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

/// this is gonna action creator which return a function which will have access to dispath function

export const getData = (user) => (dispatch) => {
 
  dispatch(setLoading(true));

  fetch(`https://nayan-todo-app.herokuapp.com/todo/user/${user}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(addAllTodo(res));
    });
};
