import { RouteType } from "../types";

import { MainMastersViewRoute } from "./main";
import { ProductRoutes } from "./product";

export const MastersRoutes: RouteType[] = [
  MainMastersViewRoute,
  ...ProductRoutes,
];
