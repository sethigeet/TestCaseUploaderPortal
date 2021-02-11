import { RouteType } from "../../types";

import { CreateMenuRoute } from "./create";
import { EditMenuRoute } from "./edit";
import { ViewMenusRoutes } from "./view";

export const MenuRoutes: RouteType[] = [
  CreateMenuRoute,
  EditMenuRoute,
  ...ViewMenusRoutes,
];
