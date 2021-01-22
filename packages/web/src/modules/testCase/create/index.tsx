import { RouteProps } from "react-router-dom";

import { CreateTestCaseConnector } from "./CreateTestCaseConnector";

export const CreateTestCaseRoute: RouteProps = {
  path: "/create",
  component: CreateTestCaseConnector,
};
