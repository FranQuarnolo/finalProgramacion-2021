import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/carroReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productoReducers";
import { userSigninReducer } from "./reducers/usuarioReducers";

const initialState = {
  usuarioLogin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
const reducer = combineReducers({
  listaProductos: productListReducer,
  productoDetalles: productDetailsReducer,
  cart: cartReducer,
  usuarioLogin: userSigninReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
