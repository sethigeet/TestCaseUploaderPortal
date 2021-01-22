import { RouteProps } from "react-router-dom";

import { CreateTestCaseRoute } from "./create";

export const TestCaseRoutes: (RouteProps & { private?: boolean })[] = [
  CreateTestCaseRoute,
];
