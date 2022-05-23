import { todoReducer } from "./Todo/reducer";
import { userReducer } from "./User/reducer";
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todo: todoReducer,
  user: userReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
