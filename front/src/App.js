import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { signout } from "./actions/usuarioActions";
import Carrito from "./pages/Carrito";
import Home from "./pages/Home";
import ProductoView from "./pages/ProductoView";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import DireccionEnvio from "./pages/DireccionEnvio";
import MetodoPago from './pages/MetodoPago';

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
              Comic Store
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Carro
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
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
