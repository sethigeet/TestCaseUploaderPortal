import { RouteType } from "../../types";

import { CreateTestCaseConnector } from "./CreateTestCaseConnector";

export const CreateTestCaseRoute: RouteType = {
  path: "/create",
  component: CreateTestCaseConnector,
  private: true,
};
