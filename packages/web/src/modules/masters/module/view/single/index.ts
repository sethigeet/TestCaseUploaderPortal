import { RouteType } from "../../../../types";

import { ViewSingleModuleConnector } from "./ViewSingleModuleConnector";

export const ViewSingleModuleRoute: RouteType = {
  path: "/masters/modules/:moduleId",
  component: ViewSingleModuleConnector,
};
