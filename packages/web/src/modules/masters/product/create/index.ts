import { RouteType } from "../../../types";

import { CreateProductConnector } from "./CreateProductConnector";

export const CreateProductRoute: RouteType = {
  path: "/masters/product/create",
  component: CreateProductConnector,
  private: true,
};
