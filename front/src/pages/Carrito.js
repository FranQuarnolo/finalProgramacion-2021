import React from 'react';

export default function Carrito(props) {
  const productoId = props.match.params.id;
  const cant = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  return (
    <div>
      <h1>Carrito</h1>
      <p>
        AÑADIR AL CARRO : ProductoID: {productoId} Cant: {cant}
      </p>
    </div>
  );
}