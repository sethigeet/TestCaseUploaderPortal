import { RouteType } from "../../../../types";

import { ViewAllProductsConnector } from "./ViewAllProductsConnector";

export const ViewAllProductsRoute: RouteType = {
  path: "/masters/product",
  component: ViewAllProductsConnector,
};
