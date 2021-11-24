import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { listOrderMine } from '../actions/ordenActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

export default function HistorialCompra(props) {
    const { pageNumber = 1 } = useParams();
    const historialCompra = useSelector((state) => state.historialCompra);
    const { loading, error, orders, page, pages } = historialCompra;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine({ pageNumber }));
    }, [dispatch, pageNumber]);
    return (
        <div>
            <h1>Historial de compra</h1>
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
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Pagado</th>
                                <th>Entregado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                        {order.isDelivered
                                            ? order.deliveredAt.substring(0, 10)
                                            : 'No'}
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => {
                                                props.history.push(`/order/${order._id}`);
                                            }}
                                        >
                                            Detalles
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
                                to={`/orderhistory/pageNumber/${x + 1}`}
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