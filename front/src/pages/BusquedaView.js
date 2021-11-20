import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listarProductos } from '../actions/productoActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import Producto from '../components/Producto';

export default function BusquedaView(props) {
    const { name = 'all' } = useParams();
    const dispatch = useDispatch();
    const listaProductos = useSelector((state) => state.listaProductos);
    const { loading, error, productos } = listaProductos;
    useEffect(() => {
        dispatch(listarProductos({ name: name !== 'all' ? name : '' }));
    }, [dispatch, name]);
    return (
        <div>
            <div className="row">
                {loading ? (
                    <Loading></Loading>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>{productos.length} Resultados Encontrados:</div>
                )}
            </div>
            <div className="row top">
                <div className="col-1">
                    {/* <h3>Encontrados</h3> */}
                    {/* <ul>
                        <li>Category Similares: </li>
                    </ul> */}
                </div>
                <div className="col-3">
                    {loading ? (
                        <Loading></Loading>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            {productos.length === 0 && (
                                <MessageBox>Ops! Ningún producto encontrado!</MessageBox>
                            )}
                            <div className="row center">
                                {productos.map((producto) => (
                                    <Producto key={producto._id} producto={producto}></Producto>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}