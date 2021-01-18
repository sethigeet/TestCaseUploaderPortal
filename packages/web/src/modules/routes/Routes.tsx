import { FC } from "react";

import { BrowserRouter, Switch } from "react-router-dom";

import { AuthenticationRoutes } from "../authentication";

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthenticationRoutes />
      </Switch>
    </BrowserRouter>
  );
};
