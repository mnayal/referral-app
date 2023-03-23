import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({}) => {
        if (user) {
          return children;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default AuthenticatedRoute;
