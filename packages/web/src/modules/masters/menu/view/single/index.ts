import { RouteType } from "../../../../types";

import { ViewSingleMenuConnector } from "./ViewSingleMenuConnector";

export const ViewSingleMenuRoute: RouteType = {
  path: "/masters/menus/:menuId",
  component: ViewSingleMenuConnector,
};
