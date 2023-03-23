import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const UnAuthenticatedRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default UnAuthenticatedRoute;
