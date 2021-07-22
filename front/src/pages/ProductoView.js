import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { detallesProducto } from '../actions/productoActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import Rating from "../components/Rating";

export default function ProductoView(props) {
  const dispatch = useDispatch();
  const productoId = props.match.params.id;
  const productoDetalles = useSelector((state) => state.productoDetalles);
  const { loading, error, producto } = productoDetalles;

  useEffect(() => {
    dispatch(detallesProducto(productoId));
  }, [dispatch, productoId]);



  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link className="back" to="/">Regresar</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={producto.image}
                alt={producto.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{producto.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={producto.rating}
                    numReviews={producto.numReviews}
                  ></Rating>
                </li>
                <li>Precio: ${producto.price}</li>
                <li>
                  Descripción:
                  <p>{producto.description}</p>
                </li>
                <li>Paginas: {producto.price}</li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Precio</div>
                      <div className="price">${producto.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Disponibilidad</div>
                      <div>
                        {producto.countInStock > 0 ? (
                          <span className="success">Stock Disponible</span>
                        ) : (
                          <span className="danger">Sin Existencias</span>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <button className="primary block">Añadir al carrito</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
