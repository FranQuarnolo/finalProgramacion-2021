import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { crearReview, detallesProducto } from "../actions/productoActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_SUCCESS } from "../constants/productoConstants";

export default function ProductoView(props) {
  const dispatch = useDispatch();
  const productoId = props.match.params.id;
  const [cant, setCant] = useState(1);
  const productoDetalles = useSelector((state) => state.productoDetalles);
  const { loading, error, producto } = productoDetalles;
  const usuarioLogin = useSelector((state) => state.usuarioLogin);
  const { userInfo } = usuarioLogin;

  const crearReviewProducto = useSelector((state) => state.crearReviewProducto);
  const { loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate } = crearReviewProducto;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Gracias por tu review!");
      setRating('');
      setComment('');
      dispatch({type: PRODUCT_REVIEW_CREATE_SUCCESS,});
    }
    dispatch(detallesProducto(productoId));
  }, [dispatch, productoId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productoId}?cant=${cant}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        crearReview(productoId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Por favor introduzca un comentario y valoración!');
    }
  };
  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link className="back" to="/">
            Regresar
          </Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={producto.image}
                alt={producto.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{producto.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={producto.rating}
                    numReviews={producto.numReviews}
                  ></Rating>
                </li>

                <li className='descrip'>
                  Descripción:
                  <p className='descrip-text'>{producto.description}</p>
                </li>
                <li>Cant. Paginas: {producto.price}</li>
                <li className='precio'>Precio: ${producto.price}</li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Precio</div>
                      <div className="price">${producto.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Disponibilidad</div>
                      <div>
                        {producto.stock > 0 ? (
                          <span className="success">Stock Disponible</span>
                        ) : (
                          <span className="danger">Sin Existencias</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {producto.stock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Cant</div>
                          <div>
                            <select
                              value={cant}
                              onChange={(e) => setCant(e.target.value)}
                            >
                              {[...Array(producto.stock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Añadir al carro
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews</h2>
            {producto.reviews.length === 0 && (
              <MessageBox>No se encontraron reviews</MessageBox>
            )}
            <ul>
              {producto.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Realiza una review de este producto:</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Seleccion...</option>
                        <option value="1">1- Pobre</option>
                        <option value="2">2- Promedio</option>
                        <option value="3">3- Genial!</option>
                        <option value="4">4- Super!</option>
                        <option value="5">5- Excelente!</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comentario</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Confirmar Review
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <Loading></Loading>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Por favor <Link to="/signin">inicia sesión</Link> para escribir una review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )
      }
    </div >
  );
}
