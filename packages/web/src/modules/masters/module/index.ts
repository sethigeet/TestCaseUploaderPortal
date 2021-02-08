import { RouteType } from "../../types";

import { CreateModuleRoute } from "./create";
import { EditModuleRoute } from "./edit";
import { ViewModulesRoutes } from "./view";

export const ModuleRoutes: RouteType[] = [
  CreateModuleRoute,
  EditModuleRoute,
  ...ViewModulesRoutes,
];
