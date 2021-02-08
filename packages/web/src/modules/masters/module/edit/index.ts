import { RouteType } from "../../../types";

import { EditModuleConnector } from "./EditModuleConnector";

export const EditModuleRoute: RouteType = {
  path: "/masters/modules/:moduleId/edit",
  component: EditModuleConnector,
  private: true,
};
