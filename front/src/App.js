import React from 'react';
import Producto from './components/Producto';
import data from './data'

function App() {
  return (
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
        <div className="row center">
          {
            data.productos.map(producto =>(
              <Producto key={producto._id} producto={producto}></Producto>
            ))
          }
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
