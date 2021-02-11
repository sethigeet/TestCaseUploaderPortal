import { RouteType } from "../../../../types";

import { ViewAllMenusConnector } from "./ViewAllMenusConnector";

export const ViewAllMenusRoute: RouteType = {
  path: "/masters/menus",
  component: ViewAllMenusConnector,
  private: true,
};
