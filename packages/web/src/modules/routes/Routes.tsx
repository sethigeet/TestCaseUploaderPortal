import { FC } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthenticationRoutes } from "../authentication";
import { Home } from "./Home";

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthenticationRoutes />
      </Switch>
    </BrowserRouter>
  );
};
