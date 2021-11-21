import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listarProductos } from '../actions/productoActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import Producto from '../components/Producto';

export default function BusquedaView(props) {
    const { name = 'all', category = 'all' } = useParams();
    const dispatch = useDispatch();
    const listaProductos = useSelector((state) => state.listaProductos);
    const { loading, error, productos } = listaProductos;
    const listadoProductosCategoria = useSelector((state) => state.listadoProductosCategoria);
    const { loading: loadingCategories, errorCategories, categories } = listadoProductosCategoria;
    useEffect(() => {
        dispatch(listarProductos({ name: name !== 'all' ? name : '', category: category !== 'all' ? category : '' }));
    }, [category, dispatch, name]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCategory}/name/${filterName}`;
    }
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
                    <h3>Categorias encontradas:</h3>
                    {loadingCategories ? (
                        <Loading></Loading>
                    ) : errorCategories ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <ul>
                            {categories.map(c => (
                                <li key={c}>
                                    <Link className={c === category ? 'active' : ''} to={getFilterUrl({ category: c })}>
                                        {c}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

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