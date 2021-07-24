import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/carroConstants";

export const addToCart = (productoId, cant) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/productos/${productoId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      producto: data._id,
      cant,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
