import { RouteType } from "../../../types";

import { CreateModuleConnector } from "./CreateModuleConnector";

export const CreateModuleRoute: RouteType = {
  path: "/masters/modules/create",
  component: CreateModuleConnector,
  private: true,
};
