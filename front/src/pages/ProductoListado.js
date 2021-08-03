import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearProducto, listarProductos } from '../actions/productoActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../constants/productoConstants';

export default function ProductoListado(props) {
    const listaProductos = useSelector((state) => state.listaProductos);
    const { loading, error, productos } = listaProductos;
    const crearNuevoProducto = useSelector((state) => state.crearNuevoProducto);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        producto: createdProduct,
    } = crearNuevoProducto;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/producto/${createdProduct._id}/edit`);
        }
        dispatch(listarProductos());
    }, [createdProduct, dispatch, props.history, successCreate]);
    const deleteHandler = () => {
        /// TODO: dispatch delete action
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
            {loadingCreate && <Loading></Loading>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? (
                <Loading></Loading>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
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
            )}
        </div>
    );
}