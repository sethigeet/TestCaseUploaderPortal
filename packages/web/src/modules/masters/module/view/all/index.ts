import { RouteType } from "../../../../types";

import { ViewAllModulesConnector } from "./ViewAllModulesConnector";

export const ViewAllModulesRoute: RouteType = {
  path: "/masters/modules",
  component: ViewAllModulesConnector,
  private: true,
};
