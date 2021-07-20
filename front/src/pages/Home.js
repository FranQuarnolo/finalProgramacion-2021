import React from "react";
import Producto from "../components/Producto";
import data from "../data";

export default function Home() {
  return (
    <div>
      <div className="row center">
        {data.productos.map((producto) => (
          <Producto key={producto._id} producto={producto}></Producto>
        ))}
      </div>
    </div>
  );
}
