import { RouteProps } from "react-router-dom";

import { LoginConnector } from "./LoginConnector";

export const LoginRoute: RouteProps & { private?: boolean } = {
  path: "/login",
  component: LoginConnector,
};
