import { RouteType } from "../../../../types";

import { ViewSingleProductConnector } from "./ViewSingleProductConnector";

export const ViewSingleProductRoute: RouteType = {
  path: "/masters/product/:productId",
  component: ViewSingleProductConnector,
};
