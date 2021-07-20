import React from 'react';
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
          <a href="/singin">Sing In</a>
        </div>
      </header>
      <main>
        <div className="row center">
          {
            data.productos.map(productos =>(
              <div key={productos._id} className="card">
                <a href={`/productos/${productos._id}`}>
                  <img className="medium" src={productos.image} alt={productos.name} />
                </a>
                <div className="card-body">
                  <a href={`/productos/${productos._id}`}>
                    <h2>{productos.name}</h2>
                  </a>
                  <p>{productos.description}</p>
                  <p className="pages">Paginas:{productos.pages}</p>
                  <p>Rating:</p>
                  <div className="rating">
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                  </div>
                  <div className="price">${productos.price}</div>
                  <p className="category">{productos.category}</p>
                </div>
              </div>
            ))
          }
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
