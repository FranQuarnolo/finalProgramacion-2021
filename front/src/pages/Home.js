import React, { useEffect } from 'react';
import Producto from "../components/Producto";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listarProductos } from "../actions/productoActions";

export default function Home() {
  const dispatch = useDispatch();
  const listaProductos = useSelector((state) => state.listaProductos);
  const { loading, error, productos } = listaProductos;

  useEffect(() => {
    dispatch(listarProductos({}));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {productos.map((producto) => (
            <Producto key={producto._id} producto={producto}></Producto>
          ))}
        </div>
      )}
    </div>
  );
}
