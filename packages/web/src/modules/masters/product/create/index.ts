import { RouteType } from "../../../types";

import { CreateProductConnector } from "./CreateProductConnector";

export const CreateProductRoute: RouteType = {
  path: "/masters/products/create",
  component: CreateProductConnector,
  private: true,
};
