import { BuildSchemaOptions } from "type-graphql";

import { CreateTestCaseResolver } from "./create";
import { GetTestCaseResolver } from "./get";
import { VerifyTestCaseResolver } from "./verify";

export const testCaseResolvers: BuildSchemaOptions["resolvers"] = [
  CreateTestCaseResolver,
  GetTestCaseResolver,
  VerifyTestCaseResolver,
];
