import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listarProductos } from '../actions/productoActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

export default function ProductoListado(props) {
    const listaProductos = useSelector((state) => state.listaProductos);
    const { loading, error, productos } = listaProductos;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listarProductos());
    }, [dispatch]);
    const deleteHandler = () => {
        /// TODO: dispatch delete action
    };
    return (
        <div>
            <h1>Listado Productos</h1>
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
                                            props.history.push(`/product/${producto._id}/edit`)
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