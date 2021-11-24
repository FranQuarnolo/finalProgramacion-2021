import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  crearProducto,
  listarProductos,
  deleteProduct,
} from "../actions/productoActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productoConstants";

export default function ProductoListado(props) {
  const { pageNumber = 1 } = useParams();
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const listaProductos = useSelector((state) => state.listaProductos);
  const { loading, error, productos, page, pages } = listaProductos;
  const crearNuevoProducto = useSelector((state) => state.crearNuevoProducto);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    producto: createdProduct,
  } = crearNuevoProducto;
  const EliminarProducto = useSelector((state) => state.EliminarProducto);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = EliminarProducto;
  const usuarioLogin = useSelector((state) => state.usuarioLogin);
  const { userInfo } = usuarioLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/producto/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listarProductos({ seller: sellerMode ? userInfo._id : "", pageNumber }));
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (producto) => {
    if (window.confirm("Esta seguro que desea eliminar este producto?")) {
      dispatch(deleteProduct(producto._id));
    }
  };
  const createHandler = () => {
    dispatch(crearProducto());
  };
  return (
    <div>
      <div className="row">
        <h1>Listado Productos</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Crear Producto
        </button>
      </div>
      {loadingDelete && <Loading></Loading>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <Loading></Loading>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>PRECIO</th>
                <th>PAGINAS</th>
                <th>EDITORIAL</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto._id}>
                  <td>{producto._id}</td>
                  <td>{producto.name}</td>
                  <td>{producto.price}</td>
                  <td>{producto.pages}</td>
                  <td>{producto.editorial}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/producto/${producto._id}/edit`)
                      }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(producto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
