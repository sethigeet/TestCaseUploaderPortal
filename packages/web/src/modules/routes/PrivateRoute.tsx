import { FC } from "react";

import { Redirect, Route, RouteProps } from "react-router-dom";

export const PrivateRoute: FC<RouteProps & { isAuthenticated: boolean }> = ({
  isAuthenticated,
  ...rest
}) => {
  return isAuthenticated ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: "/login", state: { next: "/create" } }} />
  );
};
