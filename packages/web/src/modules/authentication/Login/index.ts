import { RouteType } from "../../types";

import { LoginConnector } from "./LoginConnector";

export const LoginRoute: RouteType = {
  path: "/login",
  component: LoginConnector,
};
