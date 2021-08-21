import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/usuarioActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

export default function ListadoUsuarios() {
  const listadoUsuario = useSelector((state) => state.listadoUsuario);
  const { loading, error, users } = listadoUsuario;

  const eliminarUsuario = useSelector((state) => state.eliminarUsuario);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eliminarUsuario;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm("Estas seguro?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Usuarios</h1>
      {loadingDelete && <Loading></Loading>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">
          Usuario eliminado correctamente!
        </MessageBox>
      )}
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>EMAIL</th>
              <th>VENDEDOR</th>
              <th>ADMIN</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? "SI" : " NO"}</td>
                <td>{user.isAdmin ? "SI" : "NO"}</td>
                <td>
                  <button type="button" className="small">
                    Editar
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
