import { RouteProps } from "react-router-dom";

import { LoginRoute } from "./Login";

export const AuthenticationRoutes: (RouteProps & { private?: boolean })[] = [
  LoginRoute,
];
