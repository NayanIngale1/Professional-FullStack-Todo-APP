import { ADD_TODO, SET_LOADING, ADD_ALL_TODO } from "./action";

const init = {
  loading: true,
  todos: [],
  personalTodos: [],
  otherTodos: [],
  officialTodos: [],
};

export const todoReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
        loading: false,
        personalTodos: [...state.todos,payload].filter((td) => td.tags.includes("Personal")),
        otherTodos: [...state.todos,payload].filter((td) => td.tags.includes("Official")),
        officialTodos: [...state.todos,payload].filter((td) => td.tags.includes("Others"))
      };
    
    "Official", "Personal", "Others";
    case ADD_ALL_TODO:
      return {
        ...state,
        todos: payload,
        loading: false,
        personalTodos:  payload.filter((td) =>
          td.tags.includes("Personal")
        ),
        otherTodos:  payload.filter((td) =>
          td.tags.includes("Official")
        ),
        officialTodos: payload.filter((td) =>
          td.tags.includes("Others")
        ),
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

/*
title: 'Title', description: 'hello Ashish', status: 'progress', subTasks: Array(2), tags: Array(2)

progressArr = todos.filter((td)=>(td.tags.includes== "Personal"))

*/
