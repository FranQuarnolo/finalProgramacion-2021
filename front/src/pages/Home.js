import React, { useEffect } from 'react';
import Producto from "../components/Producto";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listarProductos } from "../actions/productoActions";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function Home() {
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const listaProductos = useSelector((state) => state.listaProductos);
  const { loading, error, productos, page, pages } = listaProductos;

  useEffect(() => {
    dispatch(listarProductos({ pageNumber }));
  }, [dispatch, pageNumber]);

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
      <div className="row center pagination">
        {[...Array(pages).keys()].map((x) => (
          <Link
            className={x + 1 === page ? 'active' : ''}
            key={x + 1}
            to={`/pageNumber/${x + 1}`}
          >
            {x + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
