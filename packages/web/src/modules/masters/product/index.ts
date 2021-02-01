import { RouteType } from "../../types";

import { CreateProductRoute } from "./create";
import { ViewProductRoutes } from "./view";

export const ProductRoutes: RouteType[] = [
  CreateProductRoute,
  ...ViewProductRoutes,
];
