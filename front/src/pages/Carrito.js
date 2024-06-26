import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/carroActions";
import MessageBox from "../components/MessageBox";

export default function Carrito(props) {
  const productoId = props.match.params.id;
  const cant = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productoId) {
      dispatch(addToCart(productoId, cant));
    }
  }, [dispatch, productoId, cant]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Carro de compras</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Ups! El carro esta vacio. <Link to="/"><strong id="link">Ir de compras</strong></Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.producto}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/producto/${item.producto}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.cant}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.producto, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.producto)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.cant, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.cant, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Pasar por la caja
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
