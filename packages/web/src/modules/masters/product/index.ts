import { RouteType } from "../../types";

import { CreateProductRoute } from "./create";
import { EditProductRoute } from "./edit";
import { ViewProductRoutes } from "./view";

export const ProductRoutes: RouteType[] = [
  CreateProductRoute,
  EditProductRoute,
  ...ViewProductRoutes,
];
