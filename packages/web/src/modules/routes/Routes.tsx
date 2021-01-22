import { FC } from "react";

import { BrowserRouter, Route, RouteProps, Switch } from "react-router-dom";

import { AuthenticationRoutes } from "../authentication";
import { TestCaseRoutes } from "../testCase";

import { Home } from "./Home";
import { NotFound } from "./NotFound";

const routes: RouteProps[] = [
  { path: ["/", "/home"], component: Home },
  ...AuthenticationRoutes,
  ...TestCaseRoutes,
  { component: NotFound },
];

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, i) => (
          <Route exact {...route} key={i} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};
