import React from "react";
import Rating from "./Rating";

export default function Producto(props) {
  const { producto } = props;
  return (
    <div key={producto._id} className="card">
      <a href={`/producto/${producto._id}`}>
        <img className="medium" src={producto.image} alt={producto.name} />
      </a>
      <div className="card-body">
        <a href={`/producto/${producto._id}`}>
          <h2>{producto.name}</h2>
        </a>
        <p>{producto.description}</p>
        <p className="pages">Paginas:{producto.pages}</p>
        <p>Rating:</p>
        <Rating
          rating={producto.rating}
          numReviews={producto.numReviews}
        ></Rating>
        <div className="price">${producto.price}</div>
        <p className="category">{producto.category}</p>
      </div>
    </div>
  );
}
