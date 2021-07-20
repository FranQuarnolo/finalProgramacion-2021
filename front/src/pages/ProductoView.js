import React from "react";
import { Link } from 'react-router-dom';
import Rating from "../components/Rating";
import data from "../data";

export default function ProductoView(props) {
  const producto = data.productos.find((x) => x._id === props.match.params.id);
  if (!producto) {
    return <div> Producto no encontrado!</div>;
  }
  return (
    <div>
      <Link to="/"><button className="back">Regresar</button></Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={producto.image} alt={producto.name}></img>
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
            <li>Precio : ${producto.price}</li>
            <li>
              Descripcion:
              <p>{producto.description}</p>
            </li>
            <li>Paginas: {producto.pages}</li>
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
                  <div>Estado</div>
                  <div>
                    {producto.stock > 0 ? (
                      <span className="success">Stock Disponible</span>
                    ) : (
                      <span className="error">Sin Existencias</span>
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
  );
}
