import { RouteProps } from "react-router-dom";

import { LoginConnector } from "./LoginConnector";

export const LoginRoute: RouteProps = {
  path: "/login",
  component: LoginConnector,
};
