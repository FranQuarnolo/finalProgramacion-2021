import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { signout } from "./actions/usuarioActions";
import Admin from "./components/Admin";
import Privado from "./components/Privado";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import ProductoView from "./pages/ProductoView";
import Carrito from "./pages/Carrito";
import Orden from "./pages/Orden";
import DireccionEnvio from "./pages/DireccionEnvio";
import MetodoPago from "./pages/MetodoPago";
import RealizarPedido from "./pages/RealizarPedido";
import HistorialCompra from "./pages/HistorialCompra";
import ProductoListado from "./pages/ProductoListado";
import ProductoEditar from "./pages/ProductoEditar";
import ListadoCompra from "./pages/ListadoCompra";
import ListadoUsuarios from "./pages/ListadoUsuarios";
import EditarUsuario from "./pages/EditarUsuario";
import RutaVendedor from "./components/RutaVendedor";
import Busqueda from "./components/Busqueda";
import BusquedaView from "./pages/BusquedaView"

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
            <Route
              render={({ history }) => (
                <Busqueda history={history}></Busqueda>
              )}
            ></Route>
          </div>
          <div>
            <Link to="/cart" img>
              <button id="btn">
                <img src="./images/icons/cart.png" alt="carrito"></img>
              </button>
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
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Vendedor <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Productos</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Ordenes</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Panel</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Productos</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Compras</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Usuarios</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/" component={Home} exact></Route>
          <Route path="/signin" component={Login}></Route>
          <Route path="/register" component={Registro}></Route>
          <Route path="/producto/:id" component={ProductoView} exact></Route>
          <Route
            path="/producto/:id/edit"
            component={ProductoEditar}
            exact
          ></Route>
          <Route path="/cart/:id?" component={Carrito}></Route>
          <Route path="/shipping" component={DireccionEnvio}></Route>
          <Route path="/payment" component={MetodoPago}></Route>
          <Route path="/placeorder" component={RealizarPedido}></Route>
          <Route path="/order/:id" component={Orden}></Route>
          <Route path="/orderhistory" component={HistorialCompra}></Route>
          <Privado path="/profile" component={Perfil}></Privado>
          <Admin path="/productlist" component={ProductoListado} exact></Admin>
          <Admin path="/orderlist" component={ListadoCompra} exact></Admin>
          <Admin path="/userlist" component={ListadoUsuarios}></Admin>
          <Admin path="/user/:id/edit" component={EditarUsuario}></Admin>
          <RutaVendedor
            path="/productlist/seller"
            component={ProductoListado}
          ></RutaVendedor>
          <RutaVendedor
            path="/orderlist/seller"
            component={ListadoCompra}
          ></RutaVendedor>
          <Route
            path="/search/name/:name?"
            component={BusquedaView}
            exact
          ></Route>
        </main>
        <footer className="row center">All right reserved ©</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
