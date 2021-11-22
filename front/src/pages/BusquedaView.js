import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listarProductos } from '../actions/productoActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import Producto from '../components/Producto';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function BusquedaView(props) {
    const { name = 'all', category = 'all', min = 0, max = 0, rating = 0, order = 'newest' } = useParams();
    const dispatch = useDispatch();
    const listaProductos = useSelector((state) => state.listaProductos);
    const { loading, error, productos } = listaProductos;
    const listadoProductosCategoria = useSelector((state) => state.listadoProductosCategoria);
    const { loading: loadingCategories, errorCategories, categories } = listadoProductosCategoria;
    useEffect(() => {
        dispatch(listarProductos({ name: name !== 'all' ? name : '', category: category !== 'all' ? category : '', min, max, rating, order }));
    }, [category, dispatch, min, max, name, order, rating]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
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
                <div>
                    Filtrar por{' '}
                    <select
                        value={order}
                        onChange={(e) => {
                            props.history.push(getFilterUrl({ order: e.target.value }));
                        }}
                    >
                        <option value="newest">Nuevos</option>
                        <option value="lowest">Precio: Menor precio</option>
                        <option value="highest">Precio: Mayor precio</option>
                        <option value="toprated">Reviews de Usuarios</option>
                    </select>
                </div>
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Categorias:</h3>
                    <div>
                        {loadingCategories ? (
                            <Loading></Loading>
                        ) : errorCategories ? (
                            <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                            <ul>
                                <li>
                                    <Link className={'all' === category ? 'active' : ''} to={getFilterUrl({ category: 'all' })}>
                                        Todas
                                    </Link>
                                </li>
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
                    <div>
                        <h3>Precio:</h3>
                        <ul>
                            {prices.map((p) => (
                                <li key={p.name}>
                                    <Link
                                        to={getFilterUrl({ min: p.min, max: p.max })}
                                        className={`${p.min}-$${p.max}` === `${min}-${max}` ? 'active' : ''}
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Reviews:</h3>
                        <ul>
                            {ratings.map((r) => (
                                <li key={r.name}>
                                    <Link
                                        to={getFilterUrl({ rating: r.rating })}
                                        className={`${r.rating}` === `${rating}` ? 'active' : ''}
                                    >
                                        {r.name}
                                        <Rating caption={' o más'} rating={r.rating}></Rating>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
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