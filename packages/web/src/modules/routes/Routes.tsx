import { FC } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { useMeQuery } from "@portal/controller";

import { RouteType } from "../types";
import { AuthenticationRoutes } from "../authentication";
import { TestCaseRoutes } from "../testCase";

import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { PrivateRoute } from "./PrivateRoute";

const routes: RouteType[] = [
  { path: ["/", "/home"], component: Home },
  ...AuthenticationRoutes,
  ...TestCaseRoutes,
  { component: NotFound },
];

export const Routes: FC = () => {
  const { data } = useMeQuery();

  const isAuthenticated = data?.me ? true : false;

  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, i) => {
          if (route.private) {
            return (
              <PrivateRoute
                key={i}
                exact
                {...route}
                isAuthenticated={isAuthenticated}
              />
            );
          }

          return <Route key={i} exact {...route} />;
        })}
      </Switch>
    </BrowserRouter>
  );
};
