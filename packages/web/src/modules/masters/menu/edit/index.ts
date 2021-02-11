import { RouteType } from "../../../types";

import { EditMenuConnector } from "./EditMenuConnector";

export const EditMenuRoute: RouteType = {
  path: "/masters/menus/:menuId/edit",
  component: EditMenuConnector,
  private: true,
};
