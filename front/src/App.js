import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductoView from "./pages/ProductoView";


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Comic Store
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/singin">SingIn</a>
          </div>
        </header>
        <main>
          <Route path='/' component={Home} exact></Route>
          <Route path='/producto/:id' component={ProductoView}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
