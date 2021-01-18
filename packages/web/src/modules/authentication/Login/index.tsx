import { FC } from "react";

import { Route } from "react-router-dom";

import { LoginConnector } from "./LoginConnector";

export const LoginRoute: FC = () => (
  <Route exact path="/login" component={LoginConnector} />
);
