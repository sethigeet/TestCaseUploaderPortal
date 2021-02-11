import { RouteType } from "../../../types";

import { CreateMenuConnector } from "./CreateMenuConnector";

export const CreateMenuRoute: RouteType = {
  path: "/masters/menus/create",
  component: CreateMenuConnector,
  private: true,
};
