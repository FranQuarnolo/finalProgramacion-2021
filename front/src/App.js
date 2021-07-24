import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Carrito from "./pages/Carrito";
import Home from "./pages/Home";
import ProductoView from "./pages/ProductoView";
import Login from './pages/Login';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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
            <Link to="/login">SingIn</Link>
          </div>
        </header>
        <main>
          <Route path="/" component={Home} exact></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/producto/:id" component={ProductoView}></Route>
          <Route path="/cart/:id?" component={Carrito}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
