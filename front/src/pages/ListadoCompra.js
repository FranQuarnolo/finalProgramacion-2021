import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/ordenActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

export default function ListadoCompra(props) {
    const listadoPedidos = useSelector((state) => state.listadoPedidos);
    const { loading, error, orders } = listadoPedidos;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);
    const deleteHandler = (order) => {
        // TODO: delete handler
    };
    return (
        <div>
            <h1>Compras</h1>
            {loading ? (
                <Loading></Loading>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USUARIO</th>
                            <th>FECHA</th>
                            <th>TOTAL</th>
                            <th>PAGADO</th>
                            <th>ENTREGADO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
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
                                            props.history.push(`/orden/${order._id}`);
                                        }}
                                    >
                                        Ver Detalles
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onclick={() => deleteHandler(order)}
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