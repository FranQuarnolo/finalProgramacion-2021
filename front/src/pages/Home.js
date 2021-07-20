import React, { useEffect, useState } from "react";
import axios from "axios";
import Producto from "../components/Producto";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/productos");
        setLoading(false);
        setProductos(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
