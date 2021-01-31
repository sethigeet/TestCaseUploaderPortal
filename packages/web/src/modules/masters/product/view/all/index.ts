import { RouteType } from "../../../../types";

import { ViewAllProductsConnector } from "./ViewAllProductsConnector";

export const ViewAllProductsRoute: RouteType = {
  path: "/masters/products",
  component: ViewAllProductsConnector,
  private: true,
};
