import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function RutaVendedor({ component: Component, ...rest }) {
  const usuarioLogin = useSelector((state) => state.usuarioLogin);
  const { userInfo } = usuarioLogin;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isSeller ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
