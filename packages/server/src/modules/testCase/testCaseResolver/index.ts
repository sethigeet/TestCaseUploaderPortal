import { BuildSchemaOptions } from "type-graphql";

import { CreateTestCaseResolver } from "./create";
import { GetTestCaseResolver } from "./get";

export const testCaseResolvers: BuildSchemaOptions["resolvers"] = [
  CreateTestCaseResolver,
  GetTestCaseResolver,
];
