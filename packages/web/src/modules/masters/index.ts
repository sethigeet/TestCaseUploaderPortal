import { RouteType } from "../types";

import { MainMastersViewRoute } from "./main";
import { MenuRoutes } from "./menu";
import { ModuleRoutes } from "./module";
import { ProductRoutes } from "./product";

export const MastersRoutes: RouteType[] = [
  MainMastersViewRoute,
  ...ProductRoutes,
  ...ModuleRoutes,
  ...MenuRoutes,
];
