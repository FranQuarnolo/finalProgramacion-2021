import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/carroActions";

export default function Carrito(props) {
  const productoId = props.match.params.id;
  const cant = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productoId) {
      dispatch(addToCart(productoId, cant))
    }
  }, [dispatch, productoId, cant]);
  return (
    <div>
      <h1>Carrito</h1>
      <p>
        AÑADIR AL CARRO : ProductoID: {productoId} Cant: {cant}
      </p>
    </div>
  );
}
