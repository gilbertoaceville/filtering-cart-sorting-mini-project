import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// REDUCERS
import { cartReducer } from "./reducers/cartReducer";
import { toggleReducer } from "./reducers/toggleReducer";
import { backdropReducer } from "./reducers/backdropReducer";

const reducer = combineReducers({
  cart: cartReducer,
  toggle: toggleReducer,
  backdrop: backdropReducer
});

// facilitate asynchronous in global state
const middleware = [thunk];

/**
 * @see actions folder on how data was stored
 * retrieve cartItems from localStorage
 */
const getCartItemsInStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// set cartItems' initial state to data from localStorage
const INITIAL_STATE = {
  cart: {
    cartItems: getCartItemsInStorage,
  },
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
