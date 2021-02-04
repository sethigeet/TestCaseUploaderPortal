import { RouteType } from "../../../types";

import { EditProductConnector } from "./EditProductConnector";

export const EditProductRoute: RouteType = {
  path: "/masters/products/:productId/edit",
  component: EditProductConnector,
  private: true,
};
