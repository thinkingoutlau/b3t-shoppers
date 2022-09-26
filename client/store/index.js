import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import auth from "./auth";
import user from "./user";

import allProducts from "./allProducts";
import productReducer from "./singleProduct";
import users from "./users";
import currentOrder from "./orders";
import orderHistory from "./orderHistory";

const reducer = combineReducers({
  auth,
  user,
  allProducts,
  product: productReducer,
  user,
  users,
  currentOrder,
  orderHistory,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
