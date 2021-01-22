import { RouteProps } from "react-router-dom";

import { CreateTestCaseConnector } from "./CreateTestCaseConnector";

export const CreateTestCaseRoute: RouteProps & { private?: boolean } = {
  path: "/create",
  component: CreateTestCaseConnector,
  private: true,
};
