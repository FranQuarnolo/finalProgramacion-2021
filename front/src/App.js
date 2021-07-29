import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { signout } from "./actions/usuarioActions";
import Carrito from "./pages/Carrito";
import Home from "./pages/Home";
import HistorialCompra from "./pages/HistorialCompra";
import Perfil from "./pages/Perfil";
import Orden from './pages/Orden';
import ProductoView from "./pages/ProductoView";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import DireccionEnvio from "./pages/DireccionEnvio";
import MetodoPago from './pages/MetodoPago';
import RealizarPedido from "./pages/RealizarPedido";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const usuarioLogin = useSelector((state) => state.usuarioLogin);
  const { userInfo } = usuarioLogin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Comic Zone
            </Link>
          </div>
          <div>
            <Link to="/cart" img>
              <button id="btn"><img src="./images/icons/cart.png" alt="carrito"></img></button>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Perfil</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Mis compras</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/" component={Home} exact></Route>
          <Route path="/signin" component={Login}></Route>
          <Route path="/register" component={Registro}></Route>
          <Route path="/producto/:id" component={ProductoView}></Route>
          <Route path="/cart/:id?" component={Carrito}></Route>
          <Route path="/shipping" component={DireccionEnvio}></Route>
          <Route path="/payment" component={MetodoPago}></Route>
          <Route path="/placeorder" component={RealizarPedido}></Route>
          <Route path="/order/:id" component={Orden}></Route>
          <Route path="/orderhistory" component={HistorialCompra}></Route>
          <Route path="/profile" component={Perfil}></Route>
        </main>
        <footer className="row center">All right reserved ©</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
