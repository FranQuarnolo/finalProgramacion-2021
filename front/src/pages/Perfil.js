import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/usuarioActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

export default function Perfil() {
  const usuarioLogin = useSelector((state) => state.usuarioLogin);
  const { userInfo } = usuarioLogin;
  const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
  const { loading, error, user } = usuarioDetalles;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Mi Perfil</h1>
        </div>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                placeholder="Nombre"
                value={user.name}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={user.email}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirmar Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirmar password"
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Actualizar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}