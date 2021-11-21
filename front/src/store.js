import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/carroReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from "./reducers/ordenReducers";
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/productoReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/usuarioReducers";

const initialState = {
  usuarioLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};
const reducer = combineReducers({
  listaProductos: productListReducer,
  productoDetalles: productDetailsReducer,
  cart: cartReducer,
  usuarioLogin: userSigninReducer,
  usuarioRegistro: userRegisterReducer,
  crearOrden: orderCreateReducer,
  ordenDetalles: orderDetailsReducer,
  ordenPago: orderPayReducer,
  historialCompra: orderMineListReducer,
  usuarioDetalles: userDetailsReducer,
  usuarioActualizar: userUpdateProfileReducer,
  crearNuevoProducto: productCreateReducer,
  actualizarProducto: productUpdateReducer,
  EliminarProducto: productDeleteReducer,
  listadoPedidos: orderListReducer,
  eliminarPedido: orderDeleteReducer,
  ordenEntrega: orderDeliverReducer,
  listadoUsuario: userListReducer,
  eliminarUsuario: userDeleteReducer,
  actualizarUsuario: userUpdateReducer,
  listadoProductosCategoria: productCategoryListReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
