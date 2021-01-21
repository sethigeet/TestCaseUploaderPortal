import { FC } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthenticationRoutes } from "../authentication";
import { Home } from "./Home";
import { NotFound } from "./NotFound";

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <AuthenticationRoutes />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
